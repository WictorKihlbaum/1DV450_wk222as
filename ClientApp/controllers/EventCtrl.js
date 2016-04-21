angular
    .module('app')
    .controller('Event', EventCtrl);

    EventCtrl.$inject = ['EventService', '$scope', '$mdDialog', '$route', '$location'];

    function EventCtrl(eventService, $scope, $mdDialog, $route, $location) {
        const self = this;

        self.getAllEvents = () => {
            eventService.getAllEvents()
                .then(result => {
                    $scope.events = result.data.events;
                    console.log($scope.events);
                });
        };

        self.getAllEvents();

        self.createEvent = () => {
            eventService.createEvent(self.category, self.description)
                .then(res => {
                    if (res.status == 201) {
                        // TODO: Show user success message
                    }
                });
        };

        $scope.showEvent = event => {
            const eventInfo = $mdDialog.alert()
                .title(event.category)
                .textContent(event.description)
                .ariaLabel('Event info')
                .ok('Close');

            $mdDialog.show(eventInfo);
        };

        $scope.deleteEvent = event => {
            const confirmDelete = $mdDialog.confirm()
                .title(`Delete ${event.category}?`)
                .textContent('This event will forever be deleted.')
                .ariaLabel('Delete event')
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirmDelete)
                .then(() => {
                    eventService.deleteEvent(event);
                })
                .then(() => {
                    $route.reload();
                });
        };

        $scope.editEvent = event => {
            //$location.path('/update');

            /*$mdDialog.show(
                $mdDialog.alert()
                    .title('Edit')
                    .textContent('Edit one or more details about this event')
                    .ariaLabel('Edit event')
                    .ok('Close')
            );*/
        };

    }