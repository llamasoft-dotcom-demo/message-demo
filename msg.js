
var loopHandle = null;


var messageSystem = {
    fireMessage: fireMessage,
	queue: [
		"What we've got here is failure to communicate.",
		'Go ahead, make my day.',
		"I've got a bad feeling about this.",
		"I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
		"I find your lack of faith disturbing.",
		"You're gonna need a bigger boat.",
		"Tell Mike it was only business.",
		"I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
	],
	parameters: {
		enterAnimation: "",
		exitAnimation: "",
		previousEnterAnimation: "",
		previousExitAnimation: "",
		fromOption: "top",
		previousFromOption: "top",
		alignment: "right",
		previousAlignment: "right",
		allowDismiss: true,
		previousAllowDismiss: true,
	}
};


function fireMessage(message) {
	/* bootstrap notify API */
	$.notify({
		title: "Llamasoft Messaging System",
		message: message,
		icon: "images/recentPreGroom.jpg"
	},
	{
		element: "body",
		position: null,
		delay: 2000,
		timer: 2000,
		allow_dismiss: messageSystem.parameters.allowDismiss,
		placement: {
			from: messageSystem.parameters.fromOption,
			align: messageSystem.parameters.alignment
		},
		animate: {
			enter: messageSystem.parameters.enterAnimation,
			exit: messageSystem.parameters.exitAnimation
		},
		type: "llama-messages",
		icon_type: "image",
		/* NOTE: template is a modified version of one found here http://bootstrap-notify.remabledesigns.com/ */
		template:
			"<div data-notify='container' class='col-xs-11 col-sm-3 alert alert-{0}' role='alert'>" +
				"<button type='button' aria-hidden='true' class='close' data-notify='dismiss' style='position: absolute; right: 10px; top: 5px; z-index: 1033;'>×</button>" +
				"<img data-notify='icon' class='img-circle pull-left'>" +
				"<span data-notify='title'>{1}</span>" +
				"<span data-notify='message'>{2}</span>" +
			"</div>"
	});
}

function showMsg() {
    messageSystem.fireMessage(_.sample(messageSystem.queue));
}


function loop() {
    showMsg();
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    loopHandle = setTimeout(loop, rand);
}


$(function() {
	
	$("#closeAllButton").click(function() {
		$.notifyClose();
	});
	
	//Start the messaging system
	$('#startMessageButton').click(function() {
		var btn = $(this),
		btnTxt = btn.text();
		if (btnTxt === 'Start Messages') {
			btn.removeClass("btn-success");
			btn.addClass("btn-danger");
			btn.text('Stop Messages');
			$(".show-while-running").show();
			$("#startMessageButton").attr("title", "Stops the messaging system"); //change the tool tip
			loopHandle = setTimeout(loop, 500);
		} else {
			btn.removeClass("btn-danger");
			btn.addClass("btn-success");
			btn.text("Start Messages");
			$(".show-while-running").hide();
			$("#startMessageButton").attr("title", "Starts the messaging system"); //change the tool tip
			clearTimeout(loopHandle);
			loopHandle = null;
		}
	});
   
   //Modal Controls
   $("#modalSaveButton").click(function() {
	   //Do nothing... changes already made...
   });
   
   $("#modalCancelButton").click(function() {
		messageSystem.parameters.enterAnimation = messageSystem.parameters.previousEnterAnimation;
		messageSystem.parameters.exitAnimation = messageSystem.parameters.previousExitAnimation;
		messageSystem.parameters.fromOption = messageSystem.parameters.previousFromOption;
		messageSystem.parameters.alignment = messageSystem.parameters.previousAlignment;
   });
   
   $('#optionModal').on('show.bs.modal', function (e) {
	   //Remember what the values were in case the user clicks Cancel
		messageSystem.parameters.previousEnterAnimation = messageSystem.parameters.enterAnimation;
		messageSystem.parameters.previousExitAnimation = messageSystem.parameters.exitAnimation;
		messageSystem.parameters.previousFromOption = messageSystem.parameters.fromOption;
		messageSystem.parameters.previousAlignment = messageSystem.parameters.alignment;
	});
	
	//Modal drop downs
	$("#enterAnimationDropdown").change(function() {
		var enter = $(this).val();
		messageSystem.parameters.enterAnimation = enter;
	});
	
	$("#exitAnimationDropdown").change(function() {
		var exit = $(this).val();
		messageSystem.parameters.exitAnimation = exit;
	});
	
	//Position radio button event handler
	$("input[type=radio][name=optradio]").change(function() {
		var selectedFromOption = $(this).val();
		messageSystem.parameters.fromOption = selectedFromOption.toLowerCase();
    });
	
	//Modal drop downs
	$("#messageAlignmentDropdown").change(function() {
		var selectedAlignment = $(this).val();
		messageSystem.parameters.alignment = selectedAlignment.toLowerCase();
	});
});





























































