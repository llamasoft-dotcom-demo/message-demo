var loopHandle = null;
var curIndex = 0;
var myArray = [];

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function (msg) {
        curIndex++;
        myArray.push(curIndex);

        //create html for message and close early button
        htmlMsg = "<div id='divMsg" + curIndex + "'>";
        htmlMsg += "<input id='btnMsg" + curIndex + "' type='button' onclick='messageSystem.hideNow(this.id)' value='X' /> " + msg + "<br />";
        htmlMsg += "</div>";

        //append the message and close button
        $("#divParentMsg").append(htmlMsg);
        
        //autoscroll to bottom of div
        $('#divParentMsg').scrollTop($('#divParentMsg')[0].scrollHeight);

        //sets the msg to dissapear after 3 seconds
        setTimeout(messageSystem.fadeMsgOut, 3000);
    },

    fadeMsgOut: function () {
        //fades completely out after 1 second
        $("#divMsg" + myArray[0]).fadeOut(1000);
        myArray.shift();
    },

    hideNow: function (id) {
        //dissapears immediately
        var position = id.substring(6, String(id).length);
        $("#divMsg" + position).hide();
    }

}

$(document).ready(function () {
    //changes the border indicator
    $("#msgButton").click(function () {
        if ($("#msgButton").hasClass("EnableMsgs")) {
            $("#msgButton").removeClass("EnableMsgs");
            $("#msgButton").addClass("DisableMsgs");
        }
        else {
            $("#msgButton").addClass("EnableMsgs");
            $("#msgButton").removeClass("DisableMsgs");
        }
    });
})



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
