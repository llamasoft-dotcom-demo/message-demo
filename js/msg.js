var app = angular.module("message-demo", []);

app.controller("make-messages", function($scope, $timeout){
  var loopHandle = null;
  $scope.allMessages = [];
  //$scope.savedMessages = [];
  $scope.model={
    messageList: [],
    savedMessages: []
  };
  // $scope.newType = "";
  // $scope.newMsg = "";
  $scope.msgIndex = 0;

  var notificationType = ["calendar", "reminder", "error", "list", "mail"];
  // The messageSystem object is where you should do all of your work
  // Use any combination of javascript, HTML and CSS that you feel
  // is appropriate
  $scope.messageSystem = {
      showMessage: function(msg) {
        var randType = notificationType[(Math.floor(Math.random() * notificationType.length))];
        $scope.canISeeTheMessage = true;
        $scope.model.messageList.push({
          randType:randType,
          msg:msg,
          dex: $scope.msgIndex
        });
        $scope.msgIndex++;
      },

      saveThis: function(context){
        //$timeout.cancel($scope.threeSeconds);
        //this works
        // $(context).parent().appendTo('#saved-reminders');
        // $scope.canISeeTheMessage = true;

        // console.log($scope.savedMessages);
        // $scope.newType = angular.element(context).children("#forMessage").attr("ng-class");
        // $scope.newMsg = angular.element(context).children("p").text();

        // for (var i = 0; i < $scope.model.messageList.length; i++){
        //   if ($scope.model.messageList[i].dex){

        //   }
        // }
        var ind = context.message.dex;
        console.log(ind);

        $scope.model.savedMessages.push($scope.model.messageList[ind]);
        console.log($scope.model.savedMessages);
      },

      hideMe:function(){
        $timeout(function(){
          $scope.canISeeTheMessage = false;
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
      loopHandle = $timeout(loop, rand);
  }


  angular.element(document).ready(function() {
     angular.element(document).find('#message-reminder').hide();
     angular.element(document).find('#msgButton').on('click',function() {
        angular.element(document).find('#message-reminder').toggle();
        var btn = angular.element(document).find(this),
        btnTxt = btn.text();
         if (btnTxt === 'Start Messages') {
             btn.text('Stop Messages');
             loopHandle = $timeout(loop, 500);
         } else {
             btn.text('Start Messages');
             $timeout.cancel(loopHandle);
             loopHandle = null;
         }
     });
  });
});