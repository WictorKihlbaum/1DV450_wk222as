angular
    .module('app')
    .controller('Event', EventCtrl);

    EventCtrl.$inject = ['EventService', '$scope'];

    function EventCtrl(eventService, $scope) {
        const self = this;

        /*eventService.query().$promise.then(result => {
            console.log(result);
        });*/

        self.getAllEvents = () => {
            eventService.getAllEvents()
                .then(result => {
                    $scope.events = result.data.events;
                    console.log($scope.events);
                });
        };

        self.getAllEvents();
    }