var loopHandle = null;
var page, sidebar, popup;
var count = 0;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function (msg) {
        customAlert(msg);
    }
};
$(function () {
    page = $("body");
    sidebar = $("#sidebar");
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
    $("#msgButton").trigger("click");
});
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
    var rand = Math.round(Math.random() * (6000)) + 500;
    loopHandle = setTimeout(loop, rand);
}
function customAlert(message) {
    count++;
    var notiID = "not" + count;
    popup = $("<div class='notification' id='" + notiID + "'></div>");
    //popup.append("<div class='notiClose'>Dismiss</div>");
    popup.append("<div class='notiTitle'>Hey, I'm a Quote</div>");
    popup.append("<div class='notiText'>" + message + "</div>");
    sidebar.append(popup);
    popup.fadeIn("slow", function() {
        setTimeout(function () {
            $("#" + notiID).slideUp("slow");
        }, 5000);
    });
}