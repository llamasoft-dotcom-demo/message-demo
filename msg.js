var loopHandle = null;
var IsWindowOpen = false;
var prevQuote = "";
var newQuote = "";
var startTime = new Date();
var endTime = new Date();
var timeGap = 0;


// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
    	var popup = $(".js__popup");
        var body = $(".js__p_body");
        var content = $(".js__popup").find(".p_content");
        var marginLeft = -popup.width()/2;
        
        popup.css("margin-left", marginLeft);
        
    	content.html(msg);
    	body.removeClass("js__fadeout");
        popup.removeClass("js__slide_top");
        IsWindowOpen = true;
    }
}

function hideMsg() {
	var popup = $(".js__popup");
    var body = $(".js__p_body");
    
	popup.addClass("js__slide_top");
    body.addClass("js__fadeout");
    // location.hash = simplePopup.settings.hashtag;
    IsWindowOpen = false;
    startTime = new Date();
	endTime = new Date();
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
	newQuote = _.sample(quotes);
    if (newQuote != prevQuote) { messageSystem.showMessage(newQuote); }
    prevQuote = newQuote;
    
}

function loop() {
	timeGap = Math.abs(Math.round((startTime - endTime)/1000));
	console.log("loop - IsWindowOpen :" + IsWindowOpen + " timeGap: " + timeGap );
	if (!IsWindowOpen) {
		if (timeGap == 0) { 
			showMsg();
			startTime = new Date();
		} else if (timeGap >= 1 || timeGap < 0) {
			startTime = new Date();
			endTime = new Date();
		}
	} else if (timeGap >= 1 && IsWindowOpen) {
		hideMsg();
	} 
    //var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    loopHandle = setTimeout(loop, 3000);
}


$(function() {
   $('#msgButton').click(function() {
       var btn = $(this);
       var btnTxt = btn.text();
       if (btnTxt === 'Start Messages') {
           btn.text('Stop Messages');
           loopHandle = setTimeout(loop, 500);
           IsWindowOpen = false;
       } else {
           btn.text('Start Messages');
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});

(function($) {
  $.fn.simplePopup = function(event) {
    var simplePopup = {
      settings: {
        hashtag: "#/",
        url: "popup",
        event: event || "click"
      },

      initialize: function(link) {
        var popup = $(".js__popup");
        var body = $(".js__p_body");
        var close = $(".js__p_close");
        var routePopup = simplePopup.settings.hashtag + simplePopup.settings.url;

        var cssClasses = link[0].className;

        if (cssClasses.indexOf(" ") >= 0) {
          cssClasses = cssClasses.split(" ");

          for (key in cssClasses) {
            if (cssClasses[key].indexOf("js__p_") === 0) {
              cssClasses = cssClasses[key]
            }
          };
        }

        var name = cssClasses.replace("js__p_", "");

        // We redefine the variables if there is an additional popap
        if (name !== "start") {
          name = name.replace("_start", "_popup");
          popup = $(".js__" + name);
          routePopup = simplePopup.settings.hashtag + name;
        };

        link.on(simplePopup.settings.event, function() {
          simplePopup.show(popup, body, routePopup);
          return false;
        });

        $(window).on("load", function() {
          simplePopup.hash(popup, body, routePopup);
        });

        body.on("click", function() {
          simplePopup.hide(popup, body);
        });

        close.on("click", function() {
          simplePopup.hide(popup, body);
          return false;
        });

        $(window).keyup(function(e) {
          if (e.keyCode === 27) {
            simplePopup.hide(popup, body);
            isEscKey = true;
          }
        });
      },


      centering: function(popup) {
        var marginLeft = -popup.width()/2;
        return popup.css("margin-left", marginLeft);
      },

      show: function(popup, body, routePopup) {
        simplePopup.centering(popup);
        body.removeClass("js__fadeout");
        popup.removeClass("js__slide_top");
        location.hash = routePopup;
      },

      hide: function(popup, body) {
        popup.addClass("js__slide_top");
        body.addClass("js__fadeout");
        location.hash = simplePopup.settings.hashtag;
        startDate = new Date();
		endTime = new Date();
      },

      hash: function(popup, body, routePopup) {
        if (location.hash === routePopup) {
          simplePopup.show(popup, body, routePopup);
        }
      }
    };


    return this.each(function() {
      var link = $(this);
      simplePopup.initialize(link);
    });
  };
})(jQuery);