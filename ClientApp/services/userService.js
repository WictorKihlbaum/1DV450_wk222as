angular
    .module('app')
    .service('user', userService);

    userService.$inject = ['$http', 'API', 'auth'];

    function userService($http, API, auth) {
        const self = this;

        self.login = (email, password) => {
            const url = `${API.baseURL}/knock/auth_token`;
            const auth = {
                email: email,
                password: password
            };
            const headers = {
                'Content-Type': API.format,
                'X-APIKey': API.apiKey
            };
            return $http.post(url, { auth: auth, headers: headers });
        };
    }