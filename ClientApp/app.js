angular
    .module('app', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngResource', 'ngMap'])
    .constant('API', {
        'baseURL': 'http://localhost:3000',
        'eventsPath': '/api/v1/events',
        'apiKey': 'f5ac815c75409c362574f0ab2549e234',
        'format': 'application/json'
    })
    .config(['$routeProvider', '$locationProvider',
        ($routeProvider, $locationProvider) => {
            $routeProvider.
            when('/events', {
                templateUrl: 'partials/events.html',
                controller: 'Event',
                controllerAs: 'event'
            }).
            when('/create', {
                templateUrl: 'partials/create.html',
                controller: 'Event',
                controllerAs: 'event'
            }).
            when('/edit', {
                templateUrl: 'partials/edit.html',
                controller: 'Event',
                controllerAs: 'event'
            }).
            otherwise({
                redirectTo: '/events'
            });

            $locationProvider.html5Mode(true);
        }])
    .config($httpProvider => {
        $httpProvider.interceptors.push('authInterceptor');
    })
    .config(function($mdIconProvider) {
        $mdIconProvider
            .icon('editIcon', 'assets/img/edit.svg')
            .icon('deleteIcon', 'assets/img/delete.svg')
            .icon('markerIcon', 'assets/img/marker.svg')
    });