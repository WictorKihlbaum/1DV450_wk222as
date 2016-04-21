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

        $scope.showEditView = event => {
            $scope.hej = event;
            self.hejsan = event;
            $location.path('/edit', false);
        };

        self.editEvent = () => {
            console.log($scope.hej);
            console.log(self.hejsan);
            //eventService.editEvent(event);
        };

        $scope.showEvent = event => {
            const eventInfo = $mdDialog.alert()
                .title(event.category)
                .textContent(event.description)
                .ariaLabel('Event info')
                .ok('Close');

            $mdDialog.show(eventInfo);
        };

        self.createEvent = () => {
            eventService.createEvent(self.category, self.description)
                .then(res => {
                    if (res.status == 201) {
                        $location.path('/events');
                        // TODO: Show user success message
                    }
                });
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

    }