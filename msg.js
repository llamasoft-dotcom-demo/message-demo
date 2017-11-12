var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {

    showMessage: function(msg) {
        var id = document.getElementsByClassName("msgContent").length;  // create an unique ID for each msgContent so we can easily hide/fade them
        var newMsg = document.createElement("div");
        newMsg.id = "msgContent_" + id;
        newMsg.className = "msgContent";
        newMsg.innerHTML = "<p>" + msg + "</p><button class='dismissMsgBtn' onClick='messageSystem.dismissMsg(" + id + ")'>Dismiss</button>";
        $('#msgContainer').append(newMsg);
        $('#msgContent_' + id).delay(2300).fadeOut(700);  // create a delay before fading so the user can read the text before its too transparent
    },

    dismissMsg: function(msgId) {
      $('#msgContent_' + msgId).hide();
    },
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
           $("#msgIndicator").text('Messages Running!');
           loopHandle = setTimeout(loop, 500);
       } else {
           btn.text('Start Messages');
           $("#msgIndicator").text('Messages Paused!');
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});
