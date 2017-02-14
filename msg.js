var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {

    /**
    * Shows a new message by adding it to the message container.
    */
    showMessage: function(msg) {
        var messageElement = this.createMessageBox(msg);
        $(".messagesContainer").append(messageElement);
    },

    /**
    * Removes the provided messageElement from the DOM.
    */
    closeMessage: function(messageElement) {
      messageElement.remove();
    },

    /**
    * Creates and returns an message box element that is ready to be displayed.
    * Also handles setting up events for auto dismissal and manual closing.
    */
    createMessageBox: function(msg) {
      let messageElement = $("<div/>").addClass("messageBox").text(msg);
      let closeButton = $("<div/>").addClass("closeButton").text("X");
      let barTimer = "<div class='bar-timer'>" +
                      "<div class='bar-inner'></div>" +
                    "</div>"
      messageElement.append([closeButton, barTimer]);

      closeButton.click(function() {
        this.closeMessage(messageElement);
      }.bind(this));

      //After 3 seconds fade out the message and remove it from the DOM
      setTimeout(function() {
       messageElement.fadeOut('fast', function() {
          messageElement.remove();
       });
      }, 3000);

      return messageElement;
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
