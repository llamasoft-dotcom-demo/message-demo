var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate

messageSystem = {
    activeMessages: 0,
    // currentPosition is how far down the screen to draw current message
    currentPosition: 0,
    currentId: 0,

    showMessage: function(msg) {
        var that = this;

        var msgExists = true;

        that.activeMessages += 1;
        that.currentPosition += 1;
        that.currentId += 1;

        var elementId = that.currentId;
        var elementPosition = that.currentPosition;

        var currentPositionStr = that.currentPosition * 30 + "px";
        var buttonId = 'button' + elementId;

        var buttonStr = '<button type="button" id=' + buttonId + '>X</button>';
        var elt = '<div ' + 'id=' + that.currentId + '>' + msg + buttonStr + '</div>';

        $(elt).css({
            'position': 'absolute',
            'z-index': '10',
            'top': currentPositionStr,
            'right': '300px',
            'background-color': 'yellow'

        }).appendTo("body");

        $('#' + buttonId).click(function() {
            destroy();
        });

        var destroyWithFade = function() {
            $('#' + elementId).fadeOut(500);
            setTimeout(destroy, 500);
        }

        var destroy = function() {
            if (msgExists === true) {

                // if element is "lowest" on screen, decrement currentPosition
                if (elementPosition === that.currentPosition) {
                    that.currentPosition -= 1;
                }

                that.activeMessages -= 1;
                
                if (that.activeMessages === 0) {
                    that.currentPosition = 0;
                }
                
                $('#' + elementId).remove();
                msgExists = false;
            }
        }

        setTimeout(destroyWithFade, 3000);
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
   } );
});
