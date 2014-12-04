// GET LATEST TIME AND DISPLAY NEXT FERRY

$(function() {

	// DECLARE FIREBASE
	var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/");
	// GET TIME AND DATE
	// SUNDAY is 0, 0-6
	var d = new Date();
	// DATE NEEDED FOR CHOOSING ARRAY
	var month = d.getMonth();
	var day = d.getDay();

	var hours = d.getHours();
	var minutes = d.getMinutes();
	var currentTime = (hours*100)+(minutes);

	var da = "Departing Arranmore"
	var db = "Departing Burtonport"

	// ================= DEPARTING ARRANMORE =====================

	// SUMMER MONTHS = MAY (4) TO AUGUST (7)
	if (month > 3 && month < 8) {
		// check days
		if (day < 6){
			// weekday
			var timetableDA = firebaseRef.child("timetable/summer_da/weekday");
		} else {
			// weekend
			var timetableDA = firebaseRef.child("timetable/summer_da/weekend");
		}
	}  // WINTER MONTHS
	else {
		// check days
		if (day < 6){
			// weekday
			var timetableDA = firebaseRef.child("timetable/winter_da/weekday");
		} else {
			// weekend
			var timetableDA = firebaseRef.child("timetable/winter_da/weekend");
		}
	}

	// ================= DEPARTING BURTONPORT =====================

	// SUMMER MONTHS = MAY (4) TO AUGUST (7)
	if (month > 3 && month < 8) {
		// check days
		if (day < 6){
			// weekday
			var timetableDB = firebaseRef.child("timetable/summer_db/weekday");
		} else {
			// weekend
			var timetableDB = firebaseRef.child("timetable/summer_db/weekend");
		}
	}  // WINTER MONTHS
	else {
		// check days
		if (day < 6){
			// weekday
			var timetableDB = firebaseRef.child("timetable/winter_db/weekday");
		} else {
			// weekend
			var timetableDB = firebaseRef.child("timetable/winter_db/weekend");
		}
	}


	nextFerry(timetableDA, currentTime, "da");
	nextFerry(timetableDB, currentTime, "db");

});


function nextFerry(timetableArrayRef, time, departing) {
	timetableArrayRef.on("value", function(snapshot) {
		// Get's the array in the correct format and logs it
		var timetableArray = [];
		timetableArray = snapshot.val();

		var nextFerryTime = 0;

		// log times
		// console.log(timetableArray);
		// console.log(time);

		for (var j = 0; j < timetableArray.length; j++) {
			if (time < timetableArray[j]) {
				nextFerryTime = timetableArray[j];
				break;
			} else {
				nextFerryTime = "There are no more ferries today!"
			}
		}

		if (departing == "da") {
			// Put the time in the HTML
			document.getElementById("nextDA").innerHTML = nextFerryTime;
		} else {
			// Put the table in the HTML
			document.getElementById("nextDB").innerHTML = nextFerryTime;
		}

	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
}





