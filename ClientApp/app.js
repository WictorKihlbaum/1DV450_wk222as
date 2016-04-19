angular
    .module('app', ['ngMaterial', 'ngRoute', 'ngResource'])
    .constant('API', {
        'baseURL': 'http://localhost:3000',
        'eventsPath': '/api/v1/events',
        'apiKey': '181d7e9aa1afc17a8eb69a0542c67c4d',
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
    }]);