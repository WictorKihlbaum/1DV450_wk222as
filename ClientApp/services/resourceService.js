angular
    .module('app')
    .factory('resourceService', resourceService);

    resourceService.$inject = ['$http', 'API'];

    function resourceService($http, API) {

        return collectionName => {

            let Resource = data => {
                angular.extend(this, data);
            };

            Resource.getCollection = () => {

                const req = {
                    method: 'GET',
                    url: API.baseURL + '/api/v1/events',
                    headers: {
                        'Accept': API.format,
                        'X-APIKey': API.apiKey
                    }
                };

                return $http(req).then(response => {
                    let result = [];

                    angular.forEach(response.data, (value, key) => {
                        result[key] = new Resource(value);
                    });

                    return result;
                });
            };

            // TODO: Add the rest of CRUD-methods.

            return Resource;
        };

    }