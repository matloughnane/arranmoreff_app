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



$(function() { 

	$.ajax({url: "http://en.wikipedia.org/w/api.php?format=json&action=query&titles=Main%20Page&prop=revisions&rvprop=content",
	        dataType: "html",
	        success: function (response) {
	            document.getElementById('internet_notification').style.display = 'none';
	        },
	        error: function (response) {
	            document.getElementById('internet_notification').style.display = 'block';
	        },
	        timeout: function (response) {
	            document.getElementById('internet_notification').style.display = 'block';
	        }                       
	 });
});

// FILTERING FUNCTION
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