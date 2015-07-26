var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/temp_tickets/");

$(function() { 
	// GET TIMETABLE OBJECT
	firebaseRef.on("value", function(snapshot) {
	var bookingsObj = {};
	bookingsObj = snapshot.val();
	// END FIREBASE

	makeBookingsTable(bookingsObj);

	// ERROR FUNCTION
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});

});
// END THE RUNNING FUNCTION

function makeBookingsTable(Obj){
	var offline = JSON.stringify(Obj, undefined, 4);
	document.getElementById("bookings").innerHTML = offline;
	var html = "<ul class='bookings'>"
	for (key in Obj) {
		html += "<li class='ticket'> Name: "+Obj[key].name+ ", Phone: " + Obj[key].number +  ", Ticket Type: " + Obj[key].type_of_ticket;
		if (Obj[key].paid == "no"){
			html += ", Email Received: <a class='red paid' href='#' id='"+key+"'>"+Obj[key].paid+"</a>";
		} else {
			html += ", Email Received: <a class='red paid paid_paypal' href='#' id='"+key+"'>"+Obj[key].paid+"</a> <span id='"+key+"' class='undo_pay'>payment not received</span>";
		}
		html += "<span class='red remove_entry pull-right' id='"+key+"'>ARCHIVE</span> </li>";
		html += "<li><strong>Sailing Details:</strong> Outward: "+Obj[key].ticket.outbound_date+" at "+Obj[key].ticket.outbound_time+  ",  Returning: "+Obj[key].ticket.return_date+" at "+Obj[key].ticket.return_time+"</li>";
	}
	html += "</ul>";
	document.getElementById("bookings_list").innerHTML = html;
}


$(function() { 
	$(document.body).on('click', 'a', function () { 
		if ($(this).hasClass('paid')){
			var firebaseKey = $(this).attr('id');
			// console.log(firebaseKey);
			$(this).addClass("paid_paypal");
			setFirebasePaid(firebaseKey);
			toastr.success('<i class="mdi-alert-warning margin_right"></i>Marked as paid!');
		}
	});
});


$(function() { 
	$(document.body).on('click', 'span', function () { 
		if ($(this).hasClass('undo_pay')){
			var firebaseKey = $(this).attr('id');
			// console.log(firebaseKey);
			$(this).removeClass("paid_paypal");
			setFirebaseNotPaid(firebaseKey);
			toastr.error('<i class="mdi-alert-warning margin_right"></i>Marked as not paid!');
		}
	});
});


$(function() { 
	$(document.body).on('click', 'span', function () { 
		if ($(this).hasClass('remove_entry')){
			var firebaseKey = $(this).attr('id');
			console.log(firebaseKey);
			moveFirebaseEntry(firebaseKey);
			// toastr.error('<i class="mdi-alert-warning margin_right"></i>Marked as not paid!');
		}
	});
});


function setFirebasePaid(key) {
	firebaseRef.child(key).update({paid : "Paid"});
}


function setFirebaseNotPaid(key) {
	firebaseRef.child(key).update({paid : "no"});
}

function moveFirebaseEntry(key) {
	firebaseRef.child(key).on('value', function(snapshot){
		var objectToMove = {};
		objectToMove = snapshot.val();
		// console.log(objectToMove);
		// MOVE TO ARCHIVE
		var archiveTickets = new Firebase("https://amber-fire-55.firebaseio.com/temp_tickets_archive/");
		archiveTickets.push(objectToMove);
	});
	// REMOVE LOCATION
	firebaseRef.child(key).remove();
	toastr.info("<i class='mdi-alert-warning margin_right'></i>Ticket has been archived");
}





