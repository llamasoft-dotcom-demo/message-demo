var loopHandle = null;
var count = 0;
// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
        $(".top").css("display", "block");
        var str = "<div class=\"alert alert-info\" role=\"alert\" id="+count+">";
        str += msg;
        str += "<button type=\"button\" class=\"btn btn-primary\" id="+count+"><strong>X</strong></button></div>";

        $(".top").append(str);
        $("#"+count).delay(3000).fadeOut(1600);

        document.getElementById(count).addEventListener('click', function(e) {
            e.preventDefault();
            this.style.display = 'none';
            }, false);

        count += 1;
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
   $(".top").css("display", "none");
   $('#msgButton').click(function() {
      var btn = $(this),
      btnTxt = btn.text();
       if (btnTxt === 'Start Messages') {
           btn.text("Stop Messages");
           document.getElementById("msgButton").className = "btn btn-danger";
           loopHandle = setTimeout(loop, 500);
           $(".top").append(str);
           $("#"+count).delay(3000).fadeOut(1600);

       } else {
           document.getElementById("msgButton").className = "btn btn-success";
           btn.text("Start Messages");
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});
