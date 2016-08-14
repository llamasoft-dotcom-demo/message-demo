var loopHandle = null,
FADEOUT_DELAY = 3000;
FADEOUT_VARIATION = 500;

/**
 * This object handles incoming messages and displays them in the UI. 
 * On startup please call the init() method. New messages can be added 
 * by calling showMessage().
 */
messageSystem = {
        
    delay : -1,
    counter : -1,
    messages : null,
    
    /**
     * Initializes the object.
     * @param {int} delay - Millis before removing an message.
     */
    init : function(delay) {
        messageSystem.delay = delay;
        messageSystem.counter = 0;
        messageSystem.messages = new Array();
        
        messageSystem.initUI();
        
    },

    /**
     * Adds a new message.
     * @param {string} text - Content of the new message.
     * @param {boolean} custom - Marks a new message as manually generated .
     */
    showMessage : function(text, custom) {
        // add new message object
        var msg = {
            id : "msg-"+ messageSystem.counter,
            index : messageSystem.counter,
            pinned : false,
            custom : custom,
            text : text,
        }
        messageSystem.counter++;
        messageSystem.messages.push(msg);
        
        // create the ui
        messageSystem.addMessageToUI(msg);
        
        // schedule form fade out
        messageSystem.removeMessageFromUI(msg);
    },
    
    /**
     * Removes a message from the object but not from the UI.
     * @param {string} id - Id of the message.
     */
    removeMessage : function(id) {
        // find and remove the message
        messageSystem.messages = _.without(messageSystem.messages, _.findWhere(messageSystem.messages, {
          id: id
        }));    
    },

    /**
     * Returns a message for the given id.
     * @param {string} id - Id of the message.
     */
    getMessage : function(id) {
        return  _.findWhere(messageSystem.messages, {
          id: id
        });   
    },

    /**
     * Toggles the pinned property of a message.
     * @param {string} id - Id of the message.
     */
    togglePinMessage : function(id) {
        var msg = messageSystem.getMessage(id);  
        if (msg != undefined) {
            msg.pinned = !msg.pinned;
        }
    },
    
    
    // UI methods go below the line
    
    
    /**
     * Adds the click listeners to the UI.
     */
    initUI: function() {
        
        $( "#msg-panel" ).on( "click", ".delete", function() {
            var $alert = $(this).parent();
            var id = $alert.attr("id")
            messageSystem.removeMessage(id);
            $(this).parent().remove();
        });    
        
        $( "#msg-panel" ).on( "click", ".pin", function() {
            var $alert = $(this).parent();
            var id = $alert.attr("id")
            var msg = messageSystem.getMessage(id);  
            // remove, if the user unchecks the pin
            if (msg != undefined && msg.pinned) {
                messageSystem.removeMessage(msg.id);
                $(this).parent().remove();
            }         
            messageSystem.togglePinMessage(id);
            $(this).find(".glyphicon").toggleClass("glyphicon-star-empty");
            $(this).find(".glyphicon").toggleClass("glyphicon-star");
        });         
    },
    
    /**
     * Triggers UI fade out for the given message.
     * @param {object} message - The message to be removed.
     */
    removeMessageFromUI : function(msg) {
        $("#"+msg.id)
            .delay(messageSystem.delay)
            .queue(function() {
                // only continue with non pinned msg
                if (!msg.pinned) {
                    // remove from list
                    messageSystem.removeMessage(msg.id);
                    // trigger next queue
                    $(this).dequeue();
                } 
            }).fadeOut("slow",function() { 
                $(this).remove();
            });
    },
    
    
    /**
     * Adds a new message to the UI using the a template markup.
     * @param {object} message - The message to be added.
     */   
    addMessageToUI: function(msg) {
        $template = $("#message-template").clone();
        $template.attr("id", msg.id);
        $template.find(".message-text").html(msg.text);
        $template.appendTo("#msg-panel .panel-body");
        if (msg.custom) {
            $template.removeClass("alert-info");
            $template.addClass("alert-success");
        }
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
            "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum." ];
    messageSystem.showMessage(_.sample(quotes));

}

function loop() {
    showMsg();
    var rand = Math.round(Math.random() * (FADEOUT_DELAY - FADEOUT_VARIATION)) + FADEOUT_VARIATION;
    loopHandle = setTimeout(loop, rand);
}

$(function() {
    
    messageSystem.init(FADEOUT_DELAY);
    
    $('#msgButton').click(function() {
        var btn = $(this), btnTxt = btn.text();
        if (btnTxt === 'Start Messages') {
            btn.text('Stop Messages');
            loopHandle = setTimeout(loop, FADEOUT_VARIATION);
        } else {
            btn.text('Start Messages');
            clearTimeout(loopHandle);
            loopHandle = null;
        }
        btn.toggleClass("btn-danger");
        btn.toggleClass("btn-success");
        $(".progress").toggleClass("hidden");
    });
    
    
    $('#addButton').click(function(e) {
        var $input = $("#messageForm #text");
        messageSystem.showMessage($input.val(), true);
        $input.val("");
    });    
    
});
