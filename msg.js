var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem =
{
    showMessage: function(msg)
    {
		var options =
		{
			position : "top left",
			// Show for no more than 3 sec - hide/show animations consume 600 ms
			autoHideDelay : 2400,
			style : "usernotifystyle"
		};
		$.notify({title : msg, button : 'Dismiss'}, options);
    }
}



function showMsg()
{
    quotes =
    [
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

function loop()
{
    showMsg();
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    loopHandle = setTimeout(loop, rand);
}

$(function()
{
	$('#msgButton').click(function()
	{
		// Add new notify.js style 'usernotifystyle'
		$.notify.addStyle('usernotifystyle', {
		  html:
			"<div>" +
			  "<div class='clearfix'>" +
                "<div data-notify-html='title' style='display:inline-block;'/>" +
                "<button class='no' style='display:inline-block;margin-left:5px;'>Dismiss</button>" +
			  "</div>" +
			"</div>"
		});
		$(document).on('click', '.notifyjs-usernotifystyle-base .no', function()
		{
		  $(this).trigger('notify-hide');
		});


		var btn = $(this);
      	var btnTxt = btn.text();
		if (btnTxt === 'Start Messages')
		{
			btn.text('Stop Messages');
			loopHandle = setTimeout(loop, 500);
		}
		else
		{
			btn.text('Start Messages');
			clearTimeout(loopHandle);
			loopHandle = null;
		}
   });
});
