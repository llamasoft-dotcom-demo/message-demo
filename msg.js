var loopHandle = null;
var count = 1;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
        var msgDiv = document.createElement('div');
		var text = document.createTextNode(msg);
		
		var msgClose = document.createElement('a');
		msgClose.id = "close";
		msgClose.href = "#";
		msgClose.innerHTML = "X";
		msgClose.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
        return false;
    };
		
		msgDiv.className = "message";
		msgDiv.id = "message" + count;
		msgDiv.appendChild(text);
		msgDiv.appendChild(msgClose);
		document.getElementById('messageArea').appendChild(msgDiv);
		
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		td1.innerHTML = Date();
		tr.appendChild(td1);
		td2.innerHTML = count;
		tr.appendChild(td2);
		td3.innerHTML = msg;
		tr.appendChild(td3);
		document.getElementById('archiveTable').appendChild(tr);
		
		$("#message" + count).delay(3000).fadeOut(2000);
		count++;
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
   $('#archiveButton').click(function(){
	   var btn = $(this),
	   btnTxt = btn.text();
	   $("#archive").toggle();
	   if (btnTxt === 'Show Message Archive') {
		   btn.text('Hide Message Archive');
	   }
	   else{
		   btn.text('Show Message Archive');
	   }
   });
});
