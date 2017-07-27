var loopHandle = null,
	template = null,
	colors = {
		dark: "dark",
		light: "light",
	};


// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
	lastColor: "dark",
	
	// Gets the next background color of the message (alternates between light and dark)
	getNextColor: function () {
		var color = messageSystem.lastColor;
		
		if (color === colors.dark) {
			color = colors.light;			
		} else {
			color = colors.dark;
		}
		
		messageSystem.lastColor = color;
		
		return color;
	},	
	
    showMessage: function(message) {
		var messageId = 'msgId-' + (Math.floor(Math.random() * (100000 - 0) + 1000000)),
			selectorId = '#' + messageId,
			data = {
				id: messageId,
				quotes: message.msg,
				level: message.level,
				color: messageSystem.getNextColor()
			};
						
		// set template
		$(".messageBox").append(
            template(data)
        );
		
		// delete button handler
		$(selectorId + ' .deleteButton').click(function () {
			$(selectorId).remove();
		});
		
		// auto message fade / delete
		setTimeout(function(){ 
			$(selectorId).fadeOut(1500, function () {
				$(this).remove();
			}); 
		}, 3000);
    }
}


function showMsg() {
    quotes = [
		{ msg: "What we've got here is failure to communicate.", level: "Error" },
		{ msg: "Go ahead, make my day.", level: "None" },
		{ msg: "I've got a bad feeling about this.", level: "Error" },
		{ msg: "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.", level: "None" },
		{ msg: "I find your lack of faith disturbing.", level: "None" },
		{ msg: "You're gonna need a bigger boat.", level: "None" },
		{ msg: "Tell Mike it was only business.", level: "None" },
		{ msg: "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum.", level: "None" }
    ];
	
    messageSystem.showMessage(_.sample(quotes));
}


function loop() {
    showMsg();
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    loopHandle = setTimeout(loop, rand);
}


$(function() {
	// setup template
	_.templateSettings.variable = "data";
	template = _.template($("script.messageTemplate").html());
	
	// setup message button
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