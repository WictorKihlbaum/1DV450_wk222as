/* Kept for Backup purpose */

;(() => {
    function authInterceptor(API, auth) {
        return {
            // Automatically attach Authorization header.
            request: config => {
                const token = auth.getToken();
                if (config.url.includes(API.baseURL) && token)
                    config.headers.Authorization = `Bearer ${token}`;
                return config;
            },

            // If a token was sent back, save it.
            response: res => {
                if (res.config.url.includes(API.baseURL) && res.data.jwt)
                    auth.saveToken(res.data.jwt);
                return res;
            }

        }
    }

    function authService($window) {
        const self = this;

        self.parseJWT = token => {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }

        self.saveToken = token => {
            $window.localStorage['jwtToken'] = token;
        }

        self.getToken = () => {
            return $window.localStorage['jwtToken'];
        }

        self.isAuthed = () => {
            const token = self.getToken();
            if (token) {
                const params = self.parseJWT(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        }

        self.logout = () => {
            $window.localStorage.removeItem('jwtToken');
        }
    }

    function userService($http, API, auth) {
        const self = this;

        self.login = (email, password) => {
            const auth = {
                email: email,
                password: password
            };
            const headers = {
                'Content-Type': API.format,
                'X-APIKey': API.apiKey
            };
            return $http.post(`${API.baseURL}/knock/auth_token`, {
                auth: auth,
                headers: headers
            })
        };
    }

    function MainCtrl(user, auth) {
        const self = this;

        function handleRequest(res) {
            const token = res.data ? res.data.jwt : null;
            if (token) console.log('JWT:', token);
            self.message = res.data.message;
        }

        self.login = () => {
            user.login(self.email, self.password)
                .then(handleRequest, handleRequest)
        }

        self.logout = () => {
            auth.logout && auth.logout()
        }

        self.isAuthed = () => {
            return auth.isAuthed ? auth.isAuthed() : false
        }
    }

    angular
        .module('app', ['ngMaterial', 'ngRoute'])
        .controller('Main', MainCtrl)
        .factory('authInterceptor', authInterceptor)
        .service('user', userService)
        .service('auth', authService)
        .constant('API', {
            'baseURL': 'http://localhost:3000',
            'apiKey': '181d7e9aa1afc17a8eb69a0542c67c4d',
            'format': 'application/json'
        })
        .config($httpProvider => {
            $httpProvider.interceptors.push('authInterceptor');
        })
        /*.config(['$routeProvider', '$locationProvider',
            ($routeProvider, $locationProvider) => {
                $routeProvider.
                    when('/', {
                        templateUrl: 'partials/login.html',
                        controller: 'MainCtrl',
                        controllerAs: 'main'
            }).
            otherwise({
                redirectTo: '/'
            });

            $locationProvider.html5Mode(true);
        }])*/
})();