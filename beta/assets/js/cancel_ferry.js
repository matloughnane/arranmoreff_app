var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable3/");

var journey1 = "Departing Arranmore";
var journey2 = "Departing Burtonport";

$(function() {
	// GET FIREBASE OBJECT
	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();

	// CHOOSE DAY FUNCTION
	jQuery('body').on('click', 'a', function () {
		if ( $(this).hasClass("day_select") ) {
			var chosenDate = document.getElementById('dateInput').value
			// console.log(chosenDate);
			var chosenJourney = document.getElementById('journeyInput').value
			console.log(chosenJourney);
			listTimesForDate(timetableObj, chosenDate, chosenJourney);
		} 
	});

	// CANCEL
	// createJourneyTable(timetableObj.summer_da, journey1, "summer_da");
	// createJourneyTable(timetableObj.summer_db, journey2, "summer_db");

	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});

});


function pushToFirebase(rootRef, timeToPush) {
	rootRef.push( {time: timeToPush} );
}

function removeFromFirebase(rootRef, firebaseID){
	rootRef.child( firebaseID ).remove();
}



// DATE AND JOURNEY ARE CHOSEN, - FUNCTION TO LIST ALL THE CANCELLED TIMES
function listTimesForDate(timetableObj, date, journey){
	var dateArray = getArrayForDate(timetableObj, date, journey);
	var cancelArray = checkForCancellationsDate(timetableObj, date, journey);
	var possibleTimes = removeCancelledFromList(dateArray, cancelArray);
	var cancelListHTML = generateTheCancelledList(date, journey, possibleTimes);
	document.getElementById("cancelList").innerHTML = cancelListHTML;
}

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



