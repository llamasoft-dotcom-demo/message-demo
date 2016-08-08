var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
      //4. creates an alert with the text of the message
      var notificationType = ["calendar", "reminder", "error", "list", "mail"];
      var randType = notificationType[(Math.floor(Math.random() * notificationType.length))];
      $('<div class="' + randType + '"><img src="images/' + randType + '.png" class="icon"><img src="images/x.png" class="x"><h3 class="msg-title">New ' + randType + ' alert:</h3><p class="msg-text">' + msg +'</p>' +'</div>').appendTo('#messages').slideDown('fast');
      $('#messages div:last-child').delay(3000).slideUp('slow');

      $('.x').hover(function(){
        $(this).parent().css("opacity","0.25");
        }, function(){
        $(this).parent().css("opacity","1");
      });
      $('.x').on('click',function(){
        $(this).parent().hide();
      });

      $('#messages').children().off().hover(function(){
        // var currColor = $(this).css("background-color");
        // var lastComma = currColor.lastIndexOf(',');
        // var newColor = currColor.substring(0, lastComma+1) + " 1)";
        // $(this).css("background-color", newColor);
        $(this).toggleClass('hovered');        
      }, function(){
        // var currColor = $(this).css("background-color")
        // var rgbAColor = currColor.split('(')
        // var removed = rgbAColor.splice(1, 0, "a(");
        // rgbAColor = rgbAColor.join('');
        // var fixColor = rgbAColor.substring(0, rgbAColor.length-1) + ", 1)";
        // var lastComma = fixColor.lastIndexOf(',');
        // var newColor = fixColor.substring(0, lastComma+1) + " 0.5)";
        // $(this).css("background-color", newColor);
        $(this).toggleClass('hovered');
      });

      $('.icon').off().one('click', function(){
        $(this).parent().clone().appendTo('#saved-reminders').width('275px').addClass('saved').removeClass('hovered').stop().off();
      });
    }
}




function showMsg() {
    quotes = [
    "We should definitely hire Dave Brunetti. That guy would be an AMAZING fit for our team!",
    "What we've got here is failure to communicate.",
    'Go ahead, make my day.',
    "I've got a bad feeling about this.",
    "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
    "I find your lack of faith disturbing.",
    "You're gonna need a bigger boat.",
    "Tell Mike it was only business.",
    "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
    ];
    //3. passes one of these quotes as the argument in messageSystem.showMessage and calls it
    messageSystem.showMessage(_.sample(quotes));
    
}

function loop() {
    //2. call showMsg
    showMsg();
    //6. ...which sets a random amount of time between 1/2 second and 3 seconds...
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    //...and calls itself again after rand milliseconds (go back to #2 and repeat until...)
    loopHandle = setTimeout(loop, rand);
}


$(function() {
  //1. first they click the button
   $('#message-reminder').hide();
   $('#msgButton').on('click',function() {
      $('#message-reminder').toggle();
       var btn = $(this),
      btnTxt = btn.text();
      //switch text between the two options
      //if the button starts the messages...
       if (btnTxt === 'Start Messages') {
           btn.text('Stop Messages');
           //...loophandle changes from null to...
           loopHandle = setTimeout(loop, 500);
           //which calls the loop function after 1/2 second
       } else {
        //7. ...the button gets clicked again, which breaks the cycle!
           btn.text('Start Messages');
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   });
});
