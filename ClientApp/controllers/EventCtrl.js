angular
    .module('app')
    .controller('Event', EventCtrl);

    EventCtrl.$inject = [
        'EventService',
        '$scope',
        '$mdDialog',
        '$route',
        '$mdToast',
        'NgMap',
        'auth'
    ];

    function EventCtrl(eventService, $scope, $mdDialog, $route, $mdToast, NgMap, auth) {

        const self = this;
        //self.eventCategories = [];

        $scope.searchMethods = ['Filter', 'Nearby', 'Tags'];
        self.selectedMethod;


        /* Fills its purpose when editing events.
           This enables the edit-fields to be filled in with the old values. */
        if (eventService.event) {
            self.event = eventService.event;
            self.category = eventService.event.category;
            self.description = eventService.event.description;
        }

        self.getAllEvents = () => {
            eventService.getAllEvents()
                .then(result => {
                    $scope.events = result.data.events;
                    //self.eventCategories = self.saveEventCategories(result.data.events);
                });
        };
        self.getAllEvents();

        self.getNearbyEvents = () => {
            eventService.getNearbyEvents(self.latitude, self.longitude)
                .then(res => {
                    let events = [];
                    for (let eventArray of res.data.events) {
                        for (let event of eventArray) {
                            events.push(event);
                        }
                    }
                    $scope.events = events;
                });
        };

        //self.querySearch = querySearch;

        /*self.saveEventCategories = (events) => {
            for (let event of events) {
                if (self.eventCategories.indexOf(event.category) == -1) {
                    self.eventCategories.push(event.category);
                }
            }
            console.log(self.eventCategories);
        };*/

        /*function querySearch (query) {
            var results = query ? self.eventCategories.filter( createFilterFor(query) ) : self.eventCategories;
            return results;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }*/

        $scope.showEvent = event => {
            eventService.event = event;

            $mdDialog.show({
                controller: 'Event',
                controllerAs: 'event',
                templateUrl: 'partials/event-info.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            });
        };

        $scope.showCreateDialog = () => {
            $mdDialog.show({
                controller: 'Event',
                controllerAs: 'event',
                templateUrl: 'partials/create.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            });
        };

        self.createEvent = () => {
            eventService.createEvent(self.categoryCreate, self.descriptionCreate)
                .then(res => {
                    if (res.status == 201) {
                        const message = 'Event has been successfully created!';
                        self.showSuccessMessage(message);
                        self.closeEventDialog();
                        $route.reload();
                    }
                });
        };

        $scope.showEditDialog = event => {
            eventService.event = event;

            $mdDialog.show({
                controller: 'Event',
                controllerAs: 'event',
                templateUrl: 'partials/edit.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            });
        };

        self.editEvent = () => {
            eventService.editEvent(self.category, self.description)
                .then(res => {
                    if (res.status == 200) {
                        self.closeEventDialog();
                        $route.reload();
                        const message = 'Event has been successfully updated!';
                        self.showSuccessMessage(message);
                    }
                })
        };

        $scope.showDeleteDialog = event => {
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
                        self.getAllEvents();
                    }
                });
        };

        self.closeEventDialog = () => {
            $mdDialog.hide();
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

        $scope.isAuthed = () => {
            return auth.isAuthed ? auth.isAuthed() : false
        };

        $scope.getSelectedMethod = () => {
            if ($scope.selectedMethod !== undefined) {
                return "You have selected: " + $scope.selectedMethod;
            } else {
                return "Please select a method";
            }
        };

    }