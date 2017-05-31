var loopHandle = null;

//
// Based on https://raw.githubusercontent.com/msroot/Notify.js/master/Notify.js 
//
Notify = function(text) {

  var time = '3000';    // 3 seconds
  var $container = $('#messages');  // for now, hard code the messages div/container.
  var fadeSpeed = 'slow';

  var html = $('<div class="alert alert-info alert-dismissable hide" role="alert">' + 
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    text + 
    '</div>');

  $container.append(html)

  // fade the message in
  html.removeClass('hide').hide().fadeIn(fadeSpeed)

  // make the closing process pretty
  function remove_notice() {
    html.stop().fadeOut(fadeSpeed).remove()
  }
  
  // auto-close the message box after a set amount of time.
  var timer =  setInterval(remove_notice, time);

  // if the user hovers over a message, don't clear it out from under them.
  $(html).hover(function(){
    clearInterval(timer);
  }, function(){
    timer = setInterval(remove_notice, time);
  });
}


// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
        Notify(msg);
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
           btn.removeClass('btn-success').addClass('btn-danger');
           loopHandle = setTimeout(loop, 500);
       } else {
           btn.text('Start Messages');
           btn.removeClass('btn-danger').addClass('btn-success');
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});

