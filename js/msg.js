var loopHandle = null;
var quoteCount = 0;
var msgStatus;

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

function loop() {
    messageSystem.showMessage(_.sample(quotes));
    loopHandle = setTimeout(loop, 3000);
}

messageSystem = {

    showMessage: function(msg) {

        quoteCount++;
        toastr["info"](msg)

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "3000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        document.getElementById("msgWindow").innerHTML = "You have received  " + quoteCount + " message(s)!";
    }
}

$(function() {
    $('#msgButton').click(function() {
        var btn = $(this),
            btnTxt = btn.text();
        if (btnTxt === 'Start Messages') {
            btn.text('Stop Messages');
            loop();
            document.getElementById("stopLight").src = "images/GreenLight.png";
        } else {
            btn.text('Start Messages');
            clearTimeout(loopHandle);
            loopHandle = null;
            quoteCount = 0;
            document.getElementById("msgWindow").innerHTML = "Start the messages!";
            document.getElementById("stopLight").src = "images/RedLight.png";
        }
    });
});