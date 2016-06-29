var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate

var messageSystem = {
    showMessage: function (msg) {
        
//      Append message to page
        $('.message').append('<div class="randMsg"><button class="remove"> X </button><p>' + msg + '</p></div>');
                
//      Remove message on button click       
        $('button.remove').on('click', function(){
 	      $(this).parent().remove();
        });
        
//      Fadeout and removes message after 3 seconds
        $('.randMsg').fadeOut(3000, function(){
            $(this).remove();
        });
    }
};


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
    $('.msgButton').click(function() {
        $(this).toggleClass("stop");
        var btn = $(this),
            btnTxt = btn.text();
        if (btnTxt === 'Start LLama Messages') {
            btn.text('Stop LLama Messages');
            $('<p class="note">The LLama is talking<span>.</span><span>.</span><span>.</span></p>').appendTo('.msgNotification');
            loopHandle = setTimeout(loop, 500);
        } else {
            btn.text('Start LLama Messages');
            $('p.note').remove();
            clearTimeout(loopHandle);
            loopHandle = null;
        }
    });
});
