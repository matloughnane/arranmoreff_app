// FIREBASE REFERENCES
var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable4/");

var offline_timetables = "Using offline timetables";
var no_ferries_today_note = "There are no more ferries today!";
var all_ferries_cancelled = "There are no ferries running today, for more information please give us a call";
var departing_arranmore = "Departing Arranmore";
var departing_burtonport = "Departing Burtonport";

var extra_departing_arranmore = "Extra Ferries Departing Arranmore";
var extra_departing_burtonport = "Extra Ferries Departing Burtonport";
var no_extra_ferries = "There are no upcoming extra ferries";

var cancel_departing_arranmore = "Cancelled Ferries Departing Arranmore";
var cancel_departing_burtonport = "Cancelled Ferries Departing Burtonport";
var no_cancelled_ferries = "There are no immeadiate cancelled ferries";

var no_previous_sync_message = "No previous sync";
var note_message = "Note:";
var latest_sync_message = "Last Sync:";
var internet_notification_message = "No internet connection!";
var weekday_message = "Monday to Saturday";
var friday_only_message = "Fridays only:";
var saturday_only_message = "Saturdays only:";
var weekend_message = "Sunday";
var language_settings_title = "Language";
var language_settings_option_english = "English";
var language_settings_option_irish = "Irish";
var time_settings_option_label = "Display Arranmore Local Time";

var day_array = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var month_array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var select_all_months = "All Months";
var select_jantoapr = "Jan to Apr";
var select_may = "May";
var select_juntoaug = "Jun to Aug";
var select_septooct = "Sept to Oct";
var select_novtodec = "Nov to Dec";


document.getElementById('loading_notification').style.display = 'block';

var timetableObj = {};

firebaseRef.on("value", function(snapshot) {
    timetableObj = snapshot.val();
    var latestDateTime = getPrettyDateTime();
    localStorage.setItem('latestDateTime', latestDateTime);
    constructTables(timetableObj);
    document.getElementById('loading_notification').style.display = 'none';
});


// =================================================================
// =================== TIMETABLE FUNCTIONS =========================
// =================================================================


function constructTables(timetableObj){
	for (key in timetableObj){
		if (key == "extra_ferry" || key == "cancel_ferry") { } else {
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
};

function constructSingleTable(journey, monthRange, daysObj){
    
	var htmlID = journey+"_"+monthRange+"_table";
	// console.log(htmlID);
	if (journey == "da"){
		var cssColor = "primary";
		var journeyTitle = departing_arranmore;
	} else {
		var cssColor = "secondary";
		var journeyTitle = departing_burtonport;
	};

	var array_wk = generateArrays(daysObj.wk);
    var array_fri = generateArrays(daysObj.fri);
    var array_sat = generateArrays(daysObj.sat);
	var array_sun = generateArrays(daysObj.sun);

    // MONDAY TO SATURDAY TABLE
    var tableHTML = "<table class='"+cssColor+" align-center' border='1'> <thead> <tr> <th class='"+cssColor+"' colspan='"+array_wk.length+"'>" + journeyTitle + "</th> </tr> <tr> <th class='"+cssColor+" subheading' colspan='"+array_wk.length+"'>"+weekday_message+"</th> </tr> </thead>";
    tableHTML += "<tbody> <tr>";

    tableHTML += createInnerTableHTML(array_wk);

    tableHTML += "</tr></tbody></table>";

    // FRIDAY TABLE
    if (array_fri.length != 0) {
        tableHTML += "<table class='"+cssColor+" no_top_border align-center'> <tr> <th width='50%' class='"+cssColor+" fri_subheading'>"+friday_only_message+"</th>";

        for (var i = 0; i < array_fri.length; i++) {
            tableHTML += "<td class='fri_subheading "+cssColor+"'>" + array_fri[i] + "</td>";
        };
    }   
    // SATURDAY TABLE
    if (array_sat.length != 0) {
        tableHTML += "<table class='"+cssColor+" no_top_border align-center'> <tr> <th width='50%' class='"+cssColor+" fri_subheading'>"+saturday_only_message+"</th>";

        for (var i = 0; i < array_sat.length; i++) {
            tableHTML += "<td class='fri_subheading "+cssColor+"'>" + array_sat[i] + "</td>";
        };
    }   

    tableHTML == "</tr></table>";

    // SUNDAY TABLE
    tableHTML += "<table class='"+cssColor+" align-center' border='1'> <thead> <tr> <th class='"+cssColor+" subheading' colspan='"+array_sun.length+"'>"+weekend_message+"</th> </tr> </thead>";
    tableHTML += "<tbody> <tr>";

    tableHTML += createInnerTableHTML(array_sun);

    tableHTML += "</tr></tbody></table>";

    // console.log(htmlID);
    document.getElementById(htmlID).innerHTML = tableHTML;
};

function createInnerTableHTML(array){
    var tableHTML = "";
    if (array.length > 5){
        // CHECK IF ODD
        if (array.length % 2 != 0){
            array.push("-")
        };
        tableHTML += "<tr>";
        // FIRST HALF
        for (var i = 0; i < (array.length/2); i++) {
            tableHTML += "<td>" + array[i] + "</td>";
        };
        tableHTML += "</tr><tr>";
        // SECOND HALF
        for (var i = (array.length/2); i < array.length; i++) {
            tableHTML += "<td>" + array[i] + "</td>";
        };
        tableHTML += "</tr>";

    } else {
        tableHTML += "<tr>";
        for (var i = 0; i < array.length; i++) {
            tableHTML += "<td>" + array[i] + "</td>";
        };
        tableHTML += "</tr>";
    };
    return tableHTML
};


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
};

// =================================================================
// =================== TIMETABLE FUNCTIONS =========================
// =================================================================

$(function() { 

	$('.selectpicker').change(function () {
		var filterOn = $('select[name="filterMonths"]').val();

		switch (filterOn) {
			    case "all":
					$('#jantoapr').show(); 
			        $('#may').show();
			        $('#juntoaug').show(); 
					$('#septooct').show(); 
					$('#novtodec').show(); 
			        break;
			    case "jan_apr":
					$('#jantoapr').show(); 
			        $('#may').hide();
			        $('#juntoaug').hide(); 
					$('#septooct').hide(); 
					$('#novtodec').hide(); 
			        break;
			    case "may":
					$('#jantoapr').hide(); 
			        $('#may').show();
			        $('#juntoaug').hide(); 
					$('#septooct').hide(); 
					$('#novtodec').hide(); 
			        break;
			    case "jun_aug":
					$('#jantoapr').hide(); 
			        $('#may').hide();
			        $('#juntoaug').show(); 
					$('#septooct').hide(); 
					$('#novtodec').hide(); 
			        break;
			    case "sep_oct":
					$('#jantoapr').hide(); 
			        $('#may').hide();
			        $('#juntoaug').hide(); 
					$('#septooct').show(); 
					$('#novtodec').hide(); 
			        break;
			    case "nov_dec":
					$('#jantoapr').hide(); 
			        $('#may').hide();
			        $('#juntoaug').hide(); 
					$('#septooct').hide(); 
					$('#novtodec').show(); 
					break
			};

	})
});

// ========================================================================
// ========================= GENERAL FUNCTIONS ========================
// ========================================================================


function getPrettyDateTime() {
    var rawDate = new Date();
    // PRETTY HOURS
    var date = lessThanTen(rawDate.getDate());
    var month = lessThanTen(rawDate.getMonth()+1);    
    var hours = lessThanTen(rawDate.getHours());
    var minutes = lessThanTen(rawDate.getMinutes());
    var seconds = lessThanTen(rawDate.getSeconds());

    var datetime = "" + date + "/"
                + month + "/" 
                + rawDate.getFullYear() + " at "  
                + hours + ":"  
                + minutes + ":" 
                + seconds;
    return datetime;
};

function lessThanTen(number) {
    if (number < 10) {
        var newNumber = "0"+number;
    } else {
        var newNumber = number;
    };
    return newNumber;
};
