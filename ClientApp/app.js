angular
    .module('app', ['ngMaterial', 'ngRoute', 'ngResource', 'ngMessages', 'uiGmapgoogle-maps'])
    .constant('API', {
        'baseURL': 'http://localhost:3000',
        'eventsPath': '/api/v1/events',
        'apiKey': '6b979caf55b39320428ae62602495079',
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
    .config(['$resourceProvider', $resourceProvider => {
        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }])
    .config($mdIconProvider => {
        $mdIconProvider
            .icon('edit', 'assets/img/edit.svg')
            .icon('delete', 'assets/img/delete.svg')
            .icon('create', 'assets/img/create.svg')
    })
    .config($mdThemingProvider => {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');
    });