/// <reference path="msg.html" />

var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feel
// is appropriate
messageSystem = {

    initialize: function () {
        if ($("div.msg_wrapper").length === 0) { //create the message list if it doesn't exist
            var msg_div_wrapper = document.createElement("div");
            $(msg_div_wrapper).append("<div class='msg_header'>NOTIFICATIONS</div><div class='msg_list'></div>")
            $(msg_div_wrapper).addClass("msg_wrapper");
            var msg_list_controls = document.createElement("div");
            $(msg_list_controls).addClass("list_ctrls");
            var msg_list_sort = $("<div class='msg_sort ascending' title='Sort asc/desc'><i class='fa fa-sort-asc'></i><i class='fa fa-sort-desc'></i></div>");
            $(msg_list_sort).click(function () {    //control toggles sort of messages (oldest at top or newest at top)
                $(this).toggleClass("ascending");
                var msgs = $("div.msg");
                msgs.detach();
                msgs.sort(function (a, b) {
                    if (messageSystem.sort_ascending === true) {
                        return ($(b).data("sequence") - $(a).data("sequence"))
                    }
                    else {
                        return ($(a).data("sequence") - $(b).data("sequence"))
                    };
                });
                $("div.msg_list").append(msgs);
                messageSystem.sort_ascending = !messageSystem.sort_ascending;
            });
            var msg_history_toggle = $("<div class='msg_history' title='Show/Hide History'><i class='fa fa-history'></i></div>");
            $(msg_history_toggle).click(function () {   //control shows/hides all messages
                $("div.msg.hidden").fadeToggle("slow");
                $(this).toggleClass("open");
            });
            var msg_container_toggle = $("<div class='msg_container' title='Toggle Container'><i class='fa fa-arrows-h'></i></div>");
            $(msg_container_toggle).click(function () { //control opens dedicated in-page container to avoid convering content
                $("div.msg_wrapper").toggleClass("open");
                $(this).toggleClass("open");
                $("body").toggleClass("messages");
            });
            var bullhorn = $("<div class='bullhorn' title='Toggle Messages'><i class='fa fa-bullhorn'></i></div>");
            $(bullhorn).click(function () {             //control turns messages on/off and indicates status
                $('#msgButton').click();
            });
            $(msg_list_controls).append(bullhorn);
            $(msg_list_controls).append(msg_container_toggle);
            $(msg_list_controls).append(msg_history_toggle);
            $(msg_list_controls).append(msg_list_sort);
            $("body").append(msg_list_controls);
            $("body").append(msg_div_wrapper);
        }
    },

    showMessage: function(msg) {    //create web notification if using, else in-page message
        if (messageSystem.notifyMe(msg) === true) {
            messageSystem.spawnNotification(msg, "Llamasoft Test Message");
        }
        else if (messageSystem.notifyMe(msg) === false) {
            var new_msg = messageSystem.makeMsgDiv();
            $(new_msg).find("div.msg_text").text(msg);
            if (messageSystem.sort_ascending === false) {
                //$(new_msg).hide().insertAfter("div.msg_header").slideDown('fast');
                $(new_msg).hide().prependTo("div.msg_list").slideDown('fast');
            }
            else {
                $("div.msg_list").append(new_msg);
            }
            messageSystem.fadeMsg(new_msg);
        }
    },

    fadeMsg: function (msg) {   //handles the fadeOut, checking if pinned, user is hovering over message, or full history is open
        setTimeout(function () {
            if (!$(msg).find("i.fa-thumb-tack").hasClass("pinned") && !$(msg).is(":hover")) { // if not pinned, user not hovering then fade out
                if ($("div.msg_history.open").length === 0)
                {
                    $(msg).fadeOut("slow");
                }
                $(msg).addClass("hidden");
            }
            else if (!$(msg).find("i.fa-thumb-tack").hasClass("pinned") && //if not pinned, user is hovering, check again in 3s
                $(msg).is(":hover")) {
                messageSystem.fadeMsg(msg);
            }
        }, 3000);
    },

    toggleStatus: function (current_status) {   //turn on/off messaging
        if (current_status === true) {
            $("div.bullhorn").addClass("msg_on");
        }
        else {
            $("div.bullhorn").removeClass("msg_on");
        }
    },

    makeMsgDiv: function () {               //make and return empty message div
        var message_div = document.createElement("div");
        $(message_div).addClass("msg");
        var message_body = document.createElement("div");
        $(message_body).addClass("msg_body");
        var message_icon = document.createElement("div");
        $(message_icon).addClass("msg_icon");
        $(message_icon).append("<img src='/Images/llamasoft-squarelogo.png' />");
        var message_text = document.createElement("div");
        $(message_text).addClass("msg_text");
        var timestamp = new Date();
        var timestamp_div = $("<div>" + timestamp.toDateString() + ", " + messageSystem.format_time(timestamp) + " " + "</div>");
        $(timestamp_div).addClass("msg_datetime");
        var close_button = $("<i class='fa fa-times'></i>");
        var pin_button = $("<i class='fa fa-thumb-tack'></i>");
        $(close_button).click(
            function () {
                $(this).closest("div.msg").hide();
            }
        );
        $(pin_button).click(    //set pin button functionality
            function () {
                $(this).toggleClass("pinned");
                $(this).toggleClass("fa-rotate-90");
                if ($(this).hasClass("pinned")) {
                    $(this).closest("div.msg").stop();  //stops fadeOut if in progress
                    $(this).closest("div.msg").fadeIn();
                    $(this).closest("div.msg").removeClass("hidden");
                    $(this).siblings("i.fa-times").hide();
                }
                else {
                    $(this).closest("div.msg").addClass("hidden");
                    if ($("div.msg_history.open").length === 0) {
                        $(this).closest("div.msg").fadeOut("slow");
                    }
                }
            }
        );
        
        var controls_div = document.createElement("div");
        $(controls_div).addClass("msg_controls");
        $(controls_div).append(close_button);
        $(controls_div).append(pin_button);
        $(message_div).append(message_icon);
        $(message_body).append(message_text);
        $(message_body).append(timestamp_div);
        $(message_div).append(message_body);
        $(message_div).append(controls_div);
        messageSystem.msg_counter++;
        $(message_div).data("sequence", messageSystem.msg_counter);
        return message_div;
    },

    format_time: function (d) { //for tiemstamp at bottom of messages
        var a_p = "";
        var curr_hour = d.getHours();
        if (curr_hour < 12) {
            a_p = "AM";
        }
        else {
            a_p = "PM";
        }

        if (curr_hour == 0) {
            curr_hour = 12;
        }
        if (curr_hour > 12) {
            curr_hour = curr_hour - 12;
        }

        var curr_min = d.getMinutes();
        curr_min = curr_min + "";
        if (curr_min.length == 1) {
            curr_min = "0" + curr_min;
        }
        return (curr_hour + ":" + curr_min + " " + a_p);
    },

    notifyMe: function (msg) {  //determine whether to use web notifications
        if (messageSystem.use_web_notifications == null) {
            var useWebNotifications = null;
            // check if the browser supports notifications
            if (!("Notification" in window)) {
                //this browser doesn't support notifications.
                useWebNotifications = false;
            }

                // check whether notification permissions have already been granted
            else if (Notification.permission === "granted") {
                // If it's okay set var to 'true'
                if (confirm("This browser supports web notifications. Select OK to use them or Cancel to use in-page messaging.")) {
                    if ($("div.msg_container.open").length > 0) {  //close msg container if open
                        $("div.msg_container.open").click();
                    }
                    useWebNotifications = true;
                }
                else {
                    useWebNotifications = false;
                }
            }

                // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    // If the user accepts, let's set var to 'true' and create notifications
                    if (permission === "granted") {
                        if (confirm("This browser supports web notifications. Use them?")) {
                            if ($("div.msg_container.open").length > 0) {   //close msg container if open
                                $("div.msg_container.open").click();
                            }
                            useWebNotifications = true;
                        }
                        else {
                            useWebNotifications = false;
                        }
                    }
                });
            }
            else {
                useWebNotifications = false;
            }
            messageSystem.use_web_notifications = useWebNotifications;
        }
        
        return messageSystem.use_web_notifications;
    },

    use_web_notifications: null,    //property that controls whether to use web notifications

    sort_ascending: true,           //controls whether msgs appear in ascending order (oldest at top)

    msg_counter: 0,

    spawnNotification: function (theBody, theTitle) {
            var options = {
                body: theBody,
                icon: "http://bigbytes.mobyus.com/Images/llamasoft-squarelogo.png"
            }
            var n = new Notification(theTitle, options);
            setTimeout(n.close.bind(n), 3000);
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


$(function () {
    messageSystem.initialize();
   $('#msgButton').click(function() {
       var btn = $(this),
      btnTxt = btn.text();
       if (btnTxt === 'Start Messages') {
           messageSystem.toggleStatus(true);
           btn.text('Stop Messages');
           loopHandle = setTimeout(loop, 500);
       } else {
           messageSystem.toggleStatus(false);
           btn.text('Start Messages');
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});
