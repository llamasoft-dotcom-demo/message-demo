var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate

var tempId = 1;
var message_arr = [];
messageSystem = {
    showMessage: function (msg) {
        updateMsg(msg);
    },
    deleteMessage: function (id) {
        alert(id)
        $this = $("div[data-messageid='" + id + "']");
        $this.remove();
    },
    animateMessageFadeOut: function () {
        if (message_arr.length > 0) {
            setTimeout(function () {
                $(message_arr[0]).fadeOut(1000)
                message_arr.shift();
            }, 3000);
        }
    },
    addMessageToArray: function (id) {
        $this = "div[data-messageid='" + id + "']";
        message_arr.push($this);
    }
}




function updateMsg(msg) {
    html = '<div class="message-body" data-messageID="message-' + tempId + '">' +
                '<div class="message-header">' +
                     'Message from LLamasoft <span class="message-close" onclick="messageSystem.deleteMessage(id)" id="message-' + tempId + '">&times;</span>' +
                '</div>' +
                '<div class="message-content">' +
                    msg +
                '</div>' +
                '<div class="message-footer">' +
                    '&copy; LLamasoft' +
                '</div>' +
            '</div>';

    $msgContainer = $('.message-container');
    $msgContainer.prepend(html)
    messageSystem.addMessageToArray("message-" + tempId)
    messageSystem.animateMessageFadeOut("message-" + tempId)
    tempId++
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


$(function () {
    $('#msgButton').click(function () {
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
    });

    $(".message-close").click(function (e) {
        e.preventDefault();

        alert("j")

        return false;
    });
});
