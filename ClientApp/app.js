angular
    .module('app', ['ngMaterial', 'ngRoute'])
    .factory('authInterceptor')
    .constant('API', {
        'baseURL': 'http://localhost:3000',
        'apiKey': '181d7e9aa1afc17a8eb69a0542c67c4d',
        'format': 'application/json'
    });