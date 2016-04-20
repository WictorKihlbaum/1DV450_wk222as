angular
    .module('app')
    .service('EventService', EventService);

    EventService.$inject = ['API', '$resource', '$http', '$log', '$q', '$timeout', 'auth'];

    function EventService(API, $resource, $http, $log, $q, $timeout, auth) {
        const self = this;

        self.getAllEvents = () => {
            /*return $resource('http://localhost:3000/api/v1/events', {}, {
                get: {
                    method: 'GET',
                    headers: {
                        'Accept': API.format,
                        'X-APIKey': API.apiKey
                    }
                }
            });*/

            const req = {
                method: 'GET',
                url: 'http://localhost:3000/api/v1/events',
                headers: {
                    'X-APIKey': API.apiKey
                }
            };
            return $http(req);
        };

        self.deleteEvent = (event) => {
            console.log(event);

            const config = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-APIKey': API.apiKey,
                    'Authorization': auth.getToken()
                }
            };

            $http.delete(API.baseURL + `/api/v1/events/${event.id}`, config);

            /*$resource(API.baseURL + '/api/v1/events/:id', {}, {
                delete: { method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-APIKey': API.apiKey,
                        'Authorization': auth.getToken()
                    },
                    params: {id: event.id} }
            });*/

            /*$resource(API.baseURL + '/api/v1/events/:id').delete({id: event.id}, function(res) {
                console.log(res);
            });*/

        };

    }