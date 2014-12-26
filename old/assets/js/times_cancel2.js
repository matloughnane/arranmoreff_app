var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable3/");

var journey1 = 'Departing Arranmore';
var journey2 = 'Departing Burtonport';

// RUNNING FUNCTION
$(function() { 
	// GET TIMETABLE OBJECT
	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();
	// END FIREBASE

	// DISPLAY ALL CANCELLED FERRIES
	displayCancelTable(timetableObj, journey1, "cancelListDA");
	displayCancelTable(timetableObj, journey2, "cancelListDB");

	// CHOOSE DAY FUNCTION
	jQuery('body').on('click', 'a', function () {
		if ( $(this).hasClass("day_select") ) {
			var input_date = $(this).prev('select').prev('input');
			var chosenDate = input_date.val();
			var input_journey = $(this).prev('select');
			var chosenJourney = input_journey.val();
			// console.log(chosenDate + " " + chosenJourney);
			listTimesForDate(timetableObj, chosenDate, chosenJourney);
		} 
		// END IF STATEMENT
	});

	// CANCEL BUTTON IS CLICKED
	jQuery('body').on('click', 'a', function () {
		if ( $(this).hasClass("cancelFerry_btn") ) {
			// console.log("cancelButtonClicked");
			var journeyType = $(this).parent("li").attr('id');
			var date = $(this).attr('id');
			var cancelTime = $(this).children("i").attr('id');
			// console.log(journeyType + ", " + date + ", " + cancelTime);
			pushToCancelFirebase(journeyType, date, cancelTime);
			location.reload();
		} 
		// END IF STATEMENT
	});

	// UNCANCEL BUTTON IS CLICKED
	jQuery('body').on('click', 'a', function () {
		if ( $(this).hasClass("unCancelFerry_btn") ) {
			// console.log("cancelButtonClicked");
			var journeyType = $(this).parent("td").attr('id');
			var unCancelID = $(this).attr('id');
			// console.log(journeyType);
			// console.log(unCancelID);
			unCancelFirebase(journeyType, unCancelID, timetableObj);
		} 
		// END IF STATEMENT
	});

	// ERROR FUNCTION
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});
	// END THE RUNNING FUNCTION
});


// DATE AND JOURNEY ARE CHOSEN, - FUNCTION TO LIST ALL THE CANCELLED TIMES
function listTimesForDate(timetableObj, date, journey){
	// GET THE ARRAY
	var dateArray = getArrayForDate(timetableObj, date, journey);
	// console.log(getArrayForDate(timetableObj, date, journey));
	// GET THE CANCELLATION ARRAY
	var cancelArray = checkForCancellationsDate(timetableObj, date, journey);
	// REMOVE CANCELLED FROM THE LIST
	var possibleTimes = removeCancelledFromList(dateArray, cancelArray);
	// DISPLAY THE LIST
	var cancelListHTML = generateTheCancelledList(date, journey, possibleTimes);

	document.getElementById("cancelList").innerHTML = cancelListHTML;

}


// ==================================================================================================

// CANCELLED FERRIES LIST FUNCTIONS

function checkForCancellationsDate(timetableObj, date, journey){
	// CHOOSE CANCEL TREE
	if (journey == journey1) {
		var cancelObj = timetableObj.cancel_ferry.da;
	} else {
		var cancelObj = timetableObj.cancel_ferry.db;
	}
	var array = [];
	// console.log(cancelObj);
	for (key in cancelObj) {
		array.push(cancelObj[key].time);
	};
	// console.log(array);
	return array;
}

// CANCELLED FERRIES FUNCTIONS

function removeCancelledFromList(dateArray, cancelArray){
	var finalArray = dateArray;
	// console.log(dateArray + ",> " + cancelArray);
	for (var i = 0; i < dateArray.length; i++){
		for(var j = 0; j < cancelArray.length; j++){
			if (dateArray[i] == cancelArray[j]) {
				// SPLICE
				finalArray.splice(i, 1);
			}
		}
	}
	return finalArray;
}

// DISPLAYED CANCELLED FERRY LIST
function generateTheCancelledList(date, journey, array){
	var timesList = "<h3> Cancel Ferries " + journey + ", on " + date +"</h3>";
	timesList += "<ul class='cancelTimesList'>";
	for (var i = 0; i < array.length; i++) {
		timesList += "<li class='cancel_list_item' id='" + journey + "'>" + array[i] + "<a class='cancelFerry_btn pull-right' id='" + date + "'><i class='fa fa-ban margin_right cancelIcon' id='" + array[i] + "'></i>Cancel This Ferry</a></li>";
		// console.log(date + " " + array[i]);
	};
	timesList += "</ul>";
	// console.log(timesList);
	return timesList;
}


// PUSH CANCELLED FIREBASE
function pushToCancelFirebase(journeyType, dateID, cancelTime) {
	if (journeyType == journey1){
		var rootRef = firebaseRef.child("cancel_ferry/da");
	} else {
		var rootRef = firebaseRef.child("cancel_ferry/db");		
	}
	rootRef.push( {date: dateID, time: cancelTime} );
}



function displayCancelTable(timetableObj, journey, htmlID){
	// NOTHING
	if (journey == journey1){
		var timeObj = timetableObj.cancel_ferry.da;
		var cssClass = "main_color";
	} else {
		var timeObj = timetableObj.cancel_ferry.db;
		var cssClass = "opp_color";
	};

	var cancelTable = "<table class='" + cssClass + "'><tr><th class='" + cssClass + "'>" + journey + "</th></tr>";
	for (key in timeObj) {
		if (key == "-Jxyz") {
			cancelTable += "<tr><td class='" + cssClass + " light_darkText'> There are no more cancelled ferries planned </td></tr>";
		} else {
			cancelTable += "<tr><td class='" + cssClass + " light_darkText' id='" + journey + "' >" + timeObj[key].date + ", " + timeObj[key].time + "<a class='unCancelFerry_btn pull-right' id='" + key + "'><i class='fa fa-undo margin_right cancelIcon'></i>un-cancel this ferry</a></td></tr>";
		}
	};
	cancelTable += "</table>";

	document.getElementById(""+htmlID+"").innerHTML = cancelTable;
}


// UN CANCEL A FERRY

function unCancelFirebase(journeyType, unCancelID, timetableObj) {
	// console.log("uncancel a ferry" + journeyType + unCancelID);
	if (journeyType == journey1){
		var rootRef2 = firebaseRef.child("cancel_ferry/da");
	} else {
		var rootRef2 = firebaseRef.child("cancel_ferry/db");
	};

	rootRef2.child( unCancelID ).remove();
}


// ==================================================================================================

// GENERAL FUNCTIONS

function getArrayForDate(timetableObj, date, journey) {

	var tdate = new Date(date);
	if (tdate.getMonth() > 3 && tdate.getMonth() < 8 ) {
		if (tdate.getDay() == 0) {
			// WEEKEND JOURNEYS
			if (journey == journey1) {
				return generateArrays(timetableObj.summer_da.weekend);
			} else {
				return generateArrays(timetableObj.summer_db.weekend);
			}
		} else {
			// WEEK DAY JOURNEY
			if (journey == journey1) {
				return generateArrays(timetableObj.summer_da.weekday);
			} else {
				return generateArrays(timetableObj.summer_db.weekday);
			}
		}
	} else {
		if (tdate.getDay() == 0) {
			// WEEKEND JOURNEYS
			if (journey == journey1) {
				return generateArrays(timetableObj.winter_da.weekend);
			} else {
				return generateArrays(timetableObj.winter_db.weekend);
			}
		} else {
			// WEEK DAY JOURNEY
			if (journey == journey1) {
				return generateArrays(timetableObj.winter_da.weekday);
			} else {
				return generateArrays(timetableObj.winter_db.weekday);
			}
		}
	}
}

function generateArrays(object){
	array = [];
	// GENERATE THE ARRAY
	for (key in object ) {
		array.push(object[key].time);
	};
	// SORT THE ARRAY
	array.sort(function (a, b) {
  		return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
	});
	// return the array
	return array;
}
