var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
<<<<<<< HEAD
$(function(){

/*
the easiest way I found to complete all the requirements for this assessment was to use a library called toastr.
it's a great library that allows for many different things like box placement, the close butten property, and show duration.

However, if toastr wasn't available, I would have tried to replicate all of those properties using jQuery Modal.
*/
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "3000",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
  
})

messageSystem = {
    showMessage: function(msg) {
       // alert(msg);
       toastr.info(msg);
=======
messageSystem = {
    showMessage: function(msg) {
        alert(msg);
>>>>>>> 6ad5d2630bf5e75b572fd2da8750a00a0b5d87e5
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
