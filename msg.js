var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate

//Instantiating i 
var i = 0;

messageSystem = {
	showMessage : function(msg) {
		//Here I want to raise a number every time the method is executed
		i++;
		//in order to be able to use the fadeOut and remove() methods I create variables for msg and button
		//var div: enables every msg to have an id, that is unique for the msg all in a String   
		var div = $('<div class="well" id="' + i + '">' + msg + '</div>');
		//var btn: generates an id for the button so that this id is unique correlating to a message    
		var btn = $('<a class="btn btn-xs btn-danger pull-right glyphicon glyphicon-trash" id="deleteB"></a></div>');
		//button to save message for later
		var btnSave = $('<a class="btn btn-xs btn-info pull-right glyphicon glyphicon-pushpin" id="btnsave"></a></div>');

				
		
		div.append(btn);
		$("#newMessages").append(div);
		//using delay and fade out can be controlled the time in witch the message is shown
		$("#" + i).delay(3000).fadeOut('fast');

		div.append(btnSave);

		//with remove (this)parent is possible to delete exactly the message that the user selects	
		btn.click(function() {
			$(this).parent().remove();
		});

		btnSave.click(function() {
			// selects a new container and move the selected message   		
			$("#saveMessages").append($(this).parent());
			
			//stop removing items with delay and store them in the save container
			$(this).parent().clearQueue();
			//here the code removes the pin button from the message
			$(this).remove();
		});
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
			"I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum." ];
	messageSystem.showMessage(_.sample(quotes));

}

function loop() {
	showMsg();
	var rand = Math.round(Math.random() * (3000 - 500)) + 500;
	loopHandle = setTimeout(loop, rand);
}

$(function() {
	//Anonyme Funktion weil sie nur einmal benutze (only for my understanding)
	$('#msgButton').click(function() {

		var btn = $(this), btnTxt = btn.text();
		if (btnTxt === 'Start Messages') {
			//wenn start dann ändert der Button text (only for my understanding)
			btn.text('Stop Messages');
			//Wenn timeout los geht dann startet loof in 500 milisekunden (only for my understanding)
			loopHandle = setTimeout(loop, 500);
		} else {
			//Wenn nicht start alles auf null (only for my understanding)
			btn.text('Start Messages');
			//loophandle nehme den Timeout weg (only for my understanding)
			clearTimeout(loopHandle);
			loopHandle = null;
		}

	});
});
