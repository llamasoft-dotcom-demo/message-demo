var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
	count: 0,
	loadingDots: 0,
	init: function() {
		messageSystem.initCloseClick();
		messageSystem.createMessageContainer();
		messageSystem.initMessageButton();
	},
	initCloseClick: function(){
		$('body').on('click', '.close-message', function() {
			$(this).parent().hide();
		});
	},
	initMessageButton: function() {
 	   $('body').on('click', '#msgButton', function() {
 	       var btn = $(this),
 	      btnTxt = btn.text();
 	       if (btnTxt === 'Start Messages') {
 	           btn.text('Stop Messages');
			   setInterval (messageSystem.loadDots, 600);
 	           loopHandle = setTimeout(messageSystem.loop, 3000);
 	       } else {
 	           btn.text('Start Messages');
 	           clearTimeout(loopHandle);
 	           loopHandle = null;
 	       }
 	   } );
	},
	loadDots: function(){
		var dotSpan = $('<span>', {id: 'dots'});
		$('#msgButton').append(dotSpan);
	    if(messageSystem.loadingDots < 6) {
	           $('#dots').append('.');
	           messageSystem.loadingDots++;
	       } else {
	           $('#dots').html('');
	           messageSystem.loadingDots = 0;
	       }	
	},
    showMessage: function(msg) {
		messageDiv = messageSystem.createMessageDiv();
		$(messageDiv).append(msg);
    },
	createMessageDiv: function(){
		var messageClass = 'message-' + messageSystem.count;
		var messageClassSelector = '.' + messageClass;
		var message = $('<div>', {class: '' + messageClass + ''});
		var closeMessage = $('<a>', {class: 'close-message', href: '#'});
		$(closeMessage).html("&times;");
		$('.message-box').append(message);
		$(messageClassSelector).append(closeMessage);
		setTimeout(function() {
			$(messageClassSelector).fadeOut(function(){
			    $(this).remove(); 
			});
		}, 3000 );
		return messageClassSelector;
	},
	createMessageContainer: function() {
		var messagebox = $('<div>', {class: 'message-box'});
		$("body").prepend(messagebox);
	},
	showMsg: function() {
	    quotes = [
	    "What we've got here is failure to communicate.",
	    'Go ahead, make my day.',
	    "I've got a bad feeling about this.",
	    "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
	    "I find your lack of faith disturbing.",
	    "You're gonna need a bigger boat.",
	    "Tell Mike it was only business.",
	    "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
	    ];
	    messageSystem.showMessage(_.sample(quotes));
	},
	loop: function() {
		messageSystem.count = messageSystem.count + 1;
	    messageSystem.showMsg();
	    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
	    loopHandle = setTimeout(messageSystem.loop, rand);
	}
	
}

$(function() {
	messageSystem.init();
});
