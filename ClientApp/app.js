angular
    .module('app', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngResource'])
    .constant('API', {
        'baseURL': 'http://localhost:3000',
        'eventsPath': '/api/v1/events',
        'apiKey': '8af2723b44468d7bd35bd1e7e80be087',
        'format': 'application/json'
    })
    .config(['$routeProvider', '$locationProvider',
        ($routeProvider, $locationProvider) => {
            $routeProvider.
            when('/', {
                templateUrl: 'partials/login.html',
                controller: 'Login',
                controllerAs: 'login'
            }).
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
                redirectTo: '/'
            });

            $locationProvider.html5Mode(true);
        }])
    .config($httpProvider => {
        $httpProvider.interceptors.push('authInterceptor');
    })
    .config(($mdIconProvider) => {
        $mdIconProvider
            .icon('editIcon', 'assets/img/edit.svg')
            .icon('deleteIcon', 'assets/img/delete.svg')
    });