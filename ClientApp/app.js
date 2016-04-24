angular
    .module('app', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngResource', 'ngMap'])
    .constant('API', {
        'baseURL': 'http://localhost:3000',
        'eventsPath': '/api/v1/events',
        'apiKey': '4089210b1b572b3b688bdf8abeb19516',
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