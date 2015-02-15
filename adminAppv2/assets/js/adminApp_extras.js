var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable4/");

$(function() { 
	// GET TIMETABLE OBJECT
	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();
	// END FIREBASE

	constructExtrasLists(timetableObj);
	
	constructExtraTables(timetableObj)

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

	jQuery('body').on('click', 'a', function () { 
		// JAN TO APR
		if ( $(this).hasClass("da_extra_btn") ) {
			// console.log("da extra clicked");
			var extraDate = $('input[ name="da_extra_date"]').val();
			var extraTime = $(this).prev('input').val();
			// console.log(extraDate + " " + extraTime);
			pushExtraFerryTime("da", extraDate, extraTime);
		} else if ( $(this).hasClass("db_extra_btn")) {
			console.log("db extra clicked");
			var extraDay = $('input[ name="db_extra_date"]').val();
			var extraTime = $(this).prev('input').val();
			// console.log(extraDay + " " + extraTime);
			pushExtraFerryTime("db", extraDay, extraTime);
		}
	});
});

function pushExtraFerryTime(journey, extraDate, extraTime){
	if (extraDate == "" | extraTime == "") {
		if (extraTime == "" && extraDate != "") {
			toastr.error('<i class="mdi-alert-warning margin_right"></i>Please enter a valid time!');
		} else if (extraDate == "" && extraTime != "") {
			toastr.error('<i class="mdi-alert-warning margin_right"></i>Please enter a valid date!');
		} else {
			toastr.error('<i class="mdi-alert-warning margin_right"></i>Please enter a valid date and time!');
		}
	} else {
		var databaseRef = "extra_ferry/"+journey;
		var refToPush = firebaseRef.child(databaseRef);
		refToPush.push( {date: extraDate, time: extraTime} );
		toastr.success("<i class='mdi-action-done margin_right'></i>Extra ferry time added!");
	}
};

// ===========================================================================
// END THE FUNCTIONS FOR ADDING FERRIES
// ===========================================================================


// ===========================================================================
// START THE LISTS FOR EDITING FERRIES
// ===========================================================================

function constructExtrasLists(timetableObj) {
	var extrasObj = timetableObj.extra_ferry;
	// console.log(extrasObj);
	for (key in extrasObj) {
		var journey = key;
		var dateTimeObj = extrasObj[key];
		constructSingleExtrasList(dateTimeObj, journey+"_extra_list");
	}
};

function constructSingleExtrasList(Obj, htmlID) {
	// console.log(Obj + " " + htmlID);
	var result = "";
	for (key in Obj){
		var today = getTodayDate();
		if (datesInFuture(Obj[key].date, today) == true){
			var prettyDate = getPrettyDate(Obj[key].date);
			result += "<div id="+key+" class='list_item'> "+prettyDate+" at "+Obj[key].time+" <a class='margin_left mdi-content-remove-circle red remove_extraFerryTime_btn'></a></div>";
		};
	};
	document.getElementById(htmlID).innerHTML = result;
};

// START THE RUNNING FUNCTION FOR REMOVING EXTRA FERRIES

$(function() { 
	jQuery('body').on('click', 'a', function () { 
		if ($(this).hasClass('remove_extraFerryTime_btn')){
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

function constructExtraTables(timetableObj){
	var extrasObj = timetableObj.extra_ferry;
	// console.log(extrasObj);
	for (key in extrasObj) {
		var journey = key;
		var dateTimeObj = extrasObj[key];
		constructSingleExtraTable(dateTimeObj, journey+"_extra_table");
	};
}

function constructSingleExtraTable(dateTimeObj, htmlID){
	var journey = htmlID.substr(0, htmlID.indexOf('_'));
	// console.log(htmlID + journey);
	// console.log(htmlID);
	if (journey == "da"){
		var cssColor = "blue";
		var journeyTitle = "Departing Arranmore";
	} else {
		var cssColor = "orange";
		var journeyTitle = "Departing Burtonport";
	};

	var array_extra = generateArraysWithDate(dateTimeObj);
	console.log(htmlID + " " + array_extra);

    // EXTRA TABLE
    var tableHTML = "<table class='"+cssColor+" align-center' border='1'> <thead> <tr> <th class='"+cssColor+"'>" + journeyTitle + "</th> </tr> </thead>";
    tableHTML += "<tbody>";

    if (array_extra.length != 0){
	    for (var i = 0; i < array_extra.length; i++) {
	        tableHTML += "<tr> <td>" + array_extra[i] + "</td></tr>";
	    };    	
    } else {
    	tableHTML += "<tr> <td> There are no upcoming extra ferries planned! </td></tr>";
    }


    tableHTML += "</tbody></table>";

    document.getElementById(htmlID).innerHTML = tableHTML;
}

function generateArraysWithDate(timeObj){
	array = [];
    // GENERATE THE ARRAY
    for (key in timeObj) {
    	var today = getTodayDate();
    	if (datesInFuture(timeObj[key].date, today) == true){
    		var date = getPrettyDate(timeObj[key].date);
        	array.push(date + " " + timeObj[key].time);
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

    if (cdate.getYear() >= tdate.getYear()) {
        if (cdate.getMonth() >= tdate.getMonth()) {
            if (cdate.getDate() >= tdate.getDate()) {
                return true;
            }
        }
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
