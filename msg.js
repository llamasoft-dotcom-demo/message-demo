var alertsAreEnabled = false;
var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feel is appropriate
messageSystem = {
    interval: 500,
    isEnabled: false,
    showMessage: function(msg) {
        toastr[msg[1]](msg[0]);
    },
    start: function() {
        if (!this.isEnabled) {
            loopHandle = setTimeout(loop, this.interval);

            this.isEnabled = true;
        }
    },
    stop: function() {
        if (this.isEnabled) {
            clearTimeout(loopHandle);
            loopHandle = null;

            this.isEnabled = false;
        }
    }
}

function showMsg() {
    quotes = [
        ["What we've got here is failure to communicate.", "error"],
        ["Go ahead, make my day.", "warning"],
        ["I've got a bad feeling about this.", "warning"],
        ["I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.", "info"],
        ["I find your lack of faith disturbing.", "info"],
        ["You're gonna need a bigger boat.", "warning"],
        ["Tell Mike it was only business.", "info"],
        ["I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum.", "warning"],
        ["Winning isn't everything; but wanting to win is!", "success"] 
    ];

    messageSystem.showMessage(_.sample(quotes));
}

function loop() {
    showMsg();

    var rand = Math.round(Math.random() * (3000 - 500)) + 500;

    loopHandle = setTimeout(loop, rand);
}

$(function() {
    // Configure toastr
    toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "timeOut": "3000",
    }

    $("#msgButton").click(function() {
        if (alertsAreEnabled) {
            messageSystem.stop();

            alertsAreEnabled = false;
        } else {
            messageSystem.start();

            alertsAreEnabled = true;
        }
    });

    var clearButton = $("#clearButton");

    clearButton.click(function() {
        toastr.remove();
    });
    clearButton.toggle(false);

    $("#enableMessagesCheckbox").change(function() {
        var isChecked = $(this).is(":checked");

        if (isChecked) {
            messageSystem.start();
        } else {
            messageSystem.stop();
        }

        $("#clearButton").toggle();
    });
});
