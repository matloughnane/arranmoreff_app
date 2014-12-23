var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable3/");

var journey1 = "Departing Arranmore";
var journey2 = "Departing Burtonport";

$(function() { 

	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();

	// EXTRA FERRYS DA
	var extrasArrayDA = futureExtras(timetableObj.extra_ferry.da);
	var extraFerriesDA = checkTodaysExtras(extrasArrayDA);
	// EXTRA FERRYS DB
	var extrasArrayDB = futureExtras(timetableObj.extra_ferry.db);
	var extraFerriesDB = checkTodaysExtras(extrasArrayDB);

	// GENERATE TODAYS ARRAY - EXTRAS
	var todaysArrayDA = generateTodaysArray(timetableObj, extraFerriesDA, journey1);
	// console.log(todaysArrayDA);
	var todaysArrayDB = generateTodaysArray(timetableObj, extraFerriesDB, journey2);
	// console.log(todaysArrayDB);

	// NEXT TIME
	nextFerryTime(todaysArrayDA, journey1, "nextFerry_da");
	nextFerryTime(todaysArrayDB, journey2, "nextFerry_db");

	// CREATE TODAYS TABLES
	createTable(todaysArrayDA, "todays_da", journey1);
	createTable(todaysArrayDB, "todays_db", journey2);

	// CANCELLATIONS
	// checkTodaysExtras(timetableObj.extraFerrys);

	// ERROR FUNCTION
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});
	// END THE RUNNING FUNCTION
});

function createTable(array, htmlID, journey){
	// console.log(htmlID)
	// console.log(array);
	// console.log(journey);
	if (journey == journey1){
		var cssClass = "main_color";
	} else {
		var cssClass = "opp_color";
	};

	var table = "";
	table += "<table class='" + cssClass + " align-center' border=1> <tr> <th class='" + cssClass + "' colspan='"+ array.length +"'>" + journey + "</th> </tr> <tr>";

	for ( var i = 0; i < array.length; i++) {
		table += "<td class='" + cssClass + " light_darkText'> " + array[i] + " </td>"
	};

	table += "</tr> </table>";

	document.getElementById(""+ htmlID +"").innerHTML = table;
	// console.log(table);
}


// TODAYS FUNCTIONS

function generateTodaysArray(timetableObj, extraFerry, journey) {
	// GET TODAYS ARRAY
	var todaysTimesArray = [];
	var todaysTimesArray = getTodaysArray(timetableObj, journey);

	// console.log(todaysTimesArray);

	for ( var i = 0; i < extraFerry.length; i++ ){
		var timei = new Date(extraFerry[i]);
		if (timei.getHours() < 10) { var hours = "0"+timei.getHours() } else { var hours = timei.getHours()};
		if (timei.getMinutes() < 10) { var minutes = "0"+timei.getMinutes() } else { var minutes = timei.getMinutes()};
		// FORMAT THE TIME
		var formattedTime = hours +":"+minutes
		// console.log(extraFerry[i]);
		// console.log(formattedTime);
		todaysTimesArray.push(formattedTime);
	}

	// console.log(todaysTimesArray);
	// SORT THE ARRAY
	todaysTimesArray.sort(function (a, b) {
  		return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
	});

	// console.log(todaysTimesArray);
	return todaysTimesArray;
}


function getTodaysArray(timetableObj, journey){

	var todaysDate = todaysDateFormatted();
	var tdate = new Date(todaysDate);
	// AWKWARD OFF SET
	tdate.setMonth(tdate.getMonth()+1);

	// console.log(tdate.getDay());	
	// console.log(tdate.getMonth());

	if (tdate.getMonth() > 3 && tdate.getMonth() < 8 ) {
		// console.log("It's SUMMER!");
		if (tdate.getDay() == 0) {
			// console.log("It's SUNDAY");
			// WEEKEND JOURNEYS
			if (journey == journey1) {
				// console.log("summer weekend journey departing arranmore");
				return generateArrays(timetableObj.summer_da.weekend, "summer_da_we");
			} else {
				// console.log("summer weekend journey departing burtonport");
				return generateArrays(timetableObj.summer_db.weekend, "summer_db_we");
			}
		} else {
			// console.log("It's A WEEKDAY");
			// WEEK DAY JOURNEY
			if (journey == journey1) {
				// console.log("summer weekday journey departing arranmore");
				return generateArrays(timetableObj.summer_da.weekday, "summer_da_wk");
			} else {
				// console.log("summer weekday journey departing arranmore");
				return generateArrays(timetableObj.summer_db.weekday, "summer_db_wk");
			}
		}
	} else {
		// console.log("It's WINTER!");
		if (tdate.getDay() == 0) {
			// console.log("It's SUNDAY");
			// WEEKEND JOURNEYS
			if (journey == journey1) {
				// console.log("winter weekend journey departing arranmore");
				return generateArrays(timetableObj.winter_da.weekend, "winter_da_we");
			} else {
				// console.log("winter weekend journey departing burtonport");
				return generateArrays(timetableObj.winter_db.weekend, "winter_db_we");
			}
		} else {
			// console.log("It's A WEEKDAY");
			// WEEK DAY JOURNEY
			if (journey == journey1) {
				// console.log("winter weekday journey departing arranmore");
				return generateArrays(timetableObj.winter_da.weekday, "winter_da_wk");
			} else {
				// console.log("winter weekday journey departing arranmore");
				return generateArrays(timetableObj.winter_db.weekday, "winter_db_wk");
			}
		}
	}
	// END THE IF STATEMENT
}


//  ============ NEXT FERRY FUNCTIONS ============ 

function nextFerryTime(timeArray, journey, htmlID) {
	// console.log(timeArray);
	// console.log(journey);
	var timeNow = todaysTimeFormatted();
	// console.log(timeNow);

	for ( var i = 0; i < timeArray.length; i++){
		if (timeNow < timeArray[i]) {
			var nextFerry = timeArray[i];
		} else {
			var nextFerry = "There are no more ferries today!";
		}
	};
	document.getElementById(""+ htmlID +"").innerHTML = nextFerry;
};


//  ============ CANCELLATION FUNCTIONS ============ 


function checkCancellations(){
	// CHECK CANCELLATIONS
};


// EXTRA FERRY FUNCTIONS

function checkTodaysExtras(extrasArray){
	// EXTRAS ARRAY
	// console.log(extrasArray);

	var tdate = todaysDateFormatted();
	var todaysExtras = [];

	var todayDateType = new Date(tdate);
	// AWKWARD OFF SET
	todayDateType.setMonth(todayDateType.getMonth()+1);
	// console.log(todayDateType);

	// CHECK FERRIES AGAINST TODAYS DATE
	for ( var i = 0; i < array.length; i++){
		var arrayDate = new Date(array[i]);

		if (todayDateType.getFullYear() == arrayDate.getFullYear()) {
			// console.log(todayDateType.getFullYear())
			if (todayDateType.getMonth() == arrayDate.getMonth()) {
				// console.log(arrayDate.getMonth());
				// console.log(todayDateType.getMonth());
				if (todayDateType.getDate() == arrayDate.getDate()){
					// console.log(arrayDate.getDate())
					// console.log(array[i]);
					todaysExtras.push(array[i]);
				}
			}
		}
	};

	// console.log(todaysExtras);
	return todaysExtras;
	// CHECK TODAYS EXTRAS

};

function futureExtras(object) {

	// CHECK EXTRAS
	array = [];
	for (key in object){
		array.push(object[key].date + " " + object[key].time);
	}
	// SORT
	array.sort(function (a, b) {
		return new Date( a ) - new Date( b );
	});
		// TODAYS DATE
	var todaysDateLong = new Date;
	// PIECES OF DATE
	var tdate = todaysDateLong.getDate();
	var tmonth = todaysDateLong.getMonth();
	var tyear = todaysDateLong.getFullYear();
	// ADD 0 to MINUTES
	if (todaysDateLong.getHours() < 10) { var timeHours = "0"+todaysDateLong.getHours() } else { var timeHours = todaysDateLong.getHours()};
	var timeMinutes = todaysDateLong.getMinutes();

	// COMBINE THE DATE IN FORMAT
	var todaysDate = tyear + "-" + tmonth + "-" + tdate + " " + timeHours + ":" + timeMinutes;

	// REMOVE UNNECESSARY EXTRAS
	var futureExtras = [];

	// CHECK FERRIES AGAINST TODAYS DATE
	for ( var i = 0; i < array.length; i++){
		var arrayDate = new Date(array[i]);

		if (tyear <= arrayDate.getFullYear()) {
			// console.log(arrayDate.getFullYear());
			if (tmonth <= arrayDate.getMonth()) {
				// console.log(arrayDate.getMonth());
				if (tdate <= arrayDate.getDate()){
					// console.log(arrayDate.getDate())
					// console.log(array[i]);
					futureExtras.push(array[i]);
				}
			}
		}
	};

	// RETURN THE ARRAY OF EXTRA FERRIES
	return futureExtras;
}


// GENERAL FUNCTIONS

function todaysDateFormatted(){
	// TODAYS DATE
	var todaysDateLong = new Date;
	// PIECES OF DATE
	var tdate = todaysDateLong.getDate();
	var tmonth = todaysDateLong.getMonth();
	var tyear = todaysDateLong.getFullYear();

	// COMBINE THE DATE IN FORMAT
	var todaysDate = tyear + "-" + tmonth + "-" + tdate;
	// console.log(todaysDate);
	return todaysDate;
}

function todaysTimeFormatted(){
	// TODAYS DATE
	var todaysDateLong = new Date;
	
	// ADD 0 to MINUTES
	if (todaysDateLong.getHours() < 10) { var timeHours = "0"+todaysDateLong.getHours() } else { var timeHours = todaysDateLong.getHours()};
	// var timeMinutes = todaysDateLong.getMinutes();
	if (todaysDateLong.getMinutes() < 10) { var timeMinutes = "0"+todaysDateLong.getMinutes() } else { var timeMinutes = todaysDateLong.getMinutes()};

	var todaysTime = timeHours + ":" + timeMinutes;

	return todaysTime;
}

function generateArrays(object, name){
	array = [];
	// GENERATE THE ARRAY
	for (key in object ) {
		array.push(object[key].time);
	};
	// SORT THE ARRAY
	array.sort(function (a, b) {
  		return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
	});
	// return the array
	return array;
	// console.log("This happens");
}








