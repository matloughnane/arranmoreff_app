var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable3/");

var journey1 = "Departing Arranmore";
var journey2 = "Departing Burtonport";

$(function() {

	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();

	createJourneyTable(timetableObj.summer_da, journey1, "summer_da");
	createJourneyTable(timetableObj.summer_db, journey2, "summer_db");

	createJourneyTable(timetableObj.winter_da, journey1, "winter_da");
	createJourneyTable(timetableObj.winter_db, journey2, "winter_db");
	
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});

});


function createJourneyTable(object, journey, htmlID) {

	if (journey == journey1){
		var cssColor = "main_color";
	} else {
		var cssColor = "opp_color";
	};

	var weekdayTimeArray = [];
	for(key in object.weekday){
		weekdayTimeArray.push(object.weekday[key].time);
	}
	weekdayTimeArray.sort(function (a, b) {
  		return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
	});

	var weekendTimeArray = [];
	for(key in object.weekend){
		weekendTimeArray.push(object.weekend[key].time);
	}
	weekendTimeArray.sort(function (a, b) {
  		return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
	});
	
	if (weekdayTimeArray.length > weekendTimeArray.length) {
		var colWidth = weekdayTimeArray.length;
	} else {
		var colWidth = weekendTimeArray.length;
	}
	// GENERATE TABLE

	var tableHTML = "<table class='align-center " + cssColor + "'>";
	tableHTML += "<thead> <tr> <th colspan='" + weekdayTimeArray.length + "' class='"+ cssColor +"'>" + journey + "</th> </tr> </thead>";
	tableHTML += "<thead> <tr> <th colspan='" + weekdayTimeArray.length + "' class='"+ cssColor +" smaller'>Monday to Saturday</th> </tr> </thead>";
	tableHTML += "<tbody colspan='" + weekdayTimeArray.length + "'> <tr>";
	for (var i = 0; i < weekdayTimeArray.length; i++) {
		tableHTML += "<td class='"+ cssColor +" light_darkText'>" + weekdayTimeArray[i] + "</td>";
	};
	tableHTML += "</tr></tbody></table>"

	tableHTML += "<table class='align-center " + cssColor + "'>";
	tableHTML += "<thead> <tr> <th colspan='" + weekendTimeArray.length + "' class='"+ cssColor +" smaller'>Sunday</th> </tr> </thead>";
	tableHTML += "<tbody> <tr>";
	for (var i = 0; i < weekendTimeArray.length; i++) {
		tableHTML += "<td class='"+ cssColor +" light_darkText'>" + weekendTimeArray[i] + "</td>";
	};
	tableHTML += "</tr></tbody></table>"

	// console.log(tableHTML);
	document.getElementById(""+ htmlID +"").innerHTML = tableHTML;

}