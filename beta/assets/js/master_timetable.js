var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable3/");

var journey1 = "Departing Arranmore";
var journey2 = "Departing Burtonport";

$(function() {
	// GET FIREBASE OBJECT
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


$(function() {
	// ADD FUNCTION
	jQuery('body').on('click', 'a', function () {
		if ( $(this).hasClass("summer_da_wk") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			if (ferryTime == '') {
				toast('Enter a valid time', 3000);
			} else {
				var rootRef = firebaseRef.child("summer_da/weekday");
				pushToFirebase(rootRef, ferryTime);
				toast('Ferry Added!', 3000);
			}

		} 
		else if ( $(this).hasClass("summer_da_we") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			if (ferryTime == '') {
				toast('Enter a valid time', 3000);
			} else {
			var rootRef = firebaseRef.child("summer_da/weekend");
			pushToFirebase(rootRef, ferryTime);
			toast('Ferry Added!', 3000);
			}
		}  
		else if ( $(this).hasClass("summer_db_wk") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			if (ferryTime == '') {
				toast('Enter a valid time', 3000);
			} else {
			var rootRef = firebaseRef.child("summer_db/weekday");
			pushToFirebase(rootRef, ferryTime);
			toast('Ferry Added!', 3000);
			}

		}  
		else if ( $(this).hasClass("summer_db_we") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			if (ferryTime == '') {
				toast('Enter a valid time', 3000);
			} else {
			var rootRef = firebaseRef.child("summer_db/weekend");
			pushToFirebase(rootRef, ferryTime);
			toast('Ferry Added!', 3000);
			}
		}   
		else if ( $(this).hasClass("winter_da_wk") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			if (ferryTime == '') {
				toast('Enter a valid time', 3000);
			} else {
			var rootRef = firebaseRef.child("winter_da/weekday");
			pushToFirebase(rootRef, ferryTime);
			toast('Ferry Added!', 3000);
			}
		}  
		else if ( $(this).hasClass("winter_da_we") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			if (ferryTime == '') {
				toast('Enter a valid time', 3000);
			} else {
			var rootRef = firebaseRef.child("winter_da/weekend");
			pushToFirebase(rootRef, ferryTime);
			toast('Ferry Added!', 3000);
			}
		}   
		else if ( $(this).hasClass("winter_db_wk") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			if (ferryTime == '') {
				toast('Enter a valid time', 3000);
			} else {
			var rootRef = firebaseRef.child("winter_db/weekday");
			pushToFirebase(rootRef, ferryTime);
			toast('Ferry Added!', 3000);
			}
		}  
		else if ( $(this).hasClass("winter_db_we") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			if (ferryTime == '') {
				toast('Enter a valid time', 3000);
			} else {
			var rootRef = firebaseRef.child("winter_db/weekend");
			pushToFirebase(rootRef, ferryTime);
			toast('Ferry Added!', 3000);
			}

		} 
	}); // END THE JQUERY ADD FUNCTION
	// DELETE FUNCTION
	jQuery('body').on('click', 'a', function () {
		if ( $(this).hasClass("summer_da_wk_list") ) {
			var timeID = $(this).attr('id');;
			var rootRef = firebaseRef.child("summer_da/weekday");
			removeFromFirebase(rootRef, timeID);
			toast('Ferry Removed!', 3000);
		}
		else if ( $(this).hasClass("summer_da_we_list") ) {
			var timeID = $(this).attr('id');;
			var rootRef = firebaseRef.child("summer_da/weekend");
			removeFromFirebase(rootRef, timeID);
			toast('Ferry Removed!', 3000);
		}
		else if ( $(this).hasClass("summer_db_wk_list") ) {
			var timeID = $(this).attr('id');;
			var rootRef = firebaseRef.child("summer_db/weekday");
			removeFromFirebase(rootRef, timeID);
			toast('Ferry Removed!', 3000);
		}
		else if ( $(this).hasClass("summer_db_we_list") ) {
			var timeID = $(this).attr('id');;
			var rootRef = firebaseRef.child("summer_db/weekend");
			removeFromFirebase(rootRef, timeID);
			toast('Ferry Removed!', 3000);
		}
		else if ( $(this).hasClass("winter_da_wk_list") ) {
			var timeID = $(this).attr('id');;
			var rootRef = firebaseRef.child("winter_da/weekday");
			removeFromFirebase(rootRef, timeID);
			toast('Ferry Removed!', 3000);
		}
		else if ( $(this).hasClass("winter_da_we_list") ) {
			var timeID = $(this).attr('id');;
			var rootRef = firebaseRef.child("winter_da/weekend");
			removeFromFirebase(rootRef, timeID);
			toast('Ferry Removed!', 3000);
		}
		else if ( $(this).hasClass("winter_db_wk_list") ) {
			var timeID = $(this).attr('id');;
			var rootRef = firebaseRef.child("winter_db/weekday");
			removeFromFirebase(rootRef, timeID);
			toast('Ferry Removed!', 3000);
		}
		else if ( $(this).hasClass("winter_db_we_list") ) {
			var timeID = $(this).attr('id');;
			var rootRef = firebaseRef.child("winter_db/weekend");
			removeFromFirebase(rootRef, timeID);
			toast('Ferry Removed!', 3000);
		}
	});
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
});



function createJourneyTable(object, journey, htmlID) {

	if (journey == journey1){
		var cssColor = "orange";
	} else {
		var cssColor = "blue";
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
	
	// GENERATE TABLE

	var tableHTML_wk = "<table class='centered " + cssColor + " lighten-4'>";
	tableHTML_wk += "<thead> <tr> <th colspan='" + weekdayTimeArray.length + "' class='"+ cssColor +" lighten-2'>" + journey + "</th> </tr> </thead>";
	tableHTML_wk += "<thead> <tr> <th colspan='" + weekdayTimeArray.length + "' class='"+ cssColor +" lighten-3'>Monday to Saturday</th> </tr> </thead>";
	tableHTML_wk += "<tbody> <tr>";
	for (var i = 0; i < weekdayTimeArray.length; i++) {
		tableHTML_wk += "<td>" + weekdayTimeArray[i] + "</td>";
	};
	tableHTML_wk += "</tr></tbody></table>"

	var tableHTML_we = "<table class='centered " + cssColor + " lighten-4'>";
	tableHTML_we += "<thead> <tr> <th colspan='" + weekendTimeArray.length + "' class='"+ cssColor +" lighten-3'>Sunday</th> </tr> </thead>";
	tableHTML_we += "<tbody> <tr>";
	for (var i = 0; i < weekendTimeArray.length; i++) {
		tableHTML_we += "<td>" + weekendTimeArray[i] + "</td>";
	};
	tableHTML_we += "</tr></tbody>"

	var tableHTML = tableHTML_wk + tableHTML_we;

	document.getElementById(""+ htmlID +"").innerHTML = tableHTML;

	// GENERATE LIST
	// WEEKDAY LIST
	var htmlID_list_wk = htmlID+"_wk_list";
	var listHTML_wk = ""
	for (key in object.weekday) {
		listHTML_wk += "<div class='list_item " + cssColor + " lighten-4'>" + object.weekday[key].time + " <a class='waves-effect waves-light red lighten-1 cancel_btn white-text " + htmlID_list_wk + "' id='" + key + "'><i class='mdi-action-highlight-remove'></i> remove ferry </a> </div>";
	};
	document.getElementById(""+ htmlID_list_wk +"").innerHTML = listHTML_wk;

	// WEEKEND LIST
	var htmlID_list_we = htmlID+"_we_list";
	var listHTML_we = "";
	for (key in object.weekend) {
		listHTML_we += "<div class='list_item " + cssColor + " lighten-4'>" + object.weekend[key].time + " <a class='waves-effect waves-light red lighten-1 cancel_btn white-text " + htmlID_list_we + "' class='cancel_btn white-text' id='" + key + "'><i class='mdi-action-highlight-remove'></i> remove ferry </a></span> </div>";
	};
	document.getElementById(""+ htmlID_list_we +"").innerHTML = listHTML_we;

}


function pushToFirebase(rootRef, timeToPush) {
	rootRef.push( {time: timeToPush} );
}

function removeFromFirebase(rootRef, firebaseID){
	rootRef.child( firebaseID ).remove();
}





