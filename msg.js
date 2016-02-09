var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    simpleCounter: 0,
    messageTTL: 3000,

    showMessage: function(msg) {
        //alert(msg);
        var msgHtml = this.createElement(msg);
        $('.message-section').append(msgHtml);
    },

    createElement: function(msg) {
      var that = this;

      // in addition to creating the html need to also manage the lifecycle..so set that up here as well
      var msgID = 'message-' + this.simpleCounter.toString();
      var html = "<div id='" + msgID + "' class='message-box alert alert-danger'>" + msg + "</div>";

      // increment so the next time its ready to go
      this.simpleCounter = this.simpleCounter + 1;

      // messages only live for their TTL, after which we need to destroy them
      setTimeout(function(){
        that.destroyElement(msgID);
      }, this.messageTTL);

      return html;
    },

    destroyElement: function(msgID) {
      // remove from dom what the counter function tells us to
      $('#' + msgID).remove();
    },

    // maybe the user wants to clear all the current messages
    destoryElementAll: function() {
      $('.message-box').remove();
    },

    // allow a user to change the TTL (in seconds) via an html form element
    // only effects future messages not ones that already exist
    setTTL: function(ttl) {
      this.messageTTL = parseInt(ttl) * 1000;
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
