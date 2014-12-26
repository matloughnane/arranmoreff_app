
// The link for the arrays
// https://amber-fire-55.firebaseio.com/timetable/summer_da/weekday

var season1 = "Summer (May to August)";
var season2 = "Winter (September to April)";

var journey1 = "Departing Arranmore";
var journey2 = "Departing Burtonport";

var days1 = "Monday to Saturday";
var days2 = "Sunday";

var x1 = "SummerSec1";
var x2 = "SummerSec2";
var x3 = "SummerSec3";
var x4 = "SummerSec4";

var x5 = "WinterSec1";
var x6 = "WinterSec2";
var x7 = "WinterSec3";
var x8 = "WinterSec4";

$(function() {

	var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/");

	// ============ CONTRUCTING THE SUMMER TABLES =======================

	// SUMMER DEPARTING ARRANMORE
	var timetableSummerWeekdayDARef = firebaseRef.child("timetable/summer_da/weekday");
	var timetableSummerWeekendDARef = firebaseRef.child("timetable/summer_da/weekend");

	// CALL THE CONSTRUCTORS
	sectionConstructor(timetableSummerWeekdayDARef, journey1, days1, x1, season1);
	sectionConstructor(timetableSummerWeekendDARef, journey1, days2, x2, season1);

	// SUMMER DEPARTING BURTONPORT
	var timetableSummerWeekdayDBRef = firebaseRef.child("timetable/summer_db/weekday");
	var timetableSummerWeekendDBRef = firebaseRef.child("timetable/summer_db/weekend");
	
	// CALL THE CONSTRUCTORS
	sectionConstructor(timetableSummerWeekdayDBRef, journey2, days1, x3, season1);
	sectionConstructor(timetableSummerWeekendDBRef, journey2, days2, x4, season1);

	// ============ CONTRUCTING THE WINTER TABLES =======================

		// SUMMER DEPARTING ARRANMORE
	var timetableWinterWeekdayDARef = firebaseRef.child("timetable/winter_da/weekday");
	var timetableWinterWeekendDARef = firebaseRef.child("timetable/winter_da/weekend");

	// CALL THE CONSTRUCTORS
	sectionConstructor(timetableWinterWeekdayDARef, journey1, days1, x5, season2);
	sectionConstructor(timetableWinterWeekendDARef, journey1, days2, x6, season2);

	// SUMMER DEPARTING BURTONPORT
	var timetableWinterWeekdayDBRef = firebaseRef.child("timetable/winter_db/weekday");
	var timetableWinterWeekendDBRef = firebaseRef.child("timetable/winter_db/weekend");
	
	// CALL THE CONSTRUCTORS
	sectionConstructor(timetableWinterWeekdayDBRef, journey2, days1, x7, season2);
	sectionConstructor(timetableWinterWeekendDBRef, journey2, days2, x8, season2);


	// GET EXTRA SAILINGS
	var timetableExtraFerries = firebaseRef.child("timetable/extra_ferry");
	extraFerries(timetableExtraFerries);

	// HI TO DEVELOPERS
	console.log("Hi Marion! (now I'm just showing off :P)");

});

// CREATE GENERAL TABLE FUNCTION

// INPUTS
// FIREBASE reference
// Type of Journey
// The type of day
// needs to export a table section with three rows season, day and times
// Season to change the colour


function sectionConstructor(firebaseArrayRef, journeyType, dayType, htmlID, season) {

	firebaseArrayRef.on("value", function(snapshot) {
		// Get's the array in the correct format and logs it
		var timesArray = [];
		timesArray = snapshot.val();
		// console.log(timesArray);

		// Construct the table
		var tableCons = timetableConstructor(timesArray, journeyType, dayType, season);

		// Put the table in the HTML
		document.getElementById( ""+ htmlID +"" ).innerHTML = tableCons;

	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

}


function timetableConstructor(myArray, journeyTitle1, daysTitle1, seasonTitle) {

	if (seasonTitle == season1) {
		var headingColor = "main_color";
		var tdTitleColor = "main_color light_darkText";
	} else {
		var headingColor = "opp_color";
		var tdTitleColor = "opp_color light_darkText";
	}

	if (daysTitle1 == days1) {
		// Create the heading
    	var result = "<tr> <th class=" + headingColor + " colspan=" + myArray.length + "> " + journeyTitle1 + "</th> </tr>";
    	// Create the weekday timetable
	} else {
		var result = "";
	}
    result += "<tr> <td class='" + tdTitleColor + "'colspan=" + myArray.length + ">" + daysTitle1 + "</td> </tr> <tr>";
    for(var i=0; i < myArray.length; i++) {
            result += "<td>" + myArray[i] + "</td>";
    }
    result += "</td>";    

    result += "</td>";


    return result;
}


function extraFerries(myArray2) {
	myArray2.on("value", function(snapshot) {
		// Get's the array in the correct format and logs it
		var extraTimesArray = [];
		extraTimesArray = snapshot.val();
		// console.log(extraTimesArray.length);

		if (extraTimesArray.length > 1) {
			// construct table for extra ferries
			// Header
			var extraFerryTable = "<tr> <th class='main_color'> Extra Ferries </th> </tr>"
			// Rows in the table
			for(var i=1; i < extraTimesArray.length; i++) {
            	extraFerryTable += "<tr><td class='main_color light_darkText'>" + extraTimesArray[i] + "</td></tr>";
    		}
		} else {
			// write an empty statement
			extraFerryTable = "<tr> <th class='main_color'>There are no extra ferries planned</th> </tr>"
		}

		// Put the table in the HTML
		document.getElementById("ExtraFerry").innerHTML = extraFerryTable;

	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
}


