angular
    .module('app')
    .controller('Login', LoginCtrl);

    LoginCtrl.$inject = ['user', 'auth', '$mdToast', '$mdDialog'];

    function LoginCtrl(user, auth, $mdToast, $mdDialog) {
        const self = this;

        function isJWTokenRetrieved(res) {
            const token = res.data.jwt ? res.data.jwt : null;
            if (token) {
                self.userEmail = res.config.data.auth.email;
                user.getAllCreators().then(res2 => {
                    const creator = res2.data.creators.find(element => element.email == self.userEmail);
                    self.showUserMessage(`Welcome ${creator.name}!`);
                });
            }
        }

        self.login = () => {
            if (self.email && self.password) {
                user.currentUserEmail = self.email;
                user.login(self.email, self.password)
                    .then(res => {
                        $mdDialog.hide();
                        isJWTokenRetrieved(res);
                    });
            }
        };

        self.logout = () => {
            auth.logout && auth.logout();
            self.showUserMessage('Goodbye!');
        };

        self.showUserMessage = message => {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top')
                    .theme('success-toast')
                    .hideDelay(5000)
            );
        };

        self.isAuthed = () => {
            return auth.isAuthed ? auth.isAuthed() : false
        };

        self.openLoginDialog = () => {
            $mdDialog.show({
                controller: 'Login',
                controllerAs: 'login',
                templateUrl: 'partials/login.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
        };

        self.closeLoginDialog = () => {
            $mdDialog.hide();
        };

    }