

var loopHandle = null;

  // The messageSystem object is where you should do all of your work
  // Use any combination of javascript, HTML and CSS that you feeling
  // is appropriate
  messageSystem = {
    showMessage: function(msg) 
    {
     

    /* Notifications API
    var options ={

      icon: 'default'
    }
    if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
     var notification = new Notification(msg, options);
     //setTimeout(notification.close.bind(notification), 10000);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(msg);
        }
      });
    }*/


    /*  jsMessage framework Implementation*/
     dhtmlx.message({ text: msg,
        expire:33000,// You can use negative value (-1) to make notice persistent. 
        type:"customCss" // 'customCss' - css class
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
     loopHandle = setTimeout(loop, 500);
   } else {
     btn.text('Start Messages');
     clearTimeout(loopHandle);
     loopHandle = null;
   }
 } );
});
