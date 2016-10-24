// Lets do this with some OO design. We will scope this down so it isn't completely global. 
// We will just use private and priveledged members here. 
// Prototype and public methods are overkill for this. 
// We won't be using this for inheritance anyway.   
$(function () {
    'use strict';  // No undeclared varialbes for us. We want safe code.

    //
    // messageApp: the main function for this application
    //
    var messageApp = new function () {
        var loopHandle = null;
        var msgIdCount = 0;

        var showMsg = function (count) {
            var messageDuration = 3000;
            var messageID = getMessageID(count);

            var quotes = [
                "What we've got here is failure to communicate.",
                "Go ahead, make my day.",
                "I've got a bad feeling about this.",
                "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
                "I find your lack of faith disturbing.",
                "You're gonna need a bigger boat.",
                "Tell Mike it was only business.",
                "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
            ];
            // select a quote then add it to our container
            $('#msgContainer').append(getMessageString(_.sample(quotes), messageID));

            // set the message to fade after a certain durationw
            setTimeout(function () {
                $("#" + messageID).alert("close");
            }, messageDuration);
        };

        //
        // getMessageString: creates the html for our message alert
        //
        var getMessageString = function (inputString, messageID) {
            return '<div class="alert alert-success fade in" id="' + messageID + '">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a>' +
                inputString +
                '</div>';
        };

        //
        // getMessageID: helper function to build up the message id
        //
        var getMessageID = function (count) {
            return 'message_' + count;
        };


        //
        // loop: the main timer loop
        //
        var loop = function () {
            var seed = 2500;
            var timeOffset = 500;
            msgIdCount += 1;  // Not using ++ as per JavaScript: the good parts

            showMsg(msgIdCount);
            var rand = Math.round(Math.random() * (seed)) + timeOffset;
            loopHandle = setTimeout(loop, rand);
        };

        //
        // resetTimer: stops the timer if the user requests it
        //
        this.resetTimer = function () {
            clearTimeout(loopHandle);
            loopHandle = null;
        };

        //
        // startTimer: starts the timer if the user requests it
        //
        this.startTimer = function () {
            var initialTimeout = 500;
            loopHandle = setTimeout(loop, initialTimeout);
        };
    };

    //
    // Add our main event handlers to the button. use one button to track if the timer is on or off.
    // Also start a spinner on the button when needed.
    //
    $('#msgButton').click(function () {
        var btn = $(this);
        if (btn.attr("aria-pressed") === 'false') {
            btn.text('Stop Recieving Messages');
            btn.prepend('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
            messageApp.startTimer();
        } else {
            btn.text('Receive Messages');
            messageApp.resetTimer();
        }
    });
});