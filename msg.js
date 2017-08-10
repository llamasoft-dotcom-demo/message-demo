var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
        // code to get the messages on the top of the window and pass the next messages below the previous one 
          let msghtml = this.messageAlert(msg);
          $('#msgalert').append(msghtml);
        //   adding code for the msg fade delay by 3sec
        setTimeout(function() {
           msghtml.fadeOut(3000, function() {
                $(this).remove();
            })
        },0);
    },
        // updated the close function
    messageAlert: function(msg){
        let msgtag = $('<div/>',{class: 'alert alert-success alert-dismissable'}).append($('<a/>',{href:'#', class:'close','data-dismiss':'alert', 'aria-label':'close',text:'x'})).append(msg)
        return msgtag;
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
