var loopHandle = null;
var currentMessages = 0;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
        
        $('#messageSpace').append('<div id="newAlert" class="alert alert-success alert-dismissible" role="alert">' +
                msg +  
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+  
            '</div>')
            currentMessages++;
        var child = $('#messageSpace').children().last();
        child.delay(3000).fadeOut(500, 0, function()
        {
            child.alert('close');
        });
    }
}

$(document).ready(function()
{
    setStopped();
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

function setRunning()
{
    $('#messageStatus').text('Messages Running');
    if($('#messageStatus').hasClass('label-danger'))
        $('#messageStatus').removeClass('label-danger');
    $('#messageStatus').addClass('label-success');
}
function setStopped()
{
    var messageStatus = $('#messageStatus');
    messageStatus.text('Messages Stopped');
    if(messageStatus.hasClass('label-success'))
       messageStatus.addClass('label-success');
    messageStatus.addClass('label-danger');
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
           setRunning();
           loopHandle = setTimeout(loop, 500);
       } else {
           btn.text('Start Messages');
           setStopped();
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});
