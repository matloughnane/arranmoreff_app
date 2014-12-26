$(function() {

    var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/");

    // A MESSAGES REFERENCE UNDER MAIN DB
    var rootRef = firebaseRef.child("timetable2");

    defineArrays(rootRef);

});


function defineArrays(firebaseArray) {
    
    firebaseArray.on("value", function(snapshot) {
    // Get's the array in the correct format and logs it
        var wholeArray = [];
        wholeArray = snapshot.val();

        // SUMMER
        var summer_da_weekday = wholeArray.summer_da.weekday;

        listEditables(summer_da_weekday, "summerDA_weekday");

        var summer_da_weekend = wholeArray.summer_da.weekend;

        listEditables(summer_da_weekend, "summerDA_weekend");

        var summer_db_weekday = wholeArray.summer_db.weekday;
        var summer_db_weekend = wholeArray.summer_db.weekend;

        // WINTER
        var winter_da_weekday = wholeArray.winter_da.weekday;
        var winter_da_weekend = wholeArray.winter_da.weekend;
        var winter_db_weekday = wholeArray.winter_db.weekday;
        var winter_db_weekend = wholeArray.winter_db.weekend;


    // ODD FUNCTION
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

};

function listEditables(array, htmlID) {

    // LOOP THROUGH THE ARRAY
    var listOfTimes = "";
    for (var i = 0; i < array.length; i++) {
        listOfTimes += "<li class='time_tag'>" + array[i] + "<i class='fa fa-times time_tag_delete'></i></li>";
    };

    // ADD LIST TO HTML
    document.getElementById(""+ htmlID +"").innerHTML = listOfTimes;

};


