var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feel
// is appropriate
var messageSystem = (function() {

	var msgState = 'Idle';

	var renderMsgCount = function() {
		var msgCount = $('#message-list li').length;
		if(msgCount != 0) {
			var msgCountTxt = msgState + ' - ' + msgCount + ' message' + ((msgCount != 1) ? 's' : '');
			$('#message-list-count').text(msgCountTxt);
		} else {
			$('#message-list-count').text(msgState);
		}
	}
	
	return {
		showMessage: function(msg) {
			var msgElem = $('<li><div class="msg-close noselect">X</div><div>' + msg + '</div></li>');
			$('#message-list').append(msgElem);
			msgElem.find('div.msg-close').one('click', function() { msgElem.remove(); renderMsgCount(); } );
			msgElem.delay(3000).fadeOut(750, function() { 
				msgElem.remove();
				renderMsgCount();
			} );
			renderMsgCount();
		},
		
		setMsgState(state) {
			msgState = state;
			renderMsgCount();
		}
	}
})();

function showMsg() {
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
    
}

function loop() {
    showMsg();
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    loopHandle = setTimeout(loop, rand);
}


$(function() {
	messageSystem.setMsgState('Idle');

   $('#msgButton').click(function() {
       var btn = $(this),
      btnTxt = btn.text();
       if (btnTxt === 'Start Messages') {
           btn.text('Stop Messages');
		   messageSystem.setMsgState('Active');
           loopHandle = setTimeout(loop, 500);
       } else {
           btn.text('Start Messages');
           clearTimeout(loopHandle);
		   messageSystem.setMsgState('Idle');
           loopHandle = null;
       }
   } );
   
   $('#message-list-toggle').click(function() {
		$('#message-list').toggle();
		if($(this).text() === '-') {
			$(this).text('+');
		} else {
			$(this).text('-');
		}
   });
});
