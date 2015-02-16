var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable4/");

$(function() { 
	// GET TIMETABLE OBJECT
	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();
	// END FIREBASE

	// console.log(timetableObj);
	getNextFerryTimes(timetableObj);
	// setInterval(getNextFerryTimes(timetableObj),1000);

	getTodaysFerryTimes(timetableObj);

	// ERROR FUNCTION
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});
});
// END THE RUNNING FUNCTION


// ===========================================================================
// NEXT FERRIES
// ===========================================================================


function getNextFerryTimes(timetableObj){
	var tdate = new Date();
	var todaysDate = checkDayRange(tdate);
	// console.log(tdate);
	// console.log(todaysDate);

	var ttime = getPrettyTime(tdate);

	var dayRange = todaysDate.substr(0, todaysDate.indexOf(','));
	var monthRange = todaysDate.substr(todaysDate.lastIndexOf(',')+1, todaysDate.length);

	// console.log(dayRange + " " +monthRange);

	var da_cancelledArray = checkCancelledFerries(timetableObj, "da", tdate);
	var da_extraArray = checkExtraFerries(timetableObj, "da", tdate);
	// console.log(da_extraArray);
	var da_finalArray = findDatabaseRef(timetableObj, "da", monthRange, dayRange, da_cancelledArray, da_extraArray);
	// console.log(da_finalArray);
	var da_nextTime = checkForNextFerry(da_finalArray, ttime);
	
	document.getElementById("nextFerry_da").innerHTML = da_nextTime;


	var db_cancelledArray = checkCancelledFerries(timetableObj, "db", tdate);
	var db_extraArray = checkExtraFerries(timetableObj, "db", tdate);
	// console.log(db_extraArray);
	var db_finalArray = findDatabaseRef(timetableObj, "db", monthRange, dayRange, db_cancelledArray, db_extraArray);
	// console.log(db_finalArray);
	var db_nextTime = checkForNextFerry(db_finalArray, ttime);
	
	document.getElementById("nextFerry_db").innerHTML = db_nextTime;
};

function checkForNextFerry(array, time){
    for ( var i = 0; i < array.length; i++){
        if (time < array[i]) {
            var nextFerry = array[i];
            break;
        } else {
            var nextFerry = "No more ferries today!";
        }
    };
    return nextFerry;
};


// ===========================================================================
// TODAYS TIMETABLE
// ===========================================================================

function getTodaysFerryTimes(timetableObj){
	var tdate = new Date();
	var todaysDate = checkDayRange(tdate);

	var ttime = getPrettyTime(tdate);

	var dayRange = todaysDate.substr(0, todaysDate.indexOf(','));
	var monthRange = todaysDate.substr(todaysDate.lastIndexOf(',')+1, todaysDate.length);

	var da_cancelledArray = checkCancelledFerries(timetableObj, "da", tdate);
	var da_extraArray = checkExtraFerries(timetableObj, "da", tdate);
	// console.log(da_extraArray);
	var da_finalArray = findDatabaseRef(timetableObj, "da", monthRange, dayRange, da_cancelledArray, da_extraArray);

	var da_table_html = createOneDaysTable(da_finalArray, "da");

	document.getElementById("today_timetable_da").innerHTML = da_table_html;


	var db_cancelledArray = checkCancelledFerries(timetableObj, "db", tdate);
	var db_extraArray = checkExtraFerries(timetableObj, "db", tdate);
	// console.log(db_extraArray);
	var db_finalArray = findDatabaseRef(timetableObj, "db", monthRange, dayRange, db_cancelledArray, db_extraArray);

	var db_table_html = createOneDaysTable(db_finalArray, "db");

	document.getElementById("today_timetable_db").innerHTML = db_table_html;

};

function createOneDaysTable(array, journey){
	if (array.length == 0 ) {
        // console.log("All ferries are cancelled...");
        // CREATE HTML FOR NO FERRIES
        var tableHTML = "all_ferries_cancelled";
    } else {
        // CREATE TABLE
        if (journey == "da") {
            var cssColor = "blue";
            var journey = "Departing Arranmore";
        } else {
            var cssColor = "orange";
            var journey = "Departing Burtonport";
        };

        var tableHTML = "<table class='" + cssColor + " align-center' border='1'> <thead> <tr> <th class='"+cssColor+"' colspan='"+array.length+"'>"+journey+"</th> </tr> <tbody>";

        // LOGIC FOR TIMES
        // CHECK HOW MANY TIMES ARE IN THE ARRAY
        tableHTML += "<tr>";
        for (var i = 0; i < array.length; i++) {
            tableHTML += "<td>" + array[i] + "</td>";
        };
        tableHTML += "</tr>";
        // BODY OF TABLE COMPLETE

        tableHTML += "</tbody> </table>";
        // INCOMPLETE
    };
    return tableHTML;
};


// ===========================================================================
// CANCELLED FERRIES
// ===========================================================================

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

function findDatabaseRef(timetableObj, journey, monthRange, dayRange, cancelledArray, extrasArray){
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
							var arrayMinusCancel = compareCancelArrays(array, cancelledArray);
							var finalArray = compareExtraArray(arrayMinusCancel, extrasArray);

							finalArray.sort(function (a, b) {
						        return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
						    });

							// console.log(finalArray);
							return finalArray;
						}
					}
				}
			}
		}
	};
};

function compareExtraArray(totalArray, extrasArray){
	var array = totalArray;
	for (var i = 0; i < extrasArray.length; i++){
		array.push(extrasArray[i]);
	}
	return array;
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

// ===========================================================================
// END CANCELLED FERRIES
// ===========================================================================


// ===========================================================================
// EXTRA FERRIES
// ===========================================================================

function checkExtraFerries(timetableObj, journey, date){
	if (journey == "da"){
		var extraFerryObj = timetableObj.extra_ferry.da;
	} else {
		var extraFerryObj = timetableObj.extra_ferry.db;
	}

	var array = [];
	for (key in extraFerryObj){

		var uglyDate = getInputDate(extraFerryObj[key].date);
		// console.log(uglyDate);
		if (getInputDate(date) == uglyDate){
			array.push(extraFerryObj[key].time);
		};
	};

	return array;
}

function getInputDate(date){
    // CREATE THE CHECK DATE IN CORRECT FORMAT
    var cdate = new Date(date);
    // console.log(cdate);
    var yearToCheck = cdate.getYear();
    var monthToCheck = cdate.getMonth()+1;
    var dateToCheck = cdate.getDate();

    if (yearToCheck < 1000) { yearToCheck += 1900 };
    if (monthToCheck < 9) { monthToCheck = "0"+monthToCheck };
    if (dateToCheck < 9) { dateToCheck = "0"+dateToCheck };

    // CHECK THE DATE AGAINST THE TIMETABLE OBJ
    var checkDate = yearToCheck+"-"+monthToCheck+"-"+dateToCheck;
    return checkDate;
}


// ===========================================================================
// END CANCELLED FERRIES
// ===========================================================================



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

function getPrettyTime(date){ 
    var rawDate = new Date(date);

    var hours = lessThanTen(rawDate.getHours());
    var minutes = lessThanTen(rawDate.getMinutes());
    var seconds = lessThanTen(rawDate.getSeconds());

    var time = "" + hours + ":"  
                + minutes + "";
    return time; 
}

function lessThanTen(number) {
    if (number < 10) {
        var newNumber = "0"+number;
    } else {
        var newNumber = number;
    };
    return newNumber;
};
