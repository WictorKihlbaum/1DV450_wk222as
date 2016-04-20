angular
    .module('app')
    .controller('Event', EventCtrl);

    EventCtrl.$inject = ['EventService', '$scope', '$mdDialog'];

    function EventCtrl(eventService, $scope, $mdDialog) {
        const self = this;

        self.getAllEvents = () => {
            eventService.getAllEvents()
                .then(result => {
                    $scope.events = result.data.events;
                    console.log($scope.events);
                });

            /*eventService.getAllEvents().$q.then(result => {
                console.log(result);
            });*/
        };

        self.getAllEvents();


        $scope.showEvent = event => {
            $mdDialog.show(
                $mdDialog.alert()
                    .title(event.category)
                    .textContent(event.description)
                    .ariaLabel('Event inspect')
                    .ok('Close')
            );
        };

        $scope.deleteEvent = event => {
            const confirm = $mdDialog.confirm()
                .title(`Delete ${event.category}?`)
                .textContent('This event will forever be deleted.')
                .ariaLabel('Delete')
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(() => {
                eventService.deleteEvent(event);
            });
        };

        $scope.editEvent = event => {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Edit')
                    .textContent('Edit one or more details about this event')
                    .ariaLabel('Edit event')
                    .ok('Close')
            );
        };

    }