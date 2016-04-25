angular
    .module('app')
    .service('EventService', EventService);

    EventService.$inject = ['API', '$http', 'auth'];

    function EventService(API, $http, auth) {
        const self = this;

        self.getAllEvents = () => {
            const req = {
                method: 'GET',
                url: 'http://localhost:3000/api/v1/events',
                headers: {
                    'X-APIKey': API.apiKey
                }
            };
            return $http(req);
        };

        self.getNearbyEvents = (latitude, longitude) => {
            const req = {
                method: 'GET',
                url: 'http://localhost:3000/api/v1/events',
                params: {
                    lat: latitude,
                    long: longitude
                },
                headers: {
                    'X-APIKey': API.apiKey
                }
            };
            return $http(req);
        };

        self.editEvent = (category, description) => {
            const url = API.baseURL + API.eventsPath + '/' + self.event.id;

            const data = {
                event: {
                    'id': self.event.id,
                    'category': category,
                    'description': description,
                    'creator_id': 1,
                    'position_id': 1
                }
            };

            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': API.format,
                    'X-APIKey': API.apiKey,
                    'Authorization': auth.getToken()
                }
            };

            return $http.put(url, data, config);
        };

        self.createEvent = (category, description) => {
            const url = API.baseURL + API.eventsPath;

            const data = {
                event: {
                    'category': category,
                    'description': description,
                    'creator_id': 1,
                    'position_id': 1
                }
            };

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': API.format,
                    'X-APIKey': API.apiKey,
                    'Authorization': auth.getToken()
                }
            };

            return $http.post(url, data, config);
        };

        self.deleteEvent = event => {
            const url = API.baseURL + API.eventsPath + '/' + event.id;
            const config = {
                method: 'DELETE',
                headers: {
                    'Content-Type': API.format,
                    'X-APIKey': API.apiKey,
                    'Authorization': auth.getToken()
                }
            };
            return $http.delete(url, config);
        };

        self.getEventsByParams = (creatorID, locationID, categoryName) => {
            const req = {
                method: 'GET',
                url: 'http://localhost:3000/api/v1/events',
                params: {
                    creator_id: creatorID,
                    position_id: locationID,
                    category: categoryName
                },
                headers: {
                    'X-APIKey': API.apiKey
                }
            };
            return $http(req);
        };

    }