angular
    .module('app')
    .factory('eventService', eventService);

    eventService.$inject = ['resourceService', '$q'];

    function eventService(resourceService, $q) {
        let Event = resourceService('events');

        return {
            get: () => {

                let deferred = $q.defer();

                Event.getCollection().then(data => {
                    deferred.resolve(data);
                });

                return deferred.promise;
            }
        };
    }