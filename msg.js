var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
        $("dialog").append(
            $('<div class="message"> <div class="exitMsg">X</div> ' + msg + '</div>')
                .hide()
                .fadeIn()
                .delay(3000)
                .fadeOut()
                .detach()

        );
    },
    showMessage: function(msg, type) {
        $("dialog").append(
            $('<div class="message '+ type +'-msg "> <div class="exitMsg">X</div> ' + msg + '</div>')
                .hide()
                .fadeIn()
                .delay(3000)
                .fadeOut()
                .detach()

        );
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
   $('.spinner').hide();

   $('#msgButton').click(function() {
       var btn = $(this),
      btnTxt = btn.text();
       if (btnTxt === 'Start Messages') {
           btn.text('Stop Messages');
           $('#msgButton').css('background-color', "#924141");
           $('.spinner').fadeIn();
           loopHandle = setTimeout(loop, 500);
       } else {
           btn.text('Start Messages');
           $('#msgButton').css('background-color', '#419244');
           $('.spinner').fadeOut();
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );

   $('dialog').on('click', '.exitMsg', function(){
       $(this).parent().detach();
    });
});
