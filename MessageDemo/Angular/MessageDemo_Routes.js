function messagedemo_routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'Angular/Views/Index.html',
            controller: 'MessageController'
        });
}