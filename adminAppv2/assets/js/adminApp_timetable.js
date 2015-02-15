var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable4/");

$(function() { 
	// GET TIMETABLE OBJECT
	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();
	// END FIREBASE

	// CONSTRUCT LISTS
	constructLists(timetableObj);
	// CONSTRUCT TABLES
	constructTables(timetableObj);

	// ERROR FUNCTION
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});
});
// END THE RUNNING FUNCTION


// ===========================================================================
// START THE FUNCTIONS FOR ADDING FERRIES
// ===========================================================================
$(function() {

	jQuery('body').on('click', 'a', function () { 
		// JAN TO APR
		if ( $(this).hasClass("da_jantoapr_btn") ) {
			var daySelect = $('select[name="da_jantoapr_select"]').val();
			if (daySelect == "da_jantoapr_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "jantoapr", "wk", time);
			} else if (daySelect == "da_jantoapr_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "jantoapr", "fri", time);
			}else if (daySelect == "da_jantoapr_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "jantoapr", "sun", time);
			};
		} else if ( $(this).hasClass("db_jantoapr_btn")) {
			var daySelect = $('select[name="db_jantoapr_select"]').val();

			if (daySelect == "db_jantoapr_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "jantoapr", "wk", time);
			} else if (daySelect == "db_jantoapr_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "jantoapr", "fri", time);
			}else if (daySelect == "db_jantoapr_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "jantoapr", "sun", time);
			};
			// MAY
		} else if ( $(this).hasClass("da_may_btn")) {
			var daySelect = $('select[name="da_may_select"]').val();

			if (daySelect == "da_may_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "may", "wk", time);
			} else if (daySelect == "da_may_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "may", "fri", time);
			}else if (daySelect == "da_may_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "may", "sun", time);
			};
		} else if ( $(this).hasClass("db_may_btn")) {
			var daySelect = $('select[name="db_may_select"]').val();

			if (daySelect == "db_may_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "may", "wk", time);
			} else if (daySelect == "db_may_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "may", "fri", time);
			}else if (daySelect == "db_may_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "may", "sun", time);
			};
			// JUN TO AUG
		} else if ( $(this).hasClass("da_juntoaug_btn")) {
			var daySelect = $('select[name="da_juntoaug_select"]').val();

			if (daySelect == "da_juntoaug_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "juntoaug", "wk", time);
			} else if (daySelect == "da_juntoaug_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "juntoaug", "fri", time);
			}else if (daySelect == "da_juntoaug_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "juntoaug", "sun", time);
			};
		} else if ( $(this).hasClass("db_juntoaug_btn")) {
			var daySelect = $('select[name="db_juntoaug_select"]').val();

			if (daySelect == "db_juntoaug_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "juntoaug", "wk", time);
			} else if (daySelect == "db_juntoaug_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "juntoaug", "fri", time);
			}else if (daySelect == "db_juntoaug_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "juntoaug", "sun", time);
			};
			// SEP TO OCT
		} else if ( $(this).hasClass("da_septooct_btn")) {
			var daySelect = $('select[name="da_septooct_select"]').val();

			if (daySelect == "da_septooct_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "septooct", "wk", time);
			} else if (daySelect == "da_septooct_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "septooct", "fri", time);
			}else if (daySelect == "da_septooct_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "septooct", "sun", time);
			};
		} else if ( $(this).hasClass("db_septooct_btn")) {
			var daySelect = $('select[name="db_septooct_select"]').val();

			if (daySelect == "db_septooct_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "septooct", "wk", time);
			} else if (daySelect == "db_septooct_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "septooct", "fri", time);
			}else if (daySelect == "db_septooct_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "septooct", "sun", time);
			};
			// NOV TO DEC
		} else if ( $(this).hasClass("da_novtodec_btn")) {
			var daySelect = $('select[name="da_novtodec_select"]').val();

			if (daySelect == "da_novtodec_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "novtodec", "wk", time);
			} else if (daySelect == "da_novtodec_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "novtodec", "fri", time);
			}else if (daySelect == "da_novtodec_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("da", "novtodec", "sun", time);
			};
		} else if ( $(this).hasClass("db_novtodec_btn")) {
			var daySelect = $('select[name="db_novtodec_select"]').val();

			if (daySelect == "db_novtodec_wk"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "novtodec", "wk", time);
			} else if (daySelect == "db_novtodec_fri"){
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "novtodec", "fri", time);
			}else if (daySelect == "db_novtodec_sun") {
				var time = $(this).prev('input').val();
				pushToNewFerryTime("db", "novtodec", "sun", time);
			};
		}
	});
});

function pushToNewFerryTime(journey, month, day, ferryTime){
	if (ferryTime != "") {
		// console.log(journey+" "+month+" "+day+" "+time);
		var databaseRef = chooseFirebaseEntry(journey, month, day);
		// console.log(databaseRef);
		var refToPush = firebaseRef.child(databaseRef);
		refToPush.push( {time: ferryTime} );
		toastr.success("<i class='mdi-action-done margin_right'></i>New ferry time added");
		// console.log("success");
	} else {
		toastr.error('<i class="mdi-alert-warning margin_right"></i>Please enter a valid time!');
	}
};

function chooseFirebaseEntry(journey, month, day){
	// console.log(journey+month+day);
	if (journey == "da") {
		// console.log("Depart Arranmore");
		var refMonth = checkRefMonth(month);
		var refDay = checkRefDay(day);
		return journey+"/"+refMonth+"/"+refDay;
	} else if (journey == "db") {
		// console.log("Depart Burtonport");
		var refMonth = checkRefMonth(month);
		var refDay = checkRefDay(day);
		return journey+"/"+refMonth+"/"+refDay;
	}
};

function checkRefMonth(month){
	if (month == "jantoapr") {
		return "jantoapr";
	} else if (month == "may") {
		return "may";
	}  else if (month == "juntoaug") {
		return "juntoaug";
	}  else if (month == "septooct") {
		return "septooct";
	}  else if (month == "novtodec") {
		return "novtodec";
	} 
};

function checkRefDay(day){
	if (day == "wk"){
		return "wk";
	} else if (day == "fri") {
		return "fri";
	} else if (day == "sun") {
		return "sun";
	}
};
// ===========================================================================
// END THE FUNCTIONS FOR ADDING FERRIES
// ===========================================================================


// ===========================================================================
// START THE LISTS FOR EDITING FERRIES
// ===========================================================================

function constructLists(timetableObj) {
	for (key in timetableObj){
		// console.log(key);
		if (key == "extra_ferry" || key == "cancel_ferry") { console.log("extra ferry found")} else {
			var journey = key;
			var journeyObj = timetableObj[key];

			for (key in journeyObj){
				// console.log(key);
				var monthRange = key;
				var daysObj = journeyObj[key];

				for (key in daysObj){
					// console.log(key)
					var days = key;
					var timesObj = daysObj[key];
					// console.log(timesObj + " " + journey+"_"+monthRange+"_"+days)
					var htmlID = journey+"_"+monthRange+"_"+days;
					// console.log(htmlID);
					constructSingleList(timesObj, htmlID);
				}
			}
		}
	};
};

function constructSingleList(Obj, htmlID) {
	// console.log(Obj + " " + htmlID);
	var result = "";
	for (key in Obj){
		result += "<div id="+key+" class='list_item'> "+Obj[key].time+" <a class='margin_left mdi-content-remove-circle red remove_ferryTime_btn'></a></div>";
	}
	document.getElementById(htmlID).innerHTML = result;
};

// START THE RUNNING FUNCTION FOR REMOVING FERRIES

$(function() { 
	jQuery('body').on('click', 'a', function () { 
		if ($(this).hasClass('remove_ferryTime_btn')){
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
	return "/"+journey+"/"+monthRange+"/"+day;
}

// ===========================================================================
// END THE LISTS FOR EDITING FERRIES
// ===========================================================================



// ===========================================================================
// START THE TABLES FOR VIEWING FERRIES
// ===========================================================================

function constructTables(timetableObj){
	for (key in timetableObj){
		if (key == "extra_ferry" || key == "cancel_ferry") { console.log("extra ferry found table")} else {
			// console.log(key);
			var journey = key;
			var journeyObj = timetableObj[key];

			for (key in journeyObj){
				var monthRange = key;
				var daysObj = journeyObj[key];
				// console.log(daysObj);
				constructSingleTable(journey, monthRange, daysObj);
			}
		}
	};
}

function constructSingleTable(journey, monthRange, daysObj){
	// console.log(journey + monthRange + daysObj);
	var htmlID = journey+"_"+monthRange+"_table";
	// console.log(htmlID);
	if (journey == "da"){
		var cssColor = "blue";
		var journeyTitle = "Departing Arranmore";
	} else {
		var cssColor = "orange";
		var journeyTitle = "Departing Burtonport";
	};

	var array_wk = generateArrays(daysObj.wk);
	var array_fri = generateArrays(daysObj.fri);
	var array_sun = generateArrays(daysObj.sun);

    // MONDAY TO SATURDAY TABLE
    var tableHTML = "<table class='"+cssColor+" align-center' border='1'> <thead> <tr> <th class='"+cssColor+"' colspan='"+array_wk.length+"'>" + journeyTitle + "</th> </tr> <tr> <th class='"+cssColor+" subheading' colspan='"+array_wk.length+"'>Monday to Saturday</th> </tr> </thead>";
    tableHTML += "<tbody> <tr>";

    for (var i = 0; i < array_wk.length; i++) {
        tableHTML += "<td>" + array_wk[i] + "</td>";
    };

    tableHTML += "</tr></tbody></table>";

    // FRIDAY TABLE
    // STYLE 1
    if (journey == "da"){
	    if (array_fri.length != 0) {
	    	tableHTML += "<table class='"+cssColor+" no_top_border align-center'> <tr> <th class='"+cssColor+" fri_subheading'>Fridays Only:</th>";

		    for (var i = 0; i < array_fri.length; i++) {
		        tableHTML += "<td class='fri_subheading "+cssColor+"'>" + array_fri[i] + "</td>";
		    };

	    	tableHTML == "</tr></table>";
	    }
	// STYLE 2
    } else {
    	if (array_fri.length != 0) {
	    	tableHTML += "<table class='"+cssColor+" align-center' border='1'> <thead> <tr> <th class='"+cssColor+" subheading' colspan='"+array_fri.length+"'>Fridays Only</th> </tr> </thead>";
		    tableHTML += "<tbody> <tr>";

		    for (var i = 0; i < array_fri.length; i++) {
		        tableHTML += "<td>" + array_fri[i] + "</td>";
		    };

		    tableHTML += "</tr></tbody></table>";
		}
    }

    // SUNDAY TABLE
    tableHTML += "<table class='"+cssColor+" align-center' border='1'> <thead> <tr> <th class='"+cssColor+" subheading' colspan='"+array_sun.length+"'>Sundays</th> </tr> </thead>";
    tableHTML += "<tbody> <tr>";

    for (var i = 0; i < array_sun.length; i++) {
        tableHTML += "<td>" + array_sun[i] + "</td>";
    };

    tableHTML += "</tr></tbody></table>";

    // console.log(htmlID);
    document.getElementById(htmlID).innerHTML = tableHTML;
}

function generateArrays(timeObj){
	array = [];
    // GENERATE THE ARRAY
    for (key in timeObj) {
        array.push(timeObj[key].time);
    };
    // SORT THE ARRAY
    array.sort(function (a, b) {
        return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
    });
    // return the array
    return array;
}


// ===========================================================================
// FILTERING THE LIST OF FERRIES
// ===========================================================================

$(function() { 

	jQuery('body').on('click', 'a', function () { 
		if ( $(this).hasClass("submit_filter") ) {
			var filterOn = $('select[name="filterMonths"]').val()
			switch (filterOn) {
			    case "all":
			        console.log("show all months");
			        document.getElementById('jantoapr').style.display = 'block';
			        document.getElementById('may').style.display = 'block';
			        document.getElementById('juntoaug').style.display = 'block';
			        document.getElementById('septooct').style.display = 'block';
			        document.getElementById('novtodec').style.display = 'block';
			        break;
			    case "jan_apr":
			        console.log("show all jan to apr");
			        document.getElementById('jantoapr').style.display = 'block';
			        document.getElementById('may').style.display = 'none';
			        document.getElementById('juntoaug').style.display = 'none';
			        document.getElementById('septooct').style.display = 'none';
			        document.getElementById('novtodec').style.display = 'none';
			        break;
			    case "may":
			        console.log("show all may");
			        document.getElementById('jantoapr').style.display = 'none';
			        document.getElementById('may').style.display = 'block';
			        document.getElementById('juntoaug').style.display = 'none';
			        document.getElementById('septooct').style.display = 'none';
			        document.getElementById('novtodec').style.display = 'none';
			        break;
			    case "jun_aug":
			        console.log("show all june to aug");
			        document.getElementById('jantoapr').style.display = 'none';
			        document.getElementById('may').style.display = 'none';
			        document.getElementById('juntoaug').style.display = 'block';
			        document.getElementById('septooct').style.display = 'none';
			        document.getElementById('novtodec').style.display = 'none';
			        break;
			    case "sep_oct":
			        document.getElementById('jantoapr').style.display = 'none';
			        document.getElementById('may').style.display = 'none';
			        document.getElementById('juntoaug').style.display = 'none';
			        document.getElementById('septooct').style.display = 'block';
			        document.getElementById('novtodec').style.display = 'none';
			        break;
			    case "nov_dec":
			        console.log("show all nov to dec");
			        document.getElementById('jantoapr').style.display = 'none';
			        document.getElementById('may').style.display = 'none';
			        document.getElementById('juntoaug').style.display = 'none';
			        document.getElementById('septooct').style.display = 'none';
			        document.getElementById('novtodec').style.display = 'block';
			};
		} 
	});
});


