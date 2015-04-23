var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable4/");

$(function() { 
	// GET TIMETABLE OBJECT
	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();
	// END FIREBASE

	constructCancelTables(timetableObj);

	// ERROR FUNCTION
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});
});
// END THE RUNNING FUNCTION


// ===========================================================================
// START THE FUNCTIONS FOR ADDING EXTRA FERRIES
// ===========================================================================
$(function() {
	$(document.body).on('click', 'a', function () { 
		// JAN TO APR
		if ( $(this).hasClass("da_cancel_date_btn") ) {
			// console.log("da extra clicked");
			var cancelDate = $('input[ name="da_cancel_date"]').val();
			// console.log(cancelDate);
			// pushExtraFerryTime("da", cancelDate, extraTime);
			displayFerryForDate("da", cancelDate);
		} else if ( $(this).hasClass("db_cancel_date_btn")) {
			// console.log("db extra clicked");
			var cancelDate = $('input[ name="db_cancel_date"]').val();
			// console.log(cancelDate);
			displayFerryForDate("db", cancelDate);
		}
	});
});

function displayFerryForDate(journey, date){
	
	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();
	
	displayCancelList(timetableObj, journey, date);
	
	});
};

function displayCancelList(timetableObj, journey, date){
	var dayMonth = checkDayRange(date);
	// console.log(dayMonth);
	var dayRange = dayMonth.substr(0, dayMonth.indexOf(','));
	var monthRange = dayMonth.substr(dayMonth.lastIndexOf(',')+1, dayMonth.length);
	// console.log(dayRange);
	// console.log(monthRange);
	var cancelledArray = checkCancelledFerries(timetableObj, journey, date);
	var finalArray = findDatabaseRef(timetableObj, journey, monthRange, dayRange, cancelledArray);
	displayCancelledList(finalArray, journey, date);
};

function checkDayRange(date){
	var cDate = getPrettyDate(date);
	var day = cDate.substr(0, cDate.indexOf(','));
	var cdate = new Date(date);
	var cyear = cdate.getYear();
	if (cyear < 1900){ cyear = cyear + 1900};
    var cmonth = cdate.getMonth()+1;
    var cdate = cdate.getDate();

	// console.log(day + " " + cyear + " " + cmonth + " " + " " + cdate);

	if (day == "Sun"){
		// console.log("it's Sunday");
		var dayRange = "sun";
	} else if (day == "Fri") {
		// console.log("It's Friday");
		var dayRange = "fri";
	} else {
		// console.log("It's Mon to Sat, but not Friday");
		var dayRange = "wk";
	}

	if (cmonth < 5) {
		// console.log("It's Jan to Apr");
		var monthRange = "jantoapr";
	} else if (cmonth == 5){
		// console.log("It's May");
		var monthRange = "may";
	} else if (cmonth > 5 && cmonth < 9) {
		// console.log("It's June to Aug");
		var monthRange = "juntoaug";
	} else if (cmonth > 8 && cmonth < 11) {
		// console.log("It's Sept to Oct");
		var monthRange = "septooct";
	} else if (cmonth > 10) {
		// console.log("It's Nov to Dec");
		var monthRange = "novtodec";
	} else {
		toastr.info("You need to enter a valid");
	}

	return (dayRange+","+monthRange);
};

function checkCancelledFerries(timetableObj, journey, date){
	if (journey == "da"){
		var cancelFerryObj = timetableObj.cancel_ferry.da;
	} else {
		var cancelFerryObj = timetableObj.cancel_ferry.db;
	}

	var array = [];
	for (key in cancelFerryObj){
		if (date == cancelFerryObj[key].date){
			array.push(cancelFerryObj[key].time);
		}
	}
	return array;
}

function findDatabaseRef(timetableObj, journey, monthRange, dayRange, cancelledArray){
	// console.log(dayRange);
	for (key in timetableObj){
		if (key == journey){
			var journeyObj = timetableObj[key];
			// console.log(journeyObj);
			for (key in journeyObj){
				if (key == monthRange){
					var monthObj = journeyObj[key];
					// console.log(monthObj);
					for (key in monthObj){
						if (key == dayRange) {
							var timesObj = monthObj[key];
							var array = [];

							for (key in timesObj){
								array.push(timesObj[key].time);
							}

							if (dayRange == "fri"){
								var wkObj = monthObj["wk"];
								// console.log(wkObj);
								for (key in wkObj){
									array.push(wkObj[key].time);
								}
							}
							
							array.sort(function (a, b) {
        						return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
    						});
							// console.log(array);
							var finalArray = compareCancelArrays(array, cancelledArray);
							return finalArray;
						}
					}
				}
			}
		}
	};
};

function compareCancelArrays(array, cancelledArray){
	// console.log(array);
	// console.log(cancelledArray);
	for (var i = 0; i < cancelledArray.length ; i ++) {
		// console.log("> "+cancelledArray[i]);
		for (var j = 0; j < array.length ; j ++){
			// console.log(array[j]);
			if (cancelledArray[i] == array[j]){
				// console.log("It's a match!");
				var removeIndex = array.indexOf(array[j]);
				array.splice(removeIndex, 1);
				// console.log(array);
			}
		};
	};

	return array;
};

function displayCancelledList(array, journey, date){
	var htmlID = journey+"_cancel_list";
	// console.log(array);

	var prettyDate = getPrettyDate(date);

	if (array.length != 0){
		var result = "<h4>Choose times to cancel from "+prettyDate+"</h4>";
		for (var i = 0; i < array.length; i++) {
			result += "<div class='list_item'> <strong>"+array[i]+"</strong> <a id='"+journey+","+date+","+array[i]+"' class='margin_left mdi-content-remove-circle red cancel_single_time' href='#'>Cancel this ferry</a></div>";
		};
		// result += "<div class='align-right'><a class='btn btn_red cancel_whole_day' id='"+journey+","+date+"'>Cancel all ferries for this day</a></div>"
	} else {
		var result = "There are no more ferries for this date";
	}

	document.getElementById(htmlID).innerHTML = result;
}


// ===========================================================================
// RUNNING FUNCTION CANCEL FERRY BUTTONS
// ===========================================================================


$(function() { 
	$(document.body).on('click', 'a', function () { 
		if ($(this).hasClass('cancel_single_time')){
			var cancelKey = $(this).attr('id');
			// console.log(cancelKey);
			// console.log(timeKey + " " +dateKey);
			cancelSingleFerry(cancelKey);
		} else if ($(this).hasClass('cancel_whole_day')){
			var cancelDayKey = $(this).attr('id');
			// console.log(timeKey + " " +dateKey);
			// cancelDaysFerries(cancelDayKey);
		}
	});
});


function cancelSingleFerry(cancelKey){
	var journey = cancelKey.substr(0, cancelKey.indexOf(','));
	var cancelDate = cancelKey.substr(cancelKey.indexOf(',')+1, cancelKey.lastIndexOf(',')-3);
	var cancelTime = cancelKey.substr(cancelKey.lastIndexOf(',')+1, cancelKey.length);
	// console.log(journey);
	// console.log(cancelDate);
	// console.log(cancelTime);

	if (journey == "da"){
		var databaseRef = "/cancel_ferry/da/"
	} else {
		var databaseRef = "/cancel_ferry/db/"
	}
	var refToPush = firebaseRef.child(databaseRef);
	refToPush.push( {date: cancelDate, time: cancelTime} );
	toastr.error("<i class='mdi-action-done margin_right'></i>Ferry has been cancelled");
}

function cancelDaysFerries(cancelDayKey){
	console.log(cancelDayKey);
	var journey = cancelDayKey.substr(0, cancelDayKey.indexOf(','));
	var cancelDay = cancelDayKey.substr(cancelDayKey.lastIndexOf(',')+1, cancelDayKey.length);

	console.log("This is the "+journey+" "+cancelDay);

	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();

	if (journey == "da"){
		var databaseRef = "cancel_ferry/da/"
	} else {
		var databaseRef = "cancel_ferry/db/"
	}
	var refToPush = firebaseRef.child(databaseRef);

	var dayMonth = checkDayRange(cancelDay);
	// console.log(dayMonth);
	var dayRange = dayMonth.substr(0, dayMonth.indexOf(','));
	var monthRange = dayMonth.substr(dayMonth.lastIndexOf(',')+1, dayMonth.length);
	// console.log(dayRange);
	// console.log(monthRange);
	var cancelledArray = checkCancelledFerries(timetableObj, journey, cancelDay);
	var finalArray = findDatabaseRef(timetableObj, journey, monthRange, dayRange, cancelledArray);

	// console.log(finalArray);

	for (var i = 0; i < finalArray.length; i++){
		refToPush.push( {date: cancelDay, time: finalArray[i]} );
	}
	toastr.error("<i class='mdi-action-done margin_right'></i>All days ferries are cancelled");

	});
};


// ===========================================================================
// START THE LISTS FOR EDITING FERRIES
// ===========================================================================

// START THE RUNNING FUNCTION FOR REMOVING EXTRA FERRIES

$(function() { 
	$(document.body).on('click', 'a', function () { 
		if ($(this).hasClass('remove_cancelFerryTime_btn')){
			var timeKey = $(this).parent().attr('id');
			var dateKey = $(this).parent().parent().attr('id');
			// console.log(timeKey + " " +dateKey);
			removeFromFirebase(timeKey, dateKey);
		}
	});
});

function removeFromFirebase(timeKey, dateKey){
	// console.log(timeKey);
	var databaseRef = extractDateKey(dateKey);
	var refToRemove = firebaseRef.child(databaseRef);
	refToRemove.child( timeKey ).remove();
	toastr.error('<i class="mdi-alert-warning margin_right"></i>Ferry time removed!');
};

function extractDateKey(dateString){
	var journey = dateString.substr(0, dateString.indexOf('_'));
	// console.log(journey);
	var monthRange = dateString.substr(dateString.indexOf('_')+1, dateString.lastIndexOf('_')-3);
	// console.log(monthRange);
	var day = dateString.substr(dateString.lastIndexOf('_')+1, dateString.length);
	// console.log(day);
	return "/extra_ferry/"+journey;
}

// ===========================================================================
// END THE LISTS FOR EDITING FERRIES
// ===========================================================================



// ===========================================================================
// START THE TABLES FOR VIEWING FERRIES
// ===========================================================================

function constructCancelTables(timetableObj){
	var cancelObj = timetableObj.cancel_ferry;
	// console.log(extrasObj);
	for (key in cancelObj) {
		var journey = key;
		var dateTimeObj = cancelObj[key];
		constructSingleCancelTable(dateTimeObj, journey+"_cancel_table");
	};
}

function constructSingleCancelTable(dateTimeObj, htmlID){
	var journey = htmlID.substr(0, htmlID.indexOf('_'));
	// console.log(htmlID + journey);
	// console.log(htmlID);
	if (journey == "da"){
		var cssColor = "blue";
		var journeyTitle = "Cancelled Ferries for Departing Arranmore";
	} else {
		var cssColor = "orange";
		var journeyTitle = "Cancelled Ferries for Departing Burtonport";
	};

    var tableHTML = "<table class='"+cssColor+" align-center' border='1'> <thead> <tr> <th class='"+cssColor+"'>" + journeyTitle + "</th> </tr> </thead>";
    
    tableHTML += "<tbody>";

    // USING THE OBJECT
    for (key in dateTimeObj) {
    	var today = getTodayDate();
    	if (datesInFuture(dateTimeObj[key].date, today) == true){
    		var date = getPrettyDate(dateTimeObj[key].date);
        	// array.push(date + ", " + dateTimeObj[key].time);
        	tableHTML += "<tr> <td>" + date + ", " + dateTimeObj[key].time + "<a class='btn btn_uncancel' id='"+journey+","+key+"' href='#'>Un-cancel</a></td></tr>";
    	}
    };

    tableHTML += "</tbody></table>";

    document.getElementById(htmlID).innerHTML = tableHTML;
}

// UNUSED
function generateArraysWithDate(timeObj){
	array = [];
    // GENERATE THE ARRAY
    for (key in timeObj) {
    	var today = getTodayDate();
    	if (datesInFuture(timeObj[key].date, today) == true){
    		var date = getPrettyDate(timeObj[key].date);
        	array.push(date + ", " + timeObj[key].time);
    	}
    };

    // console.log(array);
    // SORT THE ARRAY
    array.sort(function (a, b) {
        return new Date(a) - new Date(b);
    });
    // return the array
    // console.log(array);
    return array;
}

$(function() {
	$(document.body).on('click', 'a', function () { 
		// JAN TO APR
		if ( $(this).hasClass("btn_uncancel") ) {
			var uncancelKey = $(this).attr('id');
			uncancelFerry(uncancelKey);
		}
	});
});

function uncancelFerry(uncancelKey){
	// console.log(uncancelKey);

	var journey = uncancelKey.substr(0, uncancelKey.indexOf(','));
	var uncancelKeyID = uncancelKey.substr(uncancelKey.lastIndexOf(',')+1, uncancelKey.length);

	// console.log(journey);
	// console.log(uncancelKeyID);

	if (journey == "da"){
		var databaseRef = "cancel_ferry/da/";
	} else {
		var databaseRef = "cancel_ferry/db/";
	}
	
	var cancelRef = firebaseRef.child(databaseRef);

	cancelRef.child( uncancelKeyID ).remove();
	toastr.success("<i class='mdi-action-done margin_right'></i>The ferry has been un-cancelled");
};


// ===========================================================================
// PRETTY DATES
// ===========================================================================


function getPrettyDate(date){
    // CREATE THE CHECK DATE IN CORRECT FORMAT
    var cdate = new Date(date);
    // console.log(cdate);
    var year = cdate.getYear();
    var month_num = cdate.getMonth()+1;
    var date = cdate.getDate();
    var day_num = cdate.getDay();

    if (year < 1000) { year += 1900 };
    // if (month_num < 9) { month_num = "0"+month };
    if (date < 9) { date = "0"+date };

    day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // console.log(month_num);
    // CHECK THE DATE AGAINST THE TIMETABLE OBJ
    var prettyDate = day[day_num] + ", " + date + " " + month[month_num-1] + " " + year;
    // console.log(prettyDate);
    return prettyDate;
};

function datesInFuture(dateToCheck, today){
    var cdate = new Date(dateToCheck);
    var tdate = new Date(today);
    // console.log(cdate);

    if (cdate.getYear() == tdate.getYear()) {
    	// console.log("year is current");
        if (cdate.getMonth() > tdate.getMonth()) {
        	// console.log("month is in future");
        	return true;
            if (cdate.getDate() < tdate.getDate()) {
             	//  return true;
            }
        } else if (cdate.getMonth() == tdate.getMonth() ) {
        	// console.log("month is current");
        	if (cdate.getDate() >= tdate.getDate()) {
            	// console.log("date is in future");
            	return true;
             	//  return true;
            } else {
				// console.log("date in past");
				return false;
            }
    	} else {
    		// console.log("month is in past");
    		return false;
    	}
    } else if (cdate.getYear() > tdate.getYear()) {
    	// console.log("year is in future");
    	return true
    } else {
    	// console.log("year is in past");
    	return false;
    }

};

function getTodayDate(){
    var today = new Date();

    var tyear = today.getYear();
    var tmonth = today.getMonth()+1;
    var tdate = today.getDate();

    if (tyear < 1000) { tyear += 1900 };
    if (tmonth < 9) { tmonth = "0"+tmonth };
    if (tdate < 9) { tdate = "0"+tdate };

    var checkDate = tyear+"-"+tmonth+"-"+tdate;
    return checkDate;
}
