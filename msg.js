var loopHandle = null;
// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    //added a counter to use to alert user of number of notifications
    counter: 0,
    //adds new message to message div and notification list
    showMessage: function(msg) {
        var newMessageBox = this.createnewActiveMessageement(msg);
        $('#messages').append(newMessageBox);
        var date = new Date();
        this.addToNotificationList(msg, date);
        $('#dot').text('').show();
        $('.glyphicon-bell').show();
    },
    //creates an individual div with a close button for each message and adds a click handler to close the message
    createnewActiveMessageement: function(msg) {
        allMessages = [];
        var newActiveMessage = $('<div class="notify info"></div>').text(msg);
        newActiveMessage.fadeIn().delay(3000).slideUp(function(){
            $(this).remove()
          });

        $('<button class="close"></button>').text('X').appendTo(newActiveMessage).on(
            'click', function() {
                newActiveMessage.remove();
            });
        //pushes the message div to an allMessages to be used to create a list of previous messages
        allMessages.push(newActiveMessage);
        return newActiveMessage;
    },
    //notification list includes all the previous messages that have appeared in the message system
    addToNotificationList: function(msg, date) {
        for (var i = 0; i < allMessages.length; i++) {
            //slice is required to take of the 'x' button that was appended to the newActiveMessage div
            var textWithoutX = allMessages[i].text().slice(0, (allMessages[i].text()
                .length - 1));
            var oldMessages = $('<div class="oldMessage"></div>').html(
                textWithoutX + '<br>' + '<div class="date">' + date + '</div>');
            $(oldMessages).appendTo('#oldMessages');
        }
    },
};

function showMsg() {
    quotes = ["What we've got here is failure to communicate.",
        'Go ahead, make my day.', "I've got a bad feeling about this.",
        "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
        'I find your lack of faith disturbing.',
        "You're gonna need a bigger boat.",
        'Tell Mike it was only business.',
        "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
    ];
    messageSystem.showMessage(_.sample(quotes));
}

function loop() {
    showMsg();
    var rand = Math.round(Math.random() * (6000 - 500)) + 500;
    //added an increment to keep track of the number of messages
    messageSystem.counter++;
    //#dot is the alert icon with counter nested
    $('#dot').text(messageSystem.counter);
    loopHandle = setTimeout(loop, rand);
}
$(function() {
    $('#msgButton').click(function() {
      $(this).toggleClass('btn-success btn-danger');
        var btn = $(this),
            btnTxt = btn.text();
        if (btnTxt === 'Start Messages') {
            btn.text('Stop Messages');
            //added an indicator that the messages are running
            $('#status').text('notifications running');
            //message counter and icon are shown when messages are running
            $('#dot').show();
            $('.glyphicon-bell').show();
            loopHandle = setTimeout(loop, 500);
        } else {
            btn.text('Start Messages');
            //when mesages are stopped, message status is cleared
            $('#status').text('');
            clearTimeout(loopHandle);
            loopHandle = null;
        }

    });
});

//added a clear button to remove existing messages from the view and from the old message list
//when clear is clicked, counter is reset
$(function() {
    $('#clear').click(function() {
        allMessages = [];
        clearTimeout(loopHandle);
        loopHandle = null;
        $('#messages').text('');
        $('#status').text('');
        $('#msgButton').text('Start Messages');
        $('#dot').text('').hide();
        $('.glyphicon-bell').hide();
        $('#oldMessages').hide();
        $('#oldMessages').text('');
        messageSystem.counter = 0;
    });
});
//Old messages are toggled when the alert icon is clicked
$(function() {
    $('#dot').click(function() {
        $('#oldMessages').toggle();
    });
});

//when the div that holds old messages is clicked, it is removed and the counter is reset
$(function() {
    $('#oldMessages').click(function() {
        $('#dot').text('').hide();
        $('.glyphicon-bell').hide();
        $(this).fadeOut();
        messageSystem.counter = 0;
    });
});
