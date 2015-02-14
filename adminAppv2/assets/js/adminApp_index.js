var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/timetable4/");

$(function() { 
	// GET TIMETABLE OBJECT
	firebaseRef.on("value", function(snapshot) {
	var timetableObj = {};
	timetableObj = snapshot.val();
	// END FIREBASE

	console.log(timetableObj);

	// ERROR FUNCTION
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});
});
// END THE RUNNING FUNCTION

