var app = angular.module("message-demo", []);

app.controller("make-messages", function($scope, $timeout){
  $scope.loopHandle = null;
  $scope.model={
    messageList: [],
    savedMessages: []
  };
  $scope.msgIndex = 0;

  var notificationType = ["calendar", "reminder", "error", "list", "mail"];
  // The messageSystem object is where you should do all of your work
  // Use any combination of javascript, HTML and CSS that you feel
  // is appropriate
  $scope.messageSystem = {
      showMessage: function(msg) {
        var randType = notificationType[(Math.floor(Math.random() * notificationType.length))];
        
        $scope.model.messageList.push({
          randType:randType,
          msg:msg,
          canISeeTheMessage: true,
          dex: $scope.msgIndex,
          goAway: function(context){
            $timeout(function(){
              context.message.canISeeTheMessage = false;
            }, 3000)

          }
        });
        console.log($scope.msgIndex);
        $scope.msgIndex++;
      },

      saveThis: function(context){
        var ind = context.message.dex;
        var base = $scope.model.messageList[ind];

        $scope.model.savedMessages.push({
          randType:base.randType,
          msg:base.msg,
          dex:base.dex,
          isViz: true
        });
      },

      hideMe:function(context){
        $timeout(function(){
          context.message.canISeeTheMessage = false;
        },3000)
      }       
  }




  function showMsg() {
      quotes = [
      "We should definitely hire Dave Brunetti. That guy would be an AMAZING fit for our team!",
      "What we've got here is failure to communicate.",
      'Go ahead, make my day.',
      "I've got a bad feeling about this.",
      "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
      "I find your lack of faith disturbing.",
      "You're gonna need a bigger boat.",
      "Tell Mike it was only business.",
      "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
      ];
      $scope.messageSystem.showMessage(_.sample(quotes));
      
  }

  function loop() {
      showMsg();
      var rand = Math.round(Math.random() * (3000 - 500)) + 500;
      $scope.loopHandle = $timeout(loop, rand);
  }


  angular.element(document).ready(function() {
     angular.element(document).find('#message-reminder').hide();
     angular.element(document).find('#msgButton').on('click',function() {
        angular.element(document).find('#message-reminder').toggle();
        var btn = angular.element(document).find(this),
        btnTxt = btn.text();
         if (btnTxt === 'Start Messages') {
             btn.text('Stop Messages');
             $scope.loopHandle = $timeout(loop, 500);
         } else {
             btn.text('Start Messages');
             $timeout.cancel($scope.loopHandle);
             $scope.loopHandle = null;
         }
     });
  });
});