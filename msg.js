var loopHandle = null;

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function (msg) {
        toastr["info"](msg);
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

$(function () {
    $('#msgButton').click(function () {
        var btn = $(this);
        var btnText = btn.find('#buttonText');
        if (btn.hasClass('btn-success')) {
            btnText.text('Stop Messages');
            btn.removeClass('btn-success');
            btn.addClass('btn-danger');
            $('#running-indicator').addClass('fa-spin');
            loopHandle = setTimeout(loop, 500);
        } else {
            btnText.text('Start Messages');
            btn.removeClass('btn-danger');
            btn.addClass('btn-success');
            clearTimeout(loopHandle);
            $('#running-indicator').removeClass('fa-spin');
            loopHandle = null;
        }
    });

    $('#instructionsButton').click(function () {
        var icon = $('#instructionsIcon');
        if (icon.hasClass('fa-toggle-down')) {
            icon.removeClass('fa-toggle-down');
            icon.addClass('fa-toggle-up');
        } else {
            icon.addClass('fa-toggle-down');
            icon.removeClass('fa-toggle-up');
        }
    });
});
