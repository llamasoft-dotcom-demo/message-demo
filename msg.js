var loopHandle = null;

// Reference to the the currently selected message color
let currentColor = "#A9A9A9";

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
const messageSystem = {
    
    /**
     * Shows the provided message
     */
    showMessage: function(msg) {
        let message = this.createMessageComponent(msg);
        $(".message-container").append(message);

        // After 3 seconds, fade out and remove the message
        setTimeout(function() {
            message.fadeOut(300, function() {
                $(this).remove();
            })
        }, 3000);
    },

    /**
     * Creates an HTML component given a Message object
     */
    createMessageComponent : function(msg) {
       let msgComponent = $('<div/>', {class: 'media message', style: "background-color: " + currentColor}).append(
           $('<div/>', {class: 'media-left' }).append(
               $('<span/>', {class: 'message-icon glyphicon glyphicon-comment'})
           )
        )
        .append(
            $('<div/>', {class: 'media-body'}).append(
                $('<div/>', {class: 'media-heading', text: msg.getPerson()})
            )
            .append(msg.getMessage())
        )
        .append(
            $('<span/>', {class: 'close-message-button glyphicon glyphicon-remove'}).click(function() {
                msgComponent.remove(); // Remove the message is the close button is clicked
            })
        );
        
        return msgComponent;
    }
}

/**
 * An object that represents a message to be shown.
 */
function Message(message, person) {
    return {
        getMessage: function() {
            return message;
        },
        getPerson: function() {
            return person;
        }
    };
}

function showMsg() {
    let quotes = [
    new Message("What we've got here is failure to communicate.", "Captian"),
    new Message("Go ahead, make my day.", "Harry Callahan"),
    new Message("I've got a bad feeling about this.",  "Obi-Wan Kenobi"),
    new Message("I don't know half of you half as well as I should like; and I like less than " +
        "half of you half as well as you deserve.", "Bilbo Baggins"),
    new Message("I find your lack of faith disturbing.", "Darth Vader"),
    new Message("You're gonna need a bigger boat.", " Martin Brody"),
    new Message("Tell Mike it was only business.", "Sal Tessio"),
    new Message("I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum.", "John Nada")
    ];
    messageSystem.showMessage(_.sample(quotes));
    
}

function loop() {
    showMsg();
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    loopHandle = setTimeout(loop, rand);
}

/**
 * Component that can be used to change the color of the messages
 */
function ColorComponent(hex) {
    return $("<div/>", {class: "color-square", style: "background-color: " + hex, color: hex}).click(function(){
        currentColor = this.getAttribute("color");
        $("#color-picker").modal("toggle"); // Dismiss the modal window
    });
}


$(function() {
   $('#msgButton').click(function() {
        var btn = $(this),
        btnTxt = btn.text();
       if (btnTxt === 'Start Messages') {
           btn.text('Stop Messages');
           btn.addClass('btn-danger');
           btn.removeClass('btn-success');
           loopHandle = setTimeout(loop, 500);
       } else {
           btn.text('Start Messages');
           btn.removeClass('btn-danger');
           btn.addClass('btn-success');
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );

   // Add some new color options
   $(".modal-body").append(new ColorComponent("#D3B53D"));
   $(".modal-body").append(new ColorComponent("#DA621E"));
   $(".modal-body").append(new ColorComponent("#AD2A1A"));
   $(".modal-body").append(new ColorComponent("#93A661"));
   $(".modal-body").append(new ColorComponent("#1287A8"));
   $(".modal-body").append(new ColorComponent("#0D3D56"));

});
