var page, sidebar, popup, msgButton, instructions, msgStatus;
var loopHandle = null;
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

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    numReceived: 0,
    closeMessage: function(msg) {
        $("#" + msg.id).fadeOut("fast");
    },
    showMessage: function (msg) {
        this.numReceived++;
        var msgID = "not" + this.numReceived;
        popup = $("<div class='msg' id='" + msgID + "'></div>").append(
            "<div class='msgClose' onclick='messageSystem.closeMessage(this.parentNode)'>Dismiss</div>" +
            "<div class='msgBody'>" +
            "<div class='msgTitle'>Hey, I'm a Quote</div>" +
            "<div class='msgText'>" + msg + "</div>" +
            "</div>");
        sidebar.append(popup);
        popup.fadeIn("slow", function() {
            setTimeout(function () {
                $("#" + msgID).slideUp("slow");
            }, 10000);
        });
        msgStatus.html("Messages Received: " + this.numReceived);
    },
    toggleMessages: function() {
        var btnTxt = msgButton.text();
        if (btnTxt === "Start Messages") {
            this.numReceived = 0;
            msgButton.text("Stop Messages").attr("class", "stop");
            loopHandle = setTimeout(loop, 500);
        } else {
            msgButton.text("Start Messages").attr("class", "start");
            msgStatus.html("Hit The Button To Get Started!");
            clearTimeout(loopHandle);
            loopHandle = null;
        }
    }
};
$(function () {
    page = $("body");
    instructions = $("#instructions");
    msgButton = $("#msgButton").addClass("start");
    sidebar = $("#sidebar");
    msgStatus = $("#msgStatus");

    msgButton.click(messageSystem.toggleMessages);
    //s$("#msgButton").trigger("click");
    /*setTimeout(function() {
        console.log("Done running");
        $("#msgButton").trigger("click");
    }, 10000);*/
});
function loop() {
    messageSystem.showMessage(_.sample(quotes));
    var rand = Math.round(Math.random() * (6000)) + 500;
    loopHandle = setTimeout(loop, rand);
}