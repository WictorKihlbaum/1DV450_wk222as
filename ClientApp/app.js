angular
    .module('app', ['ngMaterial', 'ngRoute'])
    .constant('API', {
        'baseURL': 'http://localhost:3000',
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
            otherwise({
                redirectTo: '/'
            });

            $locationProvider.html5Mode(true);
        }]);