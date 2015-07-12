// FIREBASE REFERENCES
var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable4/");

var offline_timetables = "Using offline timetables";
var no_ferries_today_note = "There are no more ferries today!";
var all_ferries_cancelled = "There are no ferries running today, for more information please give us a call.";
var all_ferries_cancelled_next_ferry = "All ferries have been cancelled!";
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

document.getElementById('loading_notification_da').style.display = 'block';
document.getElementById('loading_notification_db').style.display = 'block';

var timetableObj = {};

firebaseRef.on("value", function(snapshot) {
    timetableObj = snapshot.val();
    var latestDateTime = getPrettyDateTime();
    // NEXT FERRY
    getNextFerryTime(timetableObj);
    // TODAYS TIMETABLE
    getTodaysFerryTimes(timetableObj);
});

// ========================================================================
// =============== FERRY FUNCTIONS ========================
// ========================================================================

function getNextFerryTime(timetableObj){
    // SET UTC TIME
    var utcdate = new Date();
    var localTime = utcdate.getTime();
    var localOffset = utcdate.getTimezoneOffset() * 60000;
    var utcTime = localTime + localOffset;
    // console.log(utcTime);
    var utcTime = utcTime + 3600000;
    // FUNCTION
    var tdate = new Date(utcTime);
    var todaysDate = checkDayRange(tdate);
    // console.log(todaysDate);
    var ttime = getPrettyTime(tdate);

    var dayRange = todaysDate.substr(0, todaysDate.indexOf(','));
    var monthRange = todaysDate.substr(todaysDate.lastIndexOf(',')+1, todaysDate.length);

    var da_cancelledArray = checkCancelledFerries(timetableObj, "da", tdate);
    var da_extraArray = checkExtraFerries(timetableObj, "da", tdate);
    // console.log(da_extraArray);
    var da_finalArray = findDatabaseRef(timetableObj, "da", monthRange, dayRange, da_cancelledArray, da_extraArray);
    // console.log(da_finalArray);
    var da_nextTime = checkForNextFerry(da_finalArray, ttime);

    document.getElementById("nextFerry_da").innerHTML = da_nextTime;

    var db_cancelledArray = checkCancelledFerries(timetableObj, "db", tdate);
    var db_extraArray = checkExtraFerries(timetableObj, "db", tdate);
    // console.log(db_extraArray);
    var db_finalArray = findDatabaseRef(timetableObj, "db", monthRange, dayRange, db_cancelledArray, db_extraArray);
    // console.log(db_finalArray);
    var db_nextTime = checkForNextFerry(db_finalArray, ttime);
    
    document.getElementById("nextFerry_db").innerHTML = db_nextTime;
};

function getTodaysFerryTimes(timetableObj){
    var tdate = new Date();
    var todaysDate = checkDayRange(tdate);
    var ttime = getPrettyTime(tdate);
    var dayRange = todaysDate.substr(0, todaysDate.indexOf(','));
    var monthRange = todaysDate.substr(todaysDate.lastIndexOf(',')+1, todaysDate.length);
    // GET ARRAYS FOR DA
    var da_cancelledArray = checkCancelledFerries(timetableObj, "da", tdate);
    var da_extraArray = checkExtraFerries(timetableObj, "da", tdate);
    var da_finalArray = findDatabaseRef(timetableObj, "da", monthRange, dayRange, da_cancelledArray, da_extraArray);
    // GET ARRAYS FOR DB
    var db_cancelledArray = checkCancelledFerries(timetableObj, "db", tdate);
    var db_extraArray = checkExtraFerries(timetableObj, "db", tdate);
    var db_finalArray = findDatabaseRef(timetableObj, "db", monthRange, dayRange, db_cancelledArray, db_extraArray);

    // CREATE TABLES
    var da_table_html = createOneDaysTable(da_finalArray, "da");
    var db_table_html = createOneDaysTable(db_finalArray, "db");

    document.getElementById("today_timetable_da").innerHTML = da_table_html;
    document.getElementById("today_timetable_db").innerHTML = db_table_html;
};

// ========================================================================
// ========================= REUSABLE FUNCTIONS ========================
// ========================================================================

function createOneDaysTable(array, journey, tableStyle){
    if (journey == "da") {
        var cssColor = "primary";
        var journey = departing_arranmore;
    } else {
        var cssColor = "secondary";
        var journey = departing_burtonport;
    };
    if (array.length == 0 ) {
        // CREATE HTML FOR NO FERRIES
        var tableHTML = "<table class='" + cssColor + " align-center' border='1'> <thead> <tr> <th class='"+cssColor+"' colspan='"+array.length+"'>"+journey+"</th> </tr> <tbody>";
        tableHTML += "<tr><td>"+all_ferries_cancelled+"</td></tr>";
        tableHTML += "</tbody> </table>";

    } else {
        // CREATE TABLE
        var tableHTML = "<table class='" + cssColor + " align-center' border='1'> <thead> <tr> <th class='"+cssColor+"' colspan='"+array.length+"'>"+journey+"</th> </tr> <tbody>";

        // tableHTML += createInnerTableHTML(array, tableStyle);
        tableHTML += createInnerTableHTML(array);

        // BODY OF TABLE COMPLETE
        tableHTML += "</tbody> </table>";
    };
    return tableHTML;
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


function checkCancelledFerries(timetableObj, journey, date){
    if (journey == "da"){
        var cancelFerryObj = timetableObj.cancel_ferry.da;
    } else {
        var cancelFerryObj = timetableObj.cancel_ferry.db;
    }
    // console.log(cancelFerryObj);
    var date = getInputDate(date);
    // console.log(date);
    var array = [];
    for (key in cancelFerryObj){
        if (date == cancelFerryObj[key].date){
            array.push(cancelFerryObj[key].time);
        }
    }
    return array;
};

function checkExtraFerries(timetableObj, journey, date){
    if (journey == "da"){
        var extraFerryObj = timetableObj.extra_ferry.da;
    } else {
        var extraFerryObj = timetableObj.extra_ferry.db;
    }

    var array = [];
    for (key in extraFerryObj){

        var uglyDate = getInputDate(extraFerryObj[key].date);
        // console.log(uglyDate);
        if (getInputDate(date) == uglyDate){
            array.push(extraFerryObj[key].time);
        };
    };

    return array;
};

function findDatabaseRef(timetableObj, journey, monthRange, dayRange, cancelledArray, extrasArray){
    // console.log(dayRange);
    for (key in timetableObj){
        if (key == journey){
            var journeyObj = timetableObj[key];
            // console.log(journeyObj);
            for (key in journeyObj){
                if (key == monthRange){
                    var monthObj = journeyObj[key];
                    // console.log(monthObj);
                    var exactDay = "";
                    for (key in monthObj){
                        if (dayRange == 'fri'){
                            dayRange = "wk";
                            exactDay = "fri";
                        } else if (dayRange == 'sat'){
                            dayRange = "wk";
                            exactDay = "sat";
                        }
                        if (key == dayRange) {
                            var timesObj = monthObj[key];
                            var array = [];
                            // console.log(array);
                            for (key in timesObj){
                                array.push(timesObj[key].time);
                            }

                            if (exactDay == "fri"){
                                var dayObj = monthObj["fri"];
                                // console.log(dayObj);
                                if (dayObj == 'undefined'){
                                    // console.log("NOT A FRIDAY");
                                } else {
                                    // console.log("FRIDAY SELECTED");                                   
                                    for (key in dayObj){
                                        array.push(dayObj[key].time);
                                    }
                                }
                            }

                            // SATURDAY FERRIES 
                            if (exactDay == "sat"){
                                var dayObj = monthObj["sat"];
                                // console.log(dayObj);
                                if (dayObj == 'undefined'){
                                    // console.log("NOT A SATURDAY");
                                } else {
                                    // console.log("SATURDAY SELECTED");
                                    for (key in dayObj){
                                        array.push(dayObj[key].time);
                                    }
                                }
                            }

                            array.sort(function (a, b) {
                                return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
                            });
                            // console.log(array);
                            var arrayMinusCancel = compareCancelArrays(array, cancelledArray);
                            var finalArray = compareExtraArray(arrayMinusCancel, extrasArray);

                            finalArray.sort(function (a, b) {
                                return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
                            });

                            // console.log(finalArray);
                            return finalArray;
                        }
                    }
                }
            }
        }
    };
};

function compareExtraArray(totalArray, extrasArray){
    var array = totalArray;
    for (var i = 0; i < extrasArray.length; i++){
        array.push(extrasArray[i]);
    }
    return array;
};

function compareCancelArrays(array, cancelledArray){
    for (var i = 0; i < cancelledArray.length ; i ++) {
        for (var j = 0; j < array.length ; j ++){
            if (cancelledArray[i] == array[j]){
                var removeIndex = array.indexOf(array[j]);
                array.splice(removeIndex, 1);
            }
        };
    };
    return array;
};

function checkForNextFerry(array, time){
    if (array.length == 0){
        var nextFerry = all_ferries_cancelled_next_ferry;
    } else {
        for ( var i = 0; i < array.length; i++){
            if (time < array[i]) {
                var nextFerry = array[i];
                break;
            } else {
                var nextFerry = no_ferries_today_note;
            }
        };
    }
    return nextFerry;
};


// ========================================================================
// ========================= GENERAL FUNCTIONS ========================
// ========================================================================

function checkDayRange(date){
    var cDate = getPrettyDate(date);
    var day = cDate.substr(0, cDate.indexOf(','));
    // console.log(day);
    var cdate = new Date(date);
    var cyear = cdate.getYear();
    if (cyear < 1900){ cyear = cyear + 1900};
    var cmonth = cdate.getMonth()+1;
    // console.log(cmonth);
    var cdate = cdate.getDate();

    if (day == "Sun" || day == "Domh"){
        var dayRange = "sun";
    } else if (day == "Fri" || day == "Aoine") {
        var dayRange = "fri";
    } else if (day == "Sat" || day == "Sath") {
        var dayRange = "sat";
    } else {
        var dayRange = "wk";
    }

    if (cmonth < 5) {
        var monthRange = "jantoapr";
    } else if (cmonth == 5){
        var monthRange = "may";
    } else if (cmonth > 5 && cmonth < 9) {
        var monthRange = "juntoaug";
    } else if (cmonth > 8 && cmonth < 11) {
        var monthRange = "septooct";
    } else if (cmonth > 10) {
        var monthRange = "novtodec";
    }

    return (dayRange+","+monthRange);
};

// ========================== DATE NOTIFICATIONS ========================
// ========================================================================

function getPrettyDate(date){
    // CREATE THE CHECK DATE IN CORRECT FORMAT
    var cdate = new Date(date);
    var year = cdate.getYear();
    var month_num = cdate.getMonth()+1;
    var date = cdate.getDate();
    var day_num = cdate.getDay();

    if (year < 1000) { year += 1900 };
    if (date < 9) { date = "0"+date };

    // CHECK THE DATE AGAINST THE TIMETABLE OBJ
    var prettyDate = day_array[day_num] + ", " + date + " " + month_array[month_num-1] + " " + year;
    // console.log(prettyDate);
    return prettyDate;
};

function getInputDate(date){
    // CREATE THE CHECK DATE IN CORRECT FORMAT
    var cdate = new Date(date);
    // console.log(cdate);
    var yearToCheck = cdate.getYear();
    var monthToCheck = cdate.getMonth()+1;
    var dateToCheck = cdate.getDate();

    if (yearToCheck < 1000) { yearToCheck += 1900 };
    if (monthToCheck <= 9) { monthToCheck = "0"+monthToCheck };
    if (dateToCheck <= 9) { dateToCheck = "0"+dateToCheck };

    // CHECK THE DATE AGAINST THE TIMETABLE OBJ
    var checkDate = yearToCheck+"-"+monthToCheck+"-"+dateToCheck;
    return checkDate;
}


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

function getPrettyTime(date){ 
    var rawDate = new Date(date);

    var hours = lessThanTen(rawDate.getHours());
    var minutes = lessThanTen(rawDate.getMinutes());
    var seconds = lessThanTen(rawDate.getSeconds());

    var time = "" + hours + ":"  
                + minutes + "";
    return time; 
}


function lessThanTen(number) {
    if (number < 10) {
        var newNumber = "0"+number;
    } else {
        var newNumber = number;
    };
    return newNumber;
};


