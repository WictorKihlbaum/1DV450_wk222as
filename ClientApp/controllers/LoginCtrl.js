angular
    .module('app')
    .controller('Login', LoginCtrl);

    LoginCtrl.$inject = ['user', 'auth', '$location', '$mdToast'];

    function LoginCtrl(user, auth, $location, $mdToast) {
        const self = this;

        function redirectToEvents(res) {
            const token = res.data.jwt ? res.data.jwt : null;
            if (token) {
                $location.path('/events');
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Welcome Wictor!')
                        .position('top')
                        .theme('success-toast')
                        .hideDelay(5000)
                );
            }
        }

        self.login = () => {
            if (self.email && self.password) {
                user.login(self.email, self.password)
                    .then(redirectToEvents)
            }
        };

        self.logout = () => {
            auth.logout && auth.logout()
        };

        self.isAuthed = () => {
            return auth.isAuthed ? auth.isAuthed() : false
        };

        if (self.isAuthed()) {
            $location.path('/events');
        }

    }