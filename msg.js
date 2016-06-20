//========================================================
//cara's comments look just like this!
//========================================================

var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
//========================================================
//added to the DOM using javascript and jquery.
//lines 20 & 21 could be chained together, but
//they are separated for clarity's sake.
//line 22 adds an indicator message.
//========================================================

messageSystem = {
    showMessage: function(msg) {
        show = document.getElementById("msgbox");
        show.innerHTML = msg;
        $("#msgbox").delay(3000).fadeOut(500);
        $("#msgbox").fadeIn(0);
        }
}
//========================================================
//no change lines 25-36.
//========================================================

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
//========================================================
//commented out rand variable; changed delay on loopHandle
//to equal the sum of the fadeOut time + delay time in ms.
//========================================================
function loop() {
    showMsg();
    // var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    loopHandle = setTimeout(loop, 3500);
}


//========================================================
//minor changes to setTimeout delay and functionality after
//messages stop (a reload).
//removed the msgbox div when user chooses to stop messages.
//added indicator that messages are running.
//========================================================
$(function() {
   $('#msgButton').click(function() {
       var btn = $(this),
      btnTxt = btn.text();
       if (btnTxt === 'Start Messages') {
           btn.text('Stop Messages');
           loopHandle = setTimeout(loop, 0);
           $("h1").append("<p id='indicator'>MESSAGES RUNNING!</p>");
      } else {
           btn.text('Start Messages');
           clearTimeout(loopHandle);
           $("#msgbox").remove();
            $("#indicator").remove();
            location.reload();
           loopHandle = null;
       }
   } );
});
