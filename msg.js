// Randomizes the quote selection
function getQuote() {
  var randomNumber = Math.floor((Math.random() * 8));
  console.log(randomNumber);
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

  var randomQuote = quotes[randomNumber];
  document.getElementById("ourRandomQuote").innerHTML = randomQuote;
}

// Onload will create a new pop-up with random quote
$(document).ready(function() {
  new popup($("#popup_box"), $("#container")).load();

});

// Creates pop-up
function popup(popup, container) {

  var thisPopup = this,
    timer,
    counter = 3,
    countDown = $("#countDown").text(counter.toString());

  thisPopup.load = function() {

    container.animate({
      "opacity": "0.3"
    }, 250, function() {
      popup.fadeIn("250");
    });

    container.off("click").on("click", function() {
      thisPopup.unload();
    });

    $('#popupBoxClose').off("click").on("click", function() {
      thisPopup.unload();
    });

    timer = setInterval(function() {
      counter--;
      if (counter < 0) {
        thisPopup.unload();
      } else {
        countDown.text(counter.toString());
      }
    }, 1000);
  }

  thisPopup.unload = function() {

    clearInterval(timer);

    popup.fadeOut("250", function() {
      container.animate({
        "opacity": "1"
      }, 250);
    });
  }
}

function loop() {
  showMsg();
  var rand = Math.round(Math.random() * (3000 - 500)) + 500;
  loopHandle = setTimeout(loop, rand);
}

// Reloads the page to get a new pop-up and quote
function getNewMsg() {
  location.reload();
}