var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    messageCount: 0,
    clickCount: 0,
    showMessage: function(msg) {
    	messageSystem.messageCount++;
        var notify = $.notify(
            {message: msg, title: "Message " + messageSystem.messageCount}, 
            {
                delay: 3000,
                type: "dave",
                offset: {x: 50, y: 140},
                template: 
    '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="title">{1}</span>' +
        '<span data-notify="message">{2}</span>' +
    '</div>'
            });
        
        var jqRunning = $('#running');
        if(jqRunning.length == 0){
        	$('<span id="running">You see those messages too, right?</span>').insertAfter("#msgButton");
        	$('#msgButton').click(messageSystem.changeMessageOnButtonClick);
        	return;
        }
    },
    changeMessageOnButtonClick: function(sender){
    	messageSystem.clickCount++;
    	var jqRunning = $('#running');
    	var runningText = (messageSystem.clickCount % 2) == 0 ? 'There they are again!?!' : 'I think they stopped.';
    	jqRunning.text(runningText); 
    }
    
}



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
   $('#msgButton').click(function() {
       var btn = $(this),
      btnTxt = btn.text();
       if (btnTxt === 'Start Messages') {
           btn.text('Stop Messages');
           loopHandle = setTimeout(loop, 500);
       } else {
           btn.text('Start Messages');
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});
