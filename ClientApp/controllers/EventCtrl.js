angular
    .module('app')
    .controller('Event', EventCtrl);

    EventCtrl.$inject = [
        'EventService',
        '$scope',
        '$mdDialog',
        '$route',
        '$location',
        '$mdToast'
    ];

    function EventCtrl(eventService, $scope, $mdDialog, $route, $location, $mdToast) {
        const self = this;

        /*NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });*/

        if (eventService.event) {
            $scope.category = eventService.event.category;
            $scope.description = eventService.event.description;
        }

        self.getAllEvents = () => {
            eventService.getAllEvents()
                .then(result => {
                    $scope.events = result.data.events;
                    console.log($scope.events);
                });
        };

        self.getAllEvents();

        $scope.showEditView = event => {
            eventService.event = event;
            $location.path('/edit');
        };

        self.showSuccessMessage = message => {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top')
                    .theme('success-toast')
                    .hideDelay(5000)
            );
        };

        self.editEvent = () => {
            eventService.editEvent(self.category, self.description)
                .then(res => {
                    if (res.status == 200) {
                        const message = 'Event has been successfully updated!';
                        self.showSuccessMessage(message);
                        $location.path('/events');
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

        self.createEvent = () => {
            eventService.createEvent(self.category, self.description)
                .then(res => {
                    if (res.status == 201) {
                        const message = 'Event has been successfully created!';
                        self.showSuccessMessage(message);
                        $location.path('/events');
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
                    return eventService.deleteEvent(event);
                })
                .then(res => {
                    if (res.status == 204) {
                        const message = 'Event has been successfully deleted!';
                        self.showSuccessMessage(message);
                        $route.reload();
                    }
                });
        };

    }