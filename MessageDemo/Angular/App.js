var messageDemoApp = angular.module('MessageDemoApp', ['ui.router'])
    .controller('MessageController', ['$scope', '$state', 'notificationFactory','$http', MessageController])
    .factory('notificationFactory', [notificationFactory])
    .config(['$stateProvider', '$urlRouterProvider', messagedemo_routes]);



