angular
    .module('app')
    .controller('Login', LoginCtrl);

    LoginCtrl.$inject = ['user', 'auth', '$location'];

    function LoginCtrl(user, auth, $location) {
        const self = this;

        function handleRequest(res) {
            const token = res.data.jwt ? res.data.jwt : null;
            if (token) {
                console.log('JWT:', token);
                self.message = 'Welcome!'; // TODO: Create partial view for user messages.
                $location.path('/events');
            }
            //self.message = res.data.message;
        }

        self.login = () => {
            user.login(self.email, self.password)
                .then(handleRequest, handleRequest)
        };

        self.logout = () => {
            auth.logout && auth.logout()
        };

        self.isAuthed = () => {
            return auth.isAuthed ? auth.isAuthed() : false
        };
    }