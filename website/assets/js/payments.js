
var day_array = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var month_array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// var ticket_desc = "Ticket Ferry Test";
var car_family_price = "40.50";
var car_driver_price = "27.00";
var adult_price = "13.50";
var student_price = "9.00";
var child_price = "6.30";

var da_text = "Departing Arranmore";
var db_text = "Departing Burtonport";

var loading_svg = '<svg width="36" height="10"> <rect class="white_svg" width="10" height="10" x="0" y="0" rx="3" ry="3"><animate attributeName="width" values="0;10;10;10;0" dur="1000ms" repeatCount="indefinite"/><animate attributeName="height" values="0;10;10;10;0" dur="1000ms" repeatCount="indefinite"/><animate attributeName="x" values="5;0;0;0;5" dur="1000ms" repeatCount="indefinite"/><animate attributeName="y" values="5;0;0;0;5" dur="1000ms" repeatCount="indefinite"/></rect><rect class="white_svg" width="10" height="10" x="13" y="0" rx="3" ry="3"><animate attributeName="width" values="0;10;10;10;0" begin="300ms" dur="1000ms" repeatCount="indefinite"/><animate attributeName="height" values="0;10;10;10;0" begin="300ms" dur="1000ms" repeatCount="indefinite"/><animate attributeName="x" values="18;13;13;13;18" begin="300ms" dur="1000ms" repeatCount="indefinite"/><animate attributeName="y" values="5;0;0;0;5" begin="300ms" dur="1000ms" repeatCount="indefinite"/></rect><rect class="white_svg" width="10" height="10" x="36" y="0" rx="3" ry="3"><animate attributeName="width" values="0;10;10;10;0" begin="500ms" dur="1000ms" repeatCount="indefinite"/><animate attributeName="height" values="0;10;10;10;0" begin="500ms" dur="1000ms" repeatCount="indefinite"/><animate attributeName="x" values="31;26;26;26;31" begin="500ms" dur="1000ms" repeatCount="indefinite"/><animate attributeName="y" values="5;0;0;0;5" begin="500ms" dur="1000ms" repeatCount="indefinite"/></rect></svg>'

// DISPLAY THE PRICE
$( "#ticketPicker" ).change(function() {
	var ticket_price = document.getElementById('ticketPicker').value;
	switch(ticket_price) {
	    case "car_family":
	        document.getElementById("price_grid").style.display = "block";
	        document.getElementById("car_details_grid").style.display = "block";
	        document.getElementById("ticket_price").innerHTML = "€"+car_family_price;
	        break;
	    case "car_driver":
	        document.getElementById("price_grid").style.display = "block";
	        document.getElementById("car_details_grid").style.display = "block";
	        document.getElementById("ticket_price").innerHTML = "€"+car_driver_price;
	        break;
	    case "adult":
	        document.getElementById("price_grid").style.display = "block";
	        document.getElementById("car_details_grid").style.display = "none";
	        document.getElementById("ticket_price").innerHTML = "€"+adult_price;
	        break;
	    case "student":
	        document.getElementById("price_grid").style.display = "block";
	        document.getElementById("car_details_grid").style.display = "none";
	        document.getElementById("ticket_price").innerHTML = "€"+student_price;
	        break;
	    case "child":
	        document.getElementById("price_grid").style.display = "block";
	        document.getElementById("car_details_grid").style.display = "none";
	        document.getElementById("ticket_price").innerHTML = "€"+child_price;
	        break;
	    case "test":
	        document.getElementById("price_grid").style.display = "block";
	        document.getElementById("car_details_grid").style.display = "none";
	        document.getElementById("ticket_price").innerHTML = "€"+test_price;
	        break;
	    default:
	    	console.log("none_selected");
	        document.getElementById("price_grid").style.display = "none";
	}
	verifyButton();
});
// CHANGE THE SECOND ROUTE CHOICE
$( "#journeyPicker" ).change(function() {
	var journey = document.getElementById('journeyPicker').value;
	if (journey == "da") {
		document.getElementById("return_journey").innerHTML = db_text;
	} else if (journey == "db") {
		document.getElementById("return_journey").innerHTML = da_text;
	} else {
		document.getElementById("return_journey").innerHTML = "Select Outward Journey";
	}
	$(".js__datepicker").val("");
	document.getElementById("first_sail_times").innerHTML = "<option value='time'>Select a Date</option>";
	document.getElementById("return_sail_times").innerHTML = "<option value='time'>Select a Date</option>";
	verifyButton();
});
// DISPLAY THE TIMES FOR DATE
$( "#first_sail_date" ).change(function() {
	var date_first_sail = document.getElementById('first_sail_date').value;
	var journey = document.getElementById('journeyPicker').value;
	getTimesForDate(date_first_sail, journey, "first_sail_times");
	verifyButton();
});
// DISPLAY THE TIMES FOR DATE
$( "#return_sail_date" ).change(function() {
	var date_return_sail = document.getElementById('return_sail_date').value;
	var journey = document.getElementById('journeyPicker').value;
	// console.log(journey);
	if (journey == "da") {
		var new_journey = "db";
	} else if (journey == "db") {
		var new_journey = "da";
	};
	// console.log(date_return_sail + " " + new_journey);
	getTimesForDate(date_return_sail, new_journey, "return_sail_times");
	verifyButton();
});

// RESET BUTTON ONLY
$("#first_sail_times").change(function(){
	verifyButton();
});
$("#return_sail_times").change(function(){
	verifyButton();
});
function verifyButton(){
	document.getElementById("payp_btn").style.display = "none";
	document.getElementById("ferry_btn").style.display = "block";
	var html = 'Check For Ferry <span id="loading_span"></span>';
	document.getElementById("validate_ferry").innerHTML = html;
}

$('#validate_ferry').click( function() {
	document.getElementById("loading_span").innerHTML = loading_svg;

	// HIDE OLD WARNINGS
	document.getElementById("warning_ticket_type").style.display = "none";
	document.getElementById("warning_name").style.display = "none";
	document.getElementById("warning_number").style.display = "none";
	document.getElementById("warning_car_details").style.display = "none";
	document.getElementById("warning_journey_type").style.display = "none";
	document.getElementById("warning_outward_date").style.display = "none";
	document.getElementById("warning_outward_time").style.display = "none";
	document.getElementById("warning_return_date").style.display = "none";
	document.getElementById("warning_return_time").style.display = "none";
	document.getElementById("warning_errors").style.display = "none";

	var errors = 0;
	// PERSONAL DETAILS
	var ticket_type = document.getElementById('ticketPicker').value;
	var input_name = document.getElementById('name_input').value;
	var input_number = document.getElementById('number_input').value;
	var input_car_details = document.getElementById('car_details_input').value;
	var input_special_reqs = document.getElementById('special_reqs').value;

	if (ticket_type == "select_ticket") {
		requireInput("ticket_type");
		errors ++;
	};
	if (input_name == ""){
		requireInput("name");
		errors ++;
	};
	if (input_number == ""){
		requireInput("number");
		errors ++;
	};
	if (ticket_type == "car_family" || ticket_type == "car_driver") {
		if (input_car_details == ""){
			requireInput("car_details");
			errors ++;
		};
	};
	// SAILING DETAILS
	var input_journey = document.getElementById('journeyPicker').value;
	var input_first_date = document.getElementById('first_sail_date').value;
	var input_return_date = document.getElementById('return_sail_date').value;
	var input_first_times = document.getElementById('first_sail_times').value;
	var input_return_times = document.getElementById('return_sail_times').value;
	if (input_journey == "select_journey"){
		requireInput("outward_journey");
		errors ++;
	};
	if (input_first_date == ""){
		requireInput("outward_date");
		errors ++;
	};
	if (input_return_date == ""){
		requireInput("return_date");
		errors ++;
	};
	// console.log(input_return_date + " " + input_first_date);
	// CHECK DATE IS IN THE FUTURE
	var cdate_first = new Date(input_first_date);
	var cdate_return = new Date(input_return_date);
	// console.log(cdate_first + " " + cdate_return);
	if ( cdate_return < cdate_first) {
		// console.log("return date is before first date");
		dateisinpast();
		errors ++;
	};
	if (input_first_times == "select_time" || input_first_times == "time"){
		requireInput("outward_time");
		errors ++;
	};
	if (input_return_times == "select_time" || input_return_times == "time"){
		requireInput("return_time");
		errors ++;
	};
	var first_fullTime = ""+input_first_date + "," +  input_first_times;
	var return_fullTime = ""+input_return_date + "," +  input_return_times;
	var ctime_first = new Date(first_fullTime);
	var ctime_return = new Date(return_fullTime);
	// console.log(ctime_first + " " + ctime_return);
	if (ctime_return < ctime_first) {
		timeisinpast();
		errors ++;
	}
	// console.log(errors);
	if (errors == 0) {
		// console.log("paypal button");
		// document.getElementById("validate_ferry").innerHTML = "PAYPAL <span id='loading_span'></span>";
		// CONSTRUCT THE BUTTON
		// VARIABLES ticket_type, input_name, input_number, input_car_details, input_special_reqs,
		// input_journey, input_first_date, input_return_date, input_first_times, input_return_times
		// console.log(input_journey);
		if (input_journey == "db") {
			var outward_journey = "Departing Burtonport";
			var return_journey = "Departing Arranmore";
		} else {
			var outward_journey = "Departing Arranmore";
			var return_journey =  "Departing Burtonport";
		}
		// CHOOSE PRICES
		switch(ticket_type) {
		    case "car_family":
		        var tick_price = car_family_price;
		        break;
		    case "car_driver":
		        var tick_price = car_driver_price;
		        break;
		    case "adult":
		        var tick_price = adult_price;
		        break;
		    case "student":
		        var tick_price = student_price;
		        break;
		    case "child":
		        var tick_price = child_price;
		        break;
		    case "test":
		        var tick_price = test_price;
		        break;
		    default:
		    	console.log("none_selected");
		}
		// console.log(tick_price);
		var result = '<form name="_xclick" action="https://www.paypal.com/uk/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="seamusboyle4@eircom.net"><input type="hidden" name="currency_code" value="EUR"><input type="hidden" name="item_name" value="'+outward_journey+' on '+input_first_date+' at '+ input_first_times+', '+return_journey+' on '+input_return_date+' at '+input_return_times+'."><input type="hidden" name="amount" value="'+tick_price+'"><input type="image" src="assets/img/pp_buy_large.png" border="0" name="submit" alt="Make payments with PayPal">';

		document.getElementById("ferry_btn").style.display = "none";
		document.getElementById("payp_btn").style.display = "block";
		document.getElementById("payp_btn").innerHTML = result;

	} else {
		document.getElementById("validate_ferry").innerHTML = "Check Ferry Again <span id='loading_span'></span>";
		document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	};
});

$('#payp_btn').click( function() {
	console.log("Testing");
	var firebaseRef2 = new Firebase("https://amber-fire-55.firebaseio.com/temp_tickets/");
	var ticket_type = document.getElementById('ticketPicker').value;
	var input_name = document.getElementById('name_input').value;
	var input_number = document.getElementById('number_input').value;
	var input_car_details = document.getElementById('car_details_input').value;
	var input_special_reqs = document.getElementById('special_reqs').value;

	var input_journey = document.getElementById('journeyPicker').value;
	var input_first_date = document.getElementById('first_sail_date').value;
	var input_return_date = document.getElementById('return_sail_date').value;
	var input_first_times = document.getElementById('first_sail_times').value;
	var input_return_times = document.getElementById('return_sail_times').value;

	firebaseRef2.push({
		type_of_ticket: ticket_type,
		name: input_name,
		number: input_number,
		car: input_car_details,
		requirements: input_special_reqs,
		paid: "no",
		ticket: {
			outbound: input_journey,
			outbound_date: input_first_date,
			outbound_time: input_first_times,
			return_date: input_return_date,
			return_time: input_return_times
		}
	});
})


function requireInput(input){
	// console.log("You haven't input a " + input);
	switch(input){
		case "ticket_type":
			// console.log("You haven't input a " + input);
			document.getElementById("warning_ticket_type").style.display = "block"
			document.getElementById("warning_ticket_type").innerHTML = "<div class='warning margin_ticket'>Please select a ticket type.</div>";
			// document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	        break;
		case "name":
			// console.log("You haven't input a " + input);
			document.getElementById("warning_name").style.display = "block"
			document.getElementById("warning_name").innerHTML = "<div class='warning'>Please enter a "+input+".</div>";
			// document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	        break;
		case "number":
			// console.log("You haven't input a " + input);
			document.getElementById("warning_number").style.display = "block"
			document.getElementById("warning_number").innerHTML = "<div class='warning'>Please enter a "+input+".</div>";
			// document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	        break;
		case "car_details":
			// console.log("You haven't input a " + input);
			document.getElementById("warning_car_details").style.display = "block"
			document.getElementById("warning_car_details").innerHTML = "<div class='warning'>Please enter your car details.</div>";
			// document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	        break;
		case "outward_journey":
			// console.log("You haven't input a " + input);
			document.getElementById("warning_journey_type").style.display = "block"
			document.getElementById("warning_journey_type").innerHTML = "<div class='warning'>Please select an outward journey.</div>";
			// document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	        break;
		case "outward_date":
			// console.log("You haven't input a " + input);
			document.getElementById("warning_outward_date").style.display = "block"
			document.getElementById("warning_outward_date").innerHTML = "<div class='warning'>Please select a valid date.</div>";
			// document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	        break;
		case "outward_time":
			// console.log("You haven't input a " + input);
			document.getElementById("warning_outward_time").style.display = "block"
			document.getElementById("warning_outward_time").innerHTML = "<div class='warning'>Please select a ferry time.</div>";
			// document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	        break;
		case "return_date":
			// console.log("You haven't input a " + input);
			document.getElementById("warning_return_date").style.display = "block"
			document.getElementById("warning_return_date").innerHTML = "<div class='warning'>Please select a valid return date.</div>";
			// document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	        break;
		case "return_time":
			// console.log("You haven't input a " + input);
			document.getElementById("warning_return_time").style.display = "block"
			document.getElementById("warning_return_time").innerHTML = "<div class='warning'>Please select a ferry time.</div>";
			// document.getElementById("warning_errors").innerHTML = "<div class='warning'>Check your details above, then try again.</div>";
	        break;
	    default:
	    	console.log("no requirements");
	}
};
function dateisinpast(){
	document.getElementById("warning_return_date").style.display = "block"
	var warning_HTML = "<div class='warning'>Pick a return date after your outward sailing.</div>"
	document.getElementById("warning_return_date").innerHTML = warning_HTML;
};
function timeisinpast(){
	document.getElementById("warning_return_time").style.display = "block"
	var warning_HTML = "<div class='warning'>Pick a return time after your outward sailing.</div>"
	document.getElementById("warning_return_time").innerHTML = warning_HTML;
};

// FIREBASE REF
var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable4/");

function getTimesForDate(date, journey, selectID) {
	var timetableObj = {};
	if (journey == "select_journey") {
		// do nothing
	} else {
		firebaseRef.on("value", function(snapshot) {
		    timetableObj = snapshot.val();
		    	var tdate = date;
			    var inputDate = getPrettyDate(date);
				// console.log(inputDate);
			    var todaysDate = checkDayRange(tdate);
			    var ttime = getPrettyTime(tdate);
			    var dayRange = todaysDate.substr(0, todaysDate.indexOf(','));
			    var monthRange = todaysDate.substr(todaysDate.lastIndexOf(',')+1, todaysDate.length);
			    // console.log(dayRange + " " + monthRange);
			    var cancelledArray = checkCancelledFerries(timetableObj, journey, tdate);
			    var extraArray = checkExtraFerries(timetableObj, journey, tdate);
			    // console.log(cancelledArray);
			    // console.log(extraArray);
			    // console.log(journey);
			    var finalArray = findDatabaseRef(timetableObj, journey, monthRange, dayRange, cancelledArray, extraArray);
			    // console.log(finalArray);
			    constructSelect(finalArray, selectID);
			});
	}
}
function constructSelect(array, selectID) {
	// console.log(array + " " + selectID);
	var selectHTML = "<option value='select_time'>Select A Time</option>";
		for (i = 0; i < array.length; i++) {
			selectHTML += "<option value='"+array[i]+"'>"+array[i]+"</option>"
		};
	// console.log(selectHTML);
	document.getElementById(selectID).innerHTML = selectHTML;
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

                            // FRIDAY FERRIES
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

                            // console.log(array);

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

function checkCancelledFerries(timetableObj, journey, date){
	// console.log(journey);
    if (journey == "da"){
        var cancelFerryObj = timetableObj.cancel_ferry.da;
    } else {
        var cancelFerryObj = timetableObj.cancel_ferry.db;
    }
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