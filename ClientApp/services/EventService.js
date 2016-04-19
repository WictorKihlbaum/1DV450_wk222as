angular
    .module('app')
    .service('EventService', EventService);

    EventService.$inject = ['$resource', 'API', '$http'];

    function EventService($resource, API, $http) {
        const self = this;

        self.getAllEvents = () => {
            const req = {
                method: 'GET',
                url: 'http://localhost:3000/api/v1/events',
                headers: {
                    'Accept': API.format,
                    'X-APIKey': API.apiKey
                }
            };

            return $http(req);
        };

        /*let allEvents = $resource('http://localhost:3000/api/v1/events', {}, {
            get: {
                method: 'GET',
                headers: {
                    'Accept': API.format,
                    'X-APIKey': API.apiKey
                }
            }
        });*/
    }