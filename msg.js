var loopHandle = null;
var count = 1;
var  posi=-500
var removeDiv=null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    showMessage: function(msg) {
        var el = document.createElement("div");		
		var dvname = 'dv'+count;
		el.setAttribute('id',dvname);
		el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
		el.innerHTML = msg;
		removeDiv=   setTimeout(function(){
		el.parentNode.removeChild(el);
		},3000);
		 document.body.appendChild(el);
		 var but = document.createElement('button');
		 var t = document.createTextNode("close");       // Create a text node
			but.appendChild(t); 
		 but.setAttribute('type','button');
		 but.setAttribute('name',"close message");
		 but.setAttribute('value',"close message");
		 but.setAttribute('text',"close message");
		 var btname ='btn'+count;
		  but.setAttribute('id',btname);
		  but.setAttribute('style','width:50px;height:20px;');
		  var butdiv = document.createElement('div');
		  var btnamediv = 'btdiv'+count;
		 butdiv.setAttribute('id',btnamediv);
		//  $(<p>Close Message</p>).appendTo('#'+btnamediv);
		  
		//  $('#'+dvname).attr('style','position:absolute;top:0;right:0;align:center;z-index:');
		  $('#'+dvname).attr('style','position:relative;right:-500px;top:-380px;color:red;font-Weight:bold;');
		//  $('#'+dvname).attr('style','position:fixed;right:0;top:-500;');
		  posi = posi +50;
		  
		  count = count + 1;
		 el.appendChild(but);
		 $('#'+btname).click(function() {
	  $('#'+dvname).hide();
   } );
		 
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
		   alert('Messages are going to run. To close the message click button next to it. ');
           btn.text('Stop Messages');
           loopHandle = setTimeout(loop, 500);
		   
		   
       } else {
           btn.text('Start Messages');
          clearTimeout(loopHandle);
           loopHandle = null;
       }
   } );
});
