var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
        //alert(msg);
        //$('#msgList').append('<div class= "alertBox">' + msg + '</div>');
       // $('.alertBox').dialog().fadeOut( 3000 );
        
        $.growl.warning( { message: msg } );
        
        
    }
}
function showMsg() {
    quotes = [
    "What we've got here is failure to communicate.",
    "Go ahead, make my day.",
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

var toggleInstructions=false;

$(function() {
   $('#msgButton').click(function() {
       var btn = $(this),
      btnTxt = btn.text();
       
       if (btnTxt === 'Start Messages') {
           btn.text('Stop Messages');
           $( '.buttonChange' ).show();
           loopHandle = setTimeout(loop, 500);
           
       } else {
           btn.text('Start Messages');
           $( '.buttonChange' ).fadeOut(500); //Added to give another way for the user to know that the text on the button changed.
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});


