var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate

messageSystem = {
    showMessage: function(msg) {
       
      // ********Add a close button and make it function*************
       $.notify.addStyle('close',{
          html: 
            "<div>" +
              "<div class='clearfix'>" +
                "<div class='title' data-notify-html='title'/>" +
                "<div class='buttons'>" +
                  "<button class='no'>&times;</button>" +
                "</div>"+
              "</div>" +
            "</div>"
       });
       //***Close alert when the x is clicked*******
       $(document).on('click', '.notifyjs-close-base .no', function() {
         $(this).trigger('notify-hide');
       });

  //*****Creat an alert, fade in and fade out after 3 seconds********
       $.notify({
          title:msg
        },
        {
          style: 'close',
          autoHide:true,
          autoHideDelay:3000,
          clickToHide:false,
          showAnimation:'fadeIn',
          hideAnimation:'fadeOut'

       });

       
        

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
           $('img').after("<p id='cancel'>Click again to stop alerts!</p>");
           loopHandle = setTimeout(loop, 500);
       } else {
           btn.text('Start Messages');
           $("#cancel").remove();
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});
