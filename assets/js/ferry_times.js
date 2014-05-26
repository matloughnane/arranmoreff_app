tday  =new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");


// ====================== CSV PARSING ========================  //

// 'https://docs.google.com/spreadsheet/pub?key=0Ahm69ZFnwz84dGl3Slk4eU1mQVI5eHVWMlZ4Rk9uOWc&output=csv'

loadCSV('https://docs.google.com/spreadsheet/pub?key=0Ahm69ZFnwz84dGl3Slk4eU1mQVI5eHVWMlZ4Rk9uOWc&output=csv');


function loadCSV(file) {
    var request;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari
        request = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // load
    request.open('GET', file, false);
    request.send();
    parseCSV(request.responseText);
};

function parseCSV(data){
    weekday_times = data;
};


// ====================== CSV PARSING ========================  //


function GetNextFerry(){
	m = new Date();
		mday   = m.getDay();
		mmonth = m.getMonth();
		mdate  = m.getDate();
		myear = m.getYear();
	if(myear<1000) myear=myear+1900;
		mhour = m.getHours();
		mminute = m.getMinutes();
	if(mminute<10) mminute = "0"+mminute.toString();
		hourString = mhour.toString();
		militaryclock = hourString.concat(mminute.toString());
		militaryclockInt = parseInt(militaryclock);

	// MOVE THE CLOCK BACKWARDS (FOR TESTING)
	// militaryclockInt = parseInt(militaryclock)-300;

	// MOVE THE CALENDAR BACK / FORWARD MONTHS (FOR TESTING)
	// mmonth = mmonth - 3;

	// LOG TO THE CONSOLE - LOCAL TIME
	// console.log( "Time the website thinks it is: " + militaryclockInt );

	// USE IF STATEMENT TO CHANGE TIMETABLES

	if (mmonth <=3 != mmonth >= 8) {
		// FERRY TIMES FOR WINTER MONTHS  >> JANUARY 0 , FEBRUARY 1, MARCH 2, APRIL 3, SEPTMBER 8 , OCTOBER 9, NOVEMBER 10 AND DECEMBER 11.
		weekDepartArranmoreInt = new Array(0745, 0915, 1015, 1315, 1500, 1700);
		sundayDepartArranmoreInt = new Array (1015, 1200, 1315, 1500, 1700);

		weekDepartBurtonInt = new Array(0845, 0945, 1245, 1430, 1630, 1730);
		sundayDepartBurtonInt = new Array (1130, 1245, 1430, 1630, 1730);
	} else {
		// TIMES FOR SUMMER MONTHS MAY 4, JUNE 5, JULY 6 and AUGUST 7
		weekDepartArranmoreInt = new Array(0745, 0915, 1015, 1315, 1500, 1700, 1800);
		sundayDepartArranmoreInt = new Array (1015, 1200, 1315, 1500, 1700, 1800);

		weekDepartBurtonInt = new Array(0845, 0945, 1245, 1430, 1630, 1730, 1830);
		sundayDepartBurtonInt = new Array (1130, 1245, 1430, 1630, 1730, 1830);
	};

	console.log(weekDepartArranmoreInt);

// CHECKS FOR DAY OF THE WEEK
	if (mday = 0 ) {
		// START SUNDAY CHECK
		if (militaryclockInt < sundayDepartArranmoreInt[0]) {
				nextFerryTimeDepartArranmore = sundayDepartArranmoreInt[0];
		} else if (militaryclockInt < sundayDepartArranmoreInt[1]) {
				nextFerryTimeDepartArranmore = sundayDepartArranmoreInt[1];
		} else if (militaryclockInt < sundayDepartArranmoreInt[2]) {
				nextFerryTimeDepartArranmore = sundayDepartArranmoreInt[2];
		} else if (militaryclockInt < sundayDepartArranmoreInt[3]) {
				nextFerryTimeDepartArranmore = sundayDepartArranmoreInt[3];
		} else if (militaryclockInt < sundayDepartArranmoreInt[4]) {
				nextFerryTimeDepartArranmore = sundayDepartArranmoreInt[4];
		} else if (militaryclockInt < sundayDepartArranmoreInt[5]) { 
				nextFerryTimeDepartArranmore = sundayDepartArranmoreInt[5];
		} else if (militaryclockInt < sundayDepartArranmoreInt[6]) {
				nextFerryTimeDepartArranmore = sundayDepartArranmoreInt[6];
		} else if (militaryclockInt < sundayDepartArranmoreInt[7]) {
				nextFerryTimeDepartArranmore = sundayDepartArranmoreInt[7];
		} else {
				nextFerryTimeDepartArranmore = "No More Ferries Today";
		};

		if (militaryclockInt < sundayDepartBurtonInt[0]) {
				nextFerryTimeDepartBurton = sundayDepartBurtonInt[0];
		} else if (militaryclockInt < sundayDepartBurtonInt[1]) {
				nextFerryTimeDepartBurton = sundayDepartBurtonInt[1];
		} else if (militaryclockInt < sundayDepartBurtonInt[2]) {
				nextFerryTimeDepartBurton = sundayDepartBurtonInt[2];
		} else if (militaryclockInt < sundayDepartBurtonInt[3]) {
				nextFerryTimeDepartBurton = sundayDepartBurtonInt[3];
		} else if (militaryclockInt < sundayDepartBurtonInt[4]) {
				nextFerryTimeDepartBurton = sundayDepartBurtonInt[4];
		} else if (militaryclockInt < sundayDepartBurtonInt[5]) { 
				nextFerryTimeDepartBurton = sundayDepartBurtonInt[5];
		} else if (militaryclockInt < sundayDepartBurtonInt[6]) {
				nextFerryTimeDepartBurton = sundayDepartBurtonInt[6];
		} else if (militaryclockInt < sundayDepartBurtonInt[7]) {
				nextFerryTimeDepartBurton = sundayDepartBurtonInt[7];
		} else {
				nextFerryTimeDepartBurton = "No More Ferries Today";
		};
		// END THE SUNDAY TIMES CHECKS
		// START WEEKDAY CHECKS
	} else {
		if (militaryclockInt < weekDepartArranmoreInt[0]) {
				nextFerryTimeDepartArranmore = weekDepartArranmoreInt[0];
		} else if (militaryclockInt < weekDepartArranmoreInt[1]) {
				nextFerryTimeDepartArranmore = weekDepartArranmoreInt[1];
		} else if (militaryclockInt < weekDepartArranmoreInt[2]) {
				nextFerryTimeDepartArranmore = weekDepartArranmoreInt[2];
		} else if (militaryclockInt < weekDepartArranmoreInt[3]) {
				nextFerryTimeDepartArranmore = weekDepartArranmoreInt[3];
		} else if (militaryclockInt < weekDepartArranmoreInt[4]) {
				nextFerryTimeDepartArranmore = weekDepartArranmoreInt[4];
		} else if (militaryclockInt < weekDepartArranmoreInt[5]) { 
				nextFerryTimeDepartArranmore = weekDepartArranmoreInt[5];
		} else if (militaryclockInt < weekDepartArranmoreInt[6]) {
				nextFerryTimeDepartArranmore = weekDepartArranmoreInt[6];
		} else {
				nextFerryTimeDepartArranmore = "No More Ferries Today";
		};

		if (militaryclockInt < weekDepartBurtonInt[0]) {
				nextFerryTimeDepartBurton = weekDepartBurtonInt[0];
		} else if (militaryclockInt < weekDepartBurtonInt[1]) {
				nextFerryTimeDepartBurton = weekDepartBurtonInt[1];
		} else if (militaryclockInt < weekDepartBurtonInt[2]) {
				nextFerryTimeDepartBurton = weekDepartBurtonInt[2];
		} else if (militaryclockInt < weekDepartBurtonInt[3]) {
				nextFerryTimeDepartBurton = weekDepartBurtonInt[3];
		} else if (militaryclockInt < weekDepartBurtonInt[4]) {
				nextFerryTimeDepartBurton = weekDepartBurtonInt[4];
		} else if (militaryclockInt < weekDepartBurtonInt[5]) { 
				nextFerryTimeDepartBurton = weekDepartBurtonInt[5];
		} else if (militaryclockInt < weekDepartBurtonInt[6]) {
				nextFerryTimeDepartBurton = weekDepartBurtonInt[6];
		} else {
				nextFerryTimeDepartBurton = "No More Ferries Today";
		};
		// END WEEKDAY CHECKS
	};


 // ========================================= AM AND PM TIMES =========================================//


	am_pm = ""

	// TO REVERT TO 24 HOUR CLOCK - COMMENT OUT BELOW
	
	// if (militaryclockInt < 1200) {
	// 	am_pm = "AM"
	// } else {
	// 	am_pm = "PM"
	// }

	// if (nextFerryTimeDepartBurton  > 1200) {
	// 	nextFerryTimeDepartBurton = nextFerryTimeDepartBurton -1200;
	// }

	// if (nextFerryTimeDepartArranmore  > 1200) {
	// 	nextFerryTimeDepartArranmore = nextFerryTimeDepartArranmore -1200;
	// }


 // ========================================= END AM AND PM TIMES =========================================//



// ========================== CONVERTING TO GOOD LOOKING FORMAT ========================== //


	nextFerryTimeDepartArranmoreString = nextFerryTimeDepartArranmore.toString();
	nextFerryTimeDepartBurtonString = nextFerryTimeDepartBurton.toString();

	// ADD 0 TO START OF TIMES
	if (nextFerryTimeDepartArranmoreString.length < 4) {
		// console.log("0"+nextFerryTimeDepartArranmoreString);
		nextFerryTimeDepartArranmoreString = "0"+nextFerryTimeDepartArranmoreString;
	}

	if (nextFerryTimeDepartBurtonString.length < 4) {
		// console.log("0"+nextFerryTimeDepartBurtonString);
		nextFerryTimeDepartBurtonString = "0"+nextFerryTimeDepartBurtonString;
	}

	// SIMPLE

	// nextFerryTimeDepartArranmoreFinal = nextFerryTimeDepartArranmoreString.substring(0,2)+":"+nextFerryTimeDepartArranmoreString.substring(2,4);

	// nextFerryTimeDepartBurtonFinal = nextFerryTimeDepartBurtonString.substring(0,2)+":"+nextFerryTimeDepartBurtonString.substring(2,4);


	// MAKING SURE THAT ANY TEXT DISPLAYED

	if (nextFerryTimeDepartArranmoreString.length < 6) {
		nextFerryTimeDepartArranmoreFinal = nextFerryTimeDepartArranmoreString.substring(0,2)+":"+nextFerryTimeDepartArranmoreString.substring(2,4);
	} else {
		nextFerryTimeDepartArranmoreFinal = nextFerryTimeDepartArranmoreString;
	}

	if (nextFerryTimeDepartBurtonString.length < 6) {
		nextFerryTimeDepartBurtonFinal = nextFerryTimeDepartBurtonString.substring(0,2)+":"+nextFerryTimeDepartBurtonString.substring(2,4);
	} else {
		nextFerryTimeDepartBurtonFinal = nextFerryTimeDepartBurtonString;
	}



// ========================== END OF CONVERTING TO GOOD LOOKING FORMAT ========================== //


	// DAYS OF WEEKS WITH CONSOLE LOG

	// if (militaryclockInt < weekDepartArranmoreInt[0]) {
	// 		nextFerryTime = weekDepartArranmoreInt[0];
	// 		console.log( weekDepartArranmoreInt[0] );
	// } else if (militaryclockInt < weekDepartArranmoreInt[1]) {
	// 		nextFerryTime = weekDepartArranmoreInt[1];
	// 		console.log( weekDepartArranmoreInt[1] );
	// } else if (militaryclockInt < weekDepartArranmoreInt[2]) {
	// 		nextFerryTime = weekDepartArranmoreInt[2];
	// 		console.log( weekDepartArranmoreInt[2] );
	// } else if (militaryclockInt < weekDepartArranmoreInt[3]) {
	// 		nextFerryTime = weekDepartArranmoreInt[3];
	// 		console.log( weekDepartArranmoreInt[3] );
	// } else if (militaryclockInt < weekDepartArranmoreInt[4]) {
	// 		nextFerryTime = weekDepartArranmoreInt[4];
	// 		console.log( weekDepartArranmoreInt[4] );
	// } else if (militaryclockInt < weekDepartArranmoreInt[5]) { 
	// 		nextFerryTime = weekDepartArranmoreInt[5];
	// 		console.log( weekDepartArranmoreInt[5] );
	// } else if (militaryclockInt < weekDepartArranmoreInt[6]) {
	// 		nextFerryTime = weekDepartArranmoreInt[6];
	// 		console.log( weekDepartArranmoreInt[6] );
	// } else {
	// 		nextFerryTime = "No Ferries Running Today";
	// 		console.log( "No Ferries Running Today" );
	// };

	document.getElementById('nextFerryDepartArranmore').innerHTML=""+nextFerryTimeDepartArranmoreFinal+" "+am_pm+"";
	document.getElementById('nextFerryDepartBurton').innerHTML=""+nextFerryTimeDepartBurtonFinal+" "+am_pm+"";

	setTimeout("GetNextFerry()", 1000);

	// console.log( militaryclockInt );
	// console.log( "MATTHEW" );

}
