var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
        toastr.info(msg, null, messageSystem.toastOptions);
        Lockr.sadd("toastHistory", {"time": new Date().toLocaleString(), "message": msg});
    },
    showHistory: function(skip, take) {
        toastr.clear();
        var messages = Lockr.smembers("toastHistory").reverse();
        if (!_.isEmpty(messages)) {
            var length = _.size(messages);
            var header = "Showing messages " + (+skip + 1) + " to " + _.min([(+skip + +take), +length]) + "<br />" +
                "<button type=\"button\" id=\"hideBtn\" class=\"pull-left btn btn-primary\" onClick=\"toastr.clear()\">Hide History</button>"
            if (length > skip + take)
                header += "<button type=\"button\" id=\"nextBtn\" class=\"pull-right btn btn-primary\" onClick=\"messageSystem.showHistory(" + (+skip + +take) + "," + take + ")\">Show More</button>"
            else
                header += "<button type=\"button\" id=\"clearBtn\" class=\"pull-right btn btn-danger\" onClick=\"messageSystem.clearHistory()\">Clear History</button>"
            toastr.warning(header, length + " Total Messages Saved", messageSystem.historyOptions);
            _.each(_.first(_.rest(messages, skip), take), function(element){ toastr.info(element.message, element.time, messageSystem.historyOptions)});
        }
        else {
            toastr.warning("No Saved Messages", null, messageSystem.toastOptions);
        }
    },
    clearHistory: function() {
        toastr.clear();
        Lockr.flush();
    },
    toastOptions: {
        closeButton: true,
        newestOnTop: false,
        progressBar: true,
        timeOut: "3000",
        extendedTimeOut: "3000",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
    },
    historyOptions: {
        closeButton: false,
        newestOnTop: false,
        progressBar: false, 
        timeOut: "0",
        extendedTimeOut: "0",
        showMethod: "slideDown",
        hideMethod: "slideUp",
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


$(function() {
    $('#msgButton').click(function() {
        var btn = $(this);
        btn.toggleClass('active');
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
    $('#historyButton').click(function() {
        messageSystem.showHistory(0, 5);
    } );
});
