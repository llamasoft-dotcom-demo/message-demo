var messageGenerationLoopHandle = null;

toastr.options = {
    "closeButton": true,
    "newestOnTop": false,
    "timeOut": "3000" // milliseconds
};

messageSystem = {
    showMessage: function(msg) {
        toastr.info(msg);
    },

    quotes: [
        "What we've got here is failure to communicate.",
        "Go ahead, make my day.",
        "I've got a bad feeling about this.",
        "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
        "I find your lack of faith disturbing.",
        "You're gonna need a bigger boat.",
        "Tell Mike it was only business.",
        "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
    ]
};

function showRandomMessage() {
    messageSystem.showMessage(_.sample(messageSystem.quotes));
}

function messageGenerationLoop() {
    showRandomMessage();

    var randomLoopInterval = Math.round(Math.random() * (3000 - 500)) + 500;
    messageGenerationLoopHandle = setTimeout(messageGenerationLoop, randomLoopInterval);
}

$(function() {
    $("#generatingMessages").hide();

    $('#msgButton').click(function() {
        var $messageButton = $(this);
        var $generatingMessagesIndicator = $("#generatingMessages");
        var messageButtonText = $messageButton.text();

        if (messageButtonText === 'Start Messages') {
            $messageButton.text('Stop Messages');
            messageGenerationLoopHandle = setTimeout(messageGenerationLoop, 500);
            $generatingMessagesIndicator.show();
        } else {
            $messageButton.text('Start Messages');
            clearTimeout(messageGenerationLoopHandle);
            messageGenerationLoopHandle = null;
            $generatingMessagesIndicator.hide();
        }
    } );
});
