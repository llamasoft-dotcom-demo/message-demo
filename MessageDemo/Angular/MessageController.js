function MessageController($scope, $state, notificationFactory, $http) {
    //False on page load
    var timeOut = null;
    $scope.loading = false;
    $scope.ToasterMessageModel = {};
    $scope.buttonClass = 'btn btn-success';
    // Original array to hold data. In real world application data can be populated using web api/json backend services
    $scope.quotes = [
    "What we've got here is failure to communicate.",
    'Go ahead, make my day.',
    "I've got a bad feeling about this.",
    "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
    "I find your lack of faith disturbing.",
    "You're gonna need a bigger boat.",
    "Tell Mike it was only business.",
    "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
    ];

    var timeOutLoop = function loop() {
        var rand = Math.round(Math.random() * (3000 - 500)) + 500;
        timeOut = setTimeout(function () {
            notificationFactory.getRandomNotification(_.sample($scope.quotes));
            loop();
        }, rand);
    };

    $scope.startMessage = function () {
        $scope.buttonClass = 'btn btn-danger';
        $scope.loading = true;
        timeOutLoop();
    };

    $scope.stopMessage = function () {
        $scope.buttonClass = 'btn btn-success';
        $scope.loading = false;
        clearTimeout(timeOut);
        notificationFactory.removeNotifications();
    };

    $scope.addQuote = function () {
        $scope.quotes.push($scope.quoteModel);
        $scope.quoteModel = '';
    };
    $scope.submitMessageDemoForm = function () {
        $scope.buttonClass = 'btn btn-danger';
        $scope.loading = true;
        notificationFactory.getRandomNotification(_.sample($scope.quotes));
    };

    // Demonstration of $http service and how an external api can be called using it.
    // Upon receiving successful data notification service is called to create and push toastr notification
    $scope.chuckNorris = function () {
        $http.get('http://api.icndb.com/jokes/random?limitTo=[nerdy]').then(function (response) {
            notificationFactory.getRandomNotification(response.data.value.joke);
        });
    };
}