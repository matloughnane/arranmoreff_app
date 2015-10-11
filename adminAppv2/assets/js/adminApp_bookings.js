var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/temp_tickets/");

var firebaseRefArchive = new Firebase("https://amber-fire-55.firebaseio.com/temp_tickets_archive/");

$(function() { 
	// GET TIMETABLE OBJECT
	firebaseRef.on("value", function(snapshot) {
		var bookingsObj = {};
		bookingsObj = snapshot.val();
		// END FIREBASE
		makeBookingsTable(bookingsObj, "bookings_list");
	// ERROR FUNCTION
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});

	firebaseRefArchive.on("value", function(snapshot) {
		var bookingsObj = {};
		bookingsObj = snapshot.val();
		// END FIREBASE
		makeBookingsTable(bookingsObj, "bookings_list_archive");
		
	// ERROR FUNCTION
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});	

});
// END THE RUNNING FUNCTION

// function makeBookingsTable(Obj){
// 	var offline = JSON.stringify(Obj, undefined, 4);
// 	document.getElementById("bookings").innerHTML = offline;
// 	var html = "<ul class='bookings'>"
// 	for (key in Obj) {
// 		html += "<li class='ticket'> Name: "+Obj[key].name+ ", Phone: " + Obj[key].number +  ", Ticket Type: " + Obj[key].type_of_ticket;
// 		if (Obj[key].paid == "no"){
// 			html += ", Email Received: <a class='red paid' href='#' id='"+key+"'>"+Obj[key].paid+"</a>";
// 		} else {
// 			html += ", Email Received: <a class='red paid paid_paypal' href='#' id='"+key+"'>"+Obj[key].paid+"</a> <span id='"+key+"' class='undo_pay'>payment not received</span>";
// 		}
// 		html += "<span class='red remove_entry pull-right' id='"+key+"'>ARCHIVE</span> </li>";
// 		html += "<li><strong>Sailing Details:</strong> Outward: "+Obj[key].ticket.outbound_date+" at "+Obj[key].ticket.outbound_time+  ",  Returning: "+Obj[key].ticket.return_date+" at "+Obj[key].ticket.return_time+"</li>";
// 	}
// 	html += "</ul>";
// 	document.getElementById("bookings_list").innerHTML = html;
// };


function offlineTables(Obj) {
	var offline = JSON.stringify(Obj, undefined, 4);
	document.getElementById("bookings").innerHTML = offline;
}

function makeBookingsTable(Obj, htmlID){
	var count = 0;
	var html = "";
	// var html = "<div class='grid'>";
	for (key in Obj) {

		// CREATE GRID
		if (count == 0) {
			html += "<div class='grid'>";
		}
		if (count == 3){
			count = 0;
			html += "</div>";
			html += "<div class='grid'>";
		}

		// START HEADER + NAME
		if (htmlID == "bookings_list") {
			html += "<div class='unit w-1-3'> <div class='card shadow1 plain ticketCard_blue'> <div class='ticketHeader'> <div class='ticketRow'><span class='ticketTitle'>Name:</span> <span class='ticketDetail'>" + Obj[key].name + "</span></div>";
		} else {
			html += "<div class='unit w-1-3'> <div class='card shadow1 plain ticketCard_orange'> <div class='ticketHeader'> <div class='ticketRow'><span class='ticketTitle'>Name:</span> <span class='ticketDetail'>" + Obj[key].name + "</span></div>";
		}

		// NUMBER
		html += "<div class='ticketRow'><span class='ticketTitle'>Contact:</span> <span class='ticketDetail'>"+ Obj[key].number +"</span></div>";
		// ENDING HEADER + START MAIN
		html += "</div><div class='ticketMain'><div class='ticketRow'>";
		// TICKET DETAILS
		html += "<div class='ticketRow'> <span class='ticketTitle'>Ticket Type:</span> <span class='ticketDetail'>"+ Obj[key].type_of_ticket +"</span>";
		// QUANTITY
		if (Obj[key].qty == null) {
			html += "<span class='ticketTitle QTY'>Qty:</span> <span class='ticketDetail'>1</span> </div>";
		} else {
			html += "<span class='ticketTitle QTY'>Qty:</span> <span class='ticketDetail'>"+Obj[key].qty+"</span> </div>";
		};
		// JOURNEY DETAILS
		html += "<div class='ticketRow'><span class='ticketTitle'>Journey Out:</span> <span class='ticketDetail'>"+ Obj[key].ticket.outbound_date +", "+Obj[key].ticket.outbound_time+"</span></div>";
		html += "<div class='ticketRow'><span class='ticketTitle'>Journey Return:</span> <span class='ticketDetail'>"+ Obj[key].ticket.return_date +", "+Obj[key].ticket.return_time+"</span></div>";
		// REQUIREMENTS
		html += "<div class='ticketRow'><span class='ticketTitle'>Special Requirements:</span> <span class='ticketDetail'>"+ Obj[key].requirements +"</span></div>";

		if (Obj[key].paid == "no"){
			// html += ", Email Received: <a class='red paid' href='#' id='"+key+"'>"+Obj[key].paid+"</a>";
			html += "<div class='ticketRow'><span class='ticketTitle'>Paid:</span> <span class='ticketDetail red'>"+Obj[key].paid+"</span></div>";
			// HTML FOOTER
			if (htmlID !== "bookings_list_archive") {
				html += "</div><div class='ticketFooter'> <span class='btn_orange btn_tkt remove_entry' id='"+key+"'>Archive</span> <span class='ticketDetail'> <a class='btn_orange btn_tkt paid' href='#' id='"+key+"'> Mark As Paid </a> </span> </div>";
			}
		} else {
			// html += ", Email Received: <a class='red paid paid_paypal' href='#' id='"+key+"'>"+Obj[key].paid+"</a> <span id='"+key+"' class='undo_pay'>payment not received</span>";
			html += "<div class='ticketRow'><span class='ticketTitle'>Paid:</span> <span class='ticketDetail green'>"+Obj[key].paid+"</span></div>";
			// HTML FOOTER
			if (htmlID !== "bookings_list_archive") {
				html += "</div><div class='ticketFooter'> <span class='btn_orange btn_tkt remove_entry' id='"+key+"'>Archive</span> <span class='ticketDetail'>  <span id='"+key+"' class='btn_orange btn_tkt undo_pay'>Mark As Not Paid</span> </div>";
			}
		}

		html += "</div> </div> </div>"
		// console.log(count);
		count++;
	}
	html += "</div>";
	var htmlDIV = ""+htmlID+"";
	// console.log(htmlDIV);
	document.getElementById(htmlDIV).innerHTML = html;
};

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

$(function() { 
	$(document.body).on('click', 'a', function () { 
		if ($(this).hasClass('toggleArchive')){
			$( "#bookings_list_archive" ).toggle();
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





