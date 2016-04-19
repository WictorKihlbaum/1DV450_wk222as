angular
    .module('app')
    .controller('Event', EventCtrl);

    EventCtrl.$inject = ['EventService', '$scope', '$mdDialog'];

    function EventCtrl(eventService, $scope, $mdDialog) {
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


        $scope.showEvent = (eventObj, eventScope) => {
            $mdDialog.show(
                $mdDialog.alert()
                    .title(eventObj.category)
                    .textContent(eventObj.description)
                    .ariaLabel('Event inspect')
                    .ok('Close')
                    .targetEvent(eventScope)
            );
        };

        $scope.editEvent = event => {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Edit')
                    .textContent('Edit one or more details about this event')
                    .ariaLabel('Edit event')
                    .ok('Close')
                    .targetEvent(event)
            );
        };

        $scope.deleteEvent = event => {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Delete')
                    .textContent('Delete this event?')
                    .ariaLabel('Delete event')
                    .ok('Close')
                    .targetEvent(event)
            );
        };
    }