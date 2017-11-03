var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
var msgIndex = 0;
messageSystem = {
    showMessage: function(msg) {
        msgIndex++;
        // alert(msg);
        console.log(msg);
        // add message to the message list at the top of the page
        msg_id = "msg"+msgIndex;
        var message = '<div class="msg" id = "' + msg_id + '"> \
                        <span class="closebtn" onClick="this.parentElement.remove();" >&times;</span>';
        message += msg;
        message += '</div>';
        $("#messages").append(message);
        // after 2 seconds, fade out for 1 second, then remove the element
        $('#'+msg_id).delay(2000).fadeOut(1000, function() { $(this).remove(); });
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
