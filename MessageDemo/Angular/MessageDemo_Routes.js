// Anular UI routing
// The only single state/page of application is defined below associating with template view and angular controller
function messagedemo_routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'Angular/Views/Index.html',
            controller: 'MessageController'
        });
}