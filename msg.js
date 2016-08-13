var loopHandle = null,
FADEOUT_DELAY = 3000;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
        
    delay : 0,
    counter : 0,
    messages : null,
    
    init : function(delay) {
        messageSystem.delay = delay;
        messageSystem.counter = 0;
        messageSystem.messages = new Array();
        
        messageSystem.initUI();
        
    },

    showMessage : function(text) {
        // add new message object
        var msg = {
            id : "msg-"+ messageSystem.counter,
            index : messageSystem.counter,
            pinned : false,
            text : text,
        }
        messageSystem.counter++;
        messageSystem.messages.push(msg);
        
        // create the ui
        messageSystem.addMessageToUI(msg);
        
        // schedule form fade out
        messageSystem.removeMessageFromUI(msg);
    },
    
    
    removeMessage : function(id) {
        // find and remove the message
        messageSystem.messages = _.without(messageSystem.messages, _.findWhere(messageSystem.messages, {
          id: id
        }));    
    },

    getMessage : function(id) {
        return  _.findWhere(messageSystem.messages, {
          id: id
        });   
    },
    
    togglePinMessage : function(id) {
        var msg = messageSystem.getMessage(id);  
        if (msg != undefined) {
            msg.pinned = !msg.pinned;
        }
    },
    
    initUI: function() {
        
        $( "#msg-panel" ).on( "click", ".close", function() {
            var $alert = $(this).parent();
            var id = $alert.attr("id")
            messageSystem.removeMessage(id);
            $(this).parent().remove();
        });    
        
        $( "#msg-panel" ).on( "click", ".pin", function() {
            var $alert = $(this).parent();
            var id = $alert.attr("id")
            var msg = messageSystem.getMessage(id);  
            // remove, if the user removes the pin
            if (msg != undefined && msg.pinned) {
                messageSystem.removeMessage(msg.id);
                $(this).parent().remove();
            }         
            messageSystem.togglePinMessage(id);
            $(this).find(".glyphicon").toggleClass("glyphicon-star-empty");
            $(this).find(".glyphicon").toggleClass("glyphicon-star");
        });         
    },
    
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
            }).fadeOut("slow");
    },
   
    addMessageToUI: function(msg) {
        $template = $("#message-template").clone();
        $template.attr("id", msg.id);
        $template.find(".message-text").html(msg.text);
        $template.appendTo(".panel-body");
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
    var rand = Math.round(Math.random() * (FADEOUT_DELAY - 500)) + 500;
    loopHandle = setTimeout(loop, rand);
}

$(function() {
    
    messageSystem.init(FADEOUT_DELAY);
    
    $('#msgButton').click(function() {
        var btn = $(this), btnTxt = btn.text();
        if (btnTxt === 'Start Messages') {
            btn.text('Stop Messages');
            btn.addClass("btn-danger");
            btn.removeClass("btn-success");
            loopHandle = setTimeout(loop, 500);
        } else {
            btn.text('Start Messages');
            btn.removeClass("btn-danger");
            btn.addClass("btn-success");
            clearTimeout(loopHandle);
            loopHandle = null;
        }
    });
    
    
});
