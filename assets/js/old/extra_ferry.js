
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


