var loopHandle = null;
var pulseHandler = null;
var glowHandler = null;


// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    
    createBaseDiv: function(){
        $("body").append("<div id='modalContainer'></div>");
        $("#modalContainer").css({"position": "absolute", "top": "55px", "right": "55px", "z-index": "5000", "width": "30%" });
    },
    showMessage: function(msg) {
        //alert(msg);
        this.createBaseDiv();
        
        var modalDiv = $("<div class='modalBox'></div>");
        var message = $("<p></p>").text(msg);
        var closeButton = $("<button class='closeBox'>X</button>");
        
        $(modalDiv).append(closeButton);
        $(modalDiv).append(message);
        $("#modalContainer").append(modalDiv);
        
        
        $(".modalBox").css({"position": "relative", "z-index":"100", "background-color": "#453432", "color": "#fff", "padding": "30px", "border-radius": "70px", "text-align": "center"});
       
        $(".closeBox").css({"background-color": "transparent", "color": "#fff", "float": "right", "border-radius": "20px"});
     
        $('.closeBox').on('click', function(){
            $(this).parent().remove();
        });  
           
        $(".modalBox").fadeOut(3000, function(){
            $(this).remove();
        });
           
    }
    
};



function showMsg() {
    quotes = [
    "What we've got here is failure to communicate.",
    'Go ahead, make my day.',
    "I've got a bad feeling about this.",
    "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
    "I find your lack of faith disturbing.",
    "You're gonna need a bigger boat.",
    "Tell Mike it was only business.",
    "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum.",
    ];
    messageSystem.showMessage(_.sample(quotes));
    
}

function loop() {
    showMsg();
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    loopHandle = setTimeout(loop, rand);
}



$(function() {
    
    var s = Snap('#mySvg');
    
    //make svg responsive
    s.attr({ viewBox: "0 0 400 500" });
    
    var blackCircle = s.circle(200, 200, 200).attr({fill: "r()#fff-#000"}); 
    var whiteCircle = s.circle(220, 200, 90).attr({fill: "#fff"});
    
    var eight = s.text(180, 260, "8").attr({
        fill: "#555",
        fontSize: "160px",
        fontWeight: "bold"
    });
    
    function pulse(){
      whiteCircle.animate({r:82}, 900, function(){
        whiteCircle.animate({r: 90}, 1100);
      });
    };

    function glow(){
      whiteCircle.animate({fill: "cadetblue"}, 900, function(){
        whiteCircle.animate({fill: "#fff"}, 1100);
      });
    };
    
    function resetAnimation(){
       clearInterval(pulseHandler);
       clearInterval(glowHandler);
    }
    
   $('#msgButton').click(function() {
       var btn = $(this),
      btnTxt = btn.text();
       if (btnTxt === 'Get Answers') {
           btn.text('Please Make It Stop'); 
           pulseHandler = setInterval(function(){ pulse() }, 2000);
           glowHandler = setInterval(function(){ glow() }, 2000);                                     
           loopHandle = setTimeout(loop, 2000);
       } else {
           btn.text('Get Answers');      
           resetAnimation();
           clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});

