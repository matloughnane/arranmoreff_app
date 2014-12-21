
// The link for the arrays
// https://amber-fire-55.firebaseio.com/timetable/summer_da/weekday

var variable1 = "This is the first variable";
var variable2 = "This is the second variable";

var ferryArray = ["0700", "0800", "1015", "1200"];

$(function() {

	console.log( variable1 );
	console.log( ferryArray );

	printArray();

});

function pushNewFerry(newFerryTime) {
	ferryArray.push(newFerryTime);
}

function printArray() {
	document.getElementById("ferry_array_html").innerHTML = ferryArray;
}
