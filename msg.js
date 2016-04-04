var loopHandle = null;

//number of currently displayed messages
//need a way to uniquely identify each message div
var messageCount = 0;


// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate

//TODO:
//offset messages if multiple on page
messageSystem = {
    closeMessage: function(id) {
      //console.log("removing id: "+id);
      $("#"+id).fadeOut('slow').remove();
    },

    showMessage: function(msg) {
        messageCount += 1;

        var message = $("<div class='message' id='message-"+messageCount+"' style='display: none;'></div>").text(msg);
        //console.log("creating id: "+messageCount);
        $("#messages").append(message);

        var close = $("<button onClick='messageSystem.closeMessage(this.parentNode.id)' style=>Close</button>");
        $("#message-"+messageCount).append(close);

        $("#message-"+messageCount).fadeIn('fast');
        setTimeout(this.closeMessage,3000,"message-"+messageCount);
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
           $("#msgButton").css({"background-color":"red"});
           loopHandle = setTimeout(loop, 500);
       } else {
           btn.text('Start Messages');
           $("#msgButton").css({"background-color":"green"});
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});
