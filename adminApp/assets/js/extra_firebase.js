var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable3/");

var season1 = "Summer (May to August)";
var season2 = "Winter (September to April)";

var journey1 = "Departing Arranmore";
var journey2 = "Departing Burtonport";

var days1 = "Monday to Saturday";
var days2 = "Sunday";


$(function() {
	// BUILD EXTRAS
	createExtrasTable(journey1);
	createExtrasTable(journey2);
// END OF RUNNING FUNCTION
});


// RUNNING FUNCTION OF CHECKING THE BUTTON CLICKS
$(function() {

	// ADD FUNCTION
	jQuery('body').on('click', 'a', function () {
		if ( $(this).hasClass("summer_da_wk") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			pushToFirebase("summer_da_wk", ferryTime);
		} 
		else if ( $(this).hasClass("summer_da_we") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			pushToFirebase("summer_da_we", ferryTime);
		}  
		else if ( $(this).hasClass("summer_db_wk") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			pushToFirebase("summer_db_wk", ferryTime);
		}  
		else if ( $(this).hasClass("summer_db_we") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			pushToFirebase("summer_db_we", ferryTime);
		}   
		else if ( $(this).hasClass("winter_da_wk") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			pushToFirebase("winter_da_wk", ferryTime);
		}  
		else if ( $(this).hasClass("winter_da_we") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			pushToFirebase("winter_da_we", ferryTime);
		}   
		else if ( $(this).hasClass("winter_db_wk") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			pushToFirebase("winter_db_wk", ferryTime);
		}  
		else if ( $(this).hasClass("winter_db_we") ) {
			var input = $(this).prev('input');
			var ferryTime = input.val();
			pushToFirebase("winter_db_we", ferryTime);
		} 
	}); // END THE JQUERY ADD FUNCTION

	// DELETE FUNCTION
	jQuery('body').on('click', 'i', function () {
		if ( $(this).hasClass("time_tag_delete") ) {
			// summer da wk click
			if ( $(this).closest("span").hasClass("summer_da_wk") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("summer_da_wk", timetable_id);
			}
			if ( $(this).closest("span").hasClass("summer_da_we") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("summer_da_we", timetable_id);
			}
			if ( $(this).closest("span").hasClass("summer_db_wk") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("summer_db_wk", timetable_id);
			}
			if ( $(this).closest("span").hasClass("summer_db_we") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("summer_db_we", timetable_id);
			}
			if ( $(this).closest("span").hasClass("winter_da_wk") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("winter_da_wk", timetable_id);
			}
			if ( $(this).closest("span").hasClass("winter_da_we") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("winter_da_we", timetable_id);
			}
			if ( $(this).closest("span").hasClass("winter_db_wk") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("winter_db_wk", timetable_id);
			}
			if ( $(this).closest("span").hasClass("winter_db_we") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("winter_db_we", timetable_id);
			}
			if ( $(this).closest("span").hasClass("extra_ferry_tag_da") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("extra_ferry_tag_da", timetable_id);
			}
			if ( $(this).closest("span").hasClass("extra_ferry_tag_db") ) {
				var timetable_id = $(this).attr('id');
				removeTimetableEntry("extra_ferry_tag_db", timetable_id);
			}
		}
	});

	// ADD EXTRA FUNCTION
	jQuery('body').on('click', 'a', function () {
		if ( $(this).hasClass("extra_ferry_da") ) {
			var input_time = $(this).prev('input');
			var ferryTime = input_time.val();
			// var ferryTime = input_time.val();
			var journey = journey1;
			var input_date = $(this).prev('input').prev('input');
			var ferryDate = input_date.val();
			// LOG
			pushToExtraFirebase(ferryDate, ferryTime, journey);
		}
		if ( $(this).hasClass("extra_ferry_db") ) {
			var input_time = $(this).prev('input');
			var ferryTime = input_time.val();
			// var ferryTime = input_time.val();
			var journey = journey2;
			var input_date = $(this).prev('input').prev('input');
			var ferryDate = input_date.val();
			// LOG
			pushToExtraFirebase(ferryDate, ferryTime, journey);
		} 
	}); // END THE JQUERY ADD FUNCTION

// RUNNING FUNCTION CLOSES
});


// =============== EXTRA FIREBASE ================

// PUSH TO EXTRA FERRY

function pushToExtraFirebase(ferryDate, ferryTime, journey){
	if (journey == journey1) {
		var rootRef = firebaseRef.child("extra_ferry/da");
	} else {
		var rootRef = firebaseRef.child("extra_ferry/db");
	}
	rootRef.push( {date: ferryDate, time: ferryTime} );
};

// CREATE TABLE

function createExtrasTable(journey){
	// CREATE TABLE AND INSERT
	if (journey == journey1) {
		var rootRef = firebaseRef.child("extra_ferry/da");
	} else {
		var rootRef = firebaseRef.child("extra_ferry/db");
	}

	// ON VALUE CHANGE
    rootRef.on('value', function ( snapshot ) {
		var value = snapshot.val();
		// console.log(value);

		var array = [];

		for (key in value) {
			var formatDate = convertDate(value[key].date);
			array.push( formatDate + " " + value[key].time);
		}
		
		// SORT THE ARRAY
		array.sort(function (a, b) {
			return new Date( a ) - new Date( b );
		});

		// console.log(array);

		// GENERATE THE TABLE PIECES
		if (journey == journey1) {
			var journeyTitle = "Departing Arranmore";
			var cssColor = "main_color";
		} else {
			var journeyTitle = "Departing Burtonport";
			var cssColor = "opp_color";
		}

		if (array.length > 0) {
			// construct table for extra ferries
			// Header
			var extraFerryTable = "<tr> <th class='" + cssColor + "'> Extra Ferries " + journeyTitle + " </th> </tr>"
			// Rows in the table
			for(var i=0; i < array.length; i++) {
            	extraFerryTable += "<tr><td class='" + cssColor + " light_darkText'>" + array[i] + "</td></tr>";
    		}
		} else {
			// write an empty statement
			extraFerryTable = "<tr> <th class='" + cssColor + "'>There are no extra ferries planned</th> </tr>"
		}

		if (journey == journey1) {
			document.getElementById("extra_ferry_da").innerHTML = extraFerryTable;
		} else {
			document.getElementById("extra_ferry_db").innerHTML = extraFerryTable;
		}
		// Put the table in the HTML
		
		createExtrasList(value, journey);

	});
}

function createExtrasList(extraFerryObject, journey){

	var result = "";

	if (journey == journey1) {
		for (key in extraFerryObject) {
			result += "<span class='time_tag extra_ferry_tag_da'>" + extraFerryObject[key].date + ", at " + extraFerryObject[key].time + "<i class='fa fa-times time_tag_delete' id='" + key + "'></i></span>";
		};
		document.getElementById("extra_ferry_list_da").innerHTML = result;
	} else {
		for (key in extraFerryObject) {
			result += "<span class='time_tag extra_ferry_tag_db'>" + extraFerryObject[key].date + ", at " + extraFerryObject[key].time + "<i class='fa fa-times time_tag_delete' id='" + key + "'></i></span>";
		};
		document.getElementById("extra_ferry_list_db").innerHTML = result;
	}
}

function convertDate(uglyDate){

	var tempDate = new Date(uglyDate);
	var tweekday = tempDate.getDay();
	var date = tempDate.getDate();
	var tmonth = tempDate.getMonth();
	var year = tempDate.getFullYear();

	var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var monthsOfTheYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	var day = daysOfTheWeek[tweekday];
	var month = monthsOfTheYear[tmonth];
	
	return day + ", " + date + " " + month + " " + year;
}


// removeTimetableEntry("summer_da", timetable_id);
function removeTimetableEntry(timetable, firebaseID) {
	// console.log("Removing " + timetable + " " + firebaseID);
	// SUMMER TIMETABLES
	if (timetable == "summer_da_wk" ) {
		var rootRef = firebaseRef.child("summer_da/weekday");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "summer_da_wk");
	}
	else if (timetable == "summer_da_we" ) {
		var rootRef = firebaseRef.child("summer_da/weekend");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "summer_da_we");
	}	
	else if (timetable == "summer_db_wk" ) {
		var rootRef = firebaseRef.child("summer_db/weekday");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "summer_db_wk");
	}	
	else if (timetable == "summer_db_we" ) {
		var rootRef = firebaseRef.child("summer_db/weekend");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "summer_db_we");
	}		
	// WINTER TIMETABLES
	else if (timetable == "winter_da_wk" ) {
		var rootRef = firebaseRef.child("winter_da/weekday");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "winter_da_wk");
	}	
	else if (timetable == "winter_da_we" ) {
		var rootRef = firebaseRef.child("winter_da/weekend");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "winter_da_we");
	}		
	else if (timetable == "winter_db_wk" ) {
		var rootRef = firebaseRef.child("winter_db/weekday");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "winter_db_wk");
	}	
	else if (timetable == "winter_db_we" ) {
		var rootRef = firebaseRef.child("winter_db/weekend");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "winter_db_we");
	}	
	else if (timetable == "extra_ferry_tag_da" ) {
		var rootRef = firebaseRef.child("extra_ferry/da");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "winter_db_we");
	}
	else if (timetable == "extra_ferry_tag_db" ) {
		var rootRef = firebaseRef.child("extra_ferry/db");
		rootRef.child( firebaseID ).remove();
		// updateValues(rootRef, "winter_db_we");
	}	
}
