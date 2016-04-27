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

        $scope.searchMethods = ['Filter', 'Nearby', 'Tags', 'Params'];
        self.selectedMethod;

        $scope.positionOption = 'Address';

        // Checkboxes for Param-searches.
        //$scope.creatorCB = false;
        //$scope.categoryCB = false;
        //$scope.locationCB = false;


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
                    const events = result.data.events;

                    $scope.events = events;
                    // TODO: Maybe move to service instead.
                    self.saveAllCreators(events);
                    self.saveAllCategories(events);
                    self.saveAllLocations(events);
                });
        };
        self.getAllEvents();

        self.saveAllCreators = events => {
            let creators = [];

            for (let event of events) {
                if (!creators.find(element => element.id == event.creator.id)) {
                    creators.push({id: event.creator.id, name: event.creator.name});
                }
            }
            $scope.creators = creators;
        };

        self.saveAllCategories = events => {
            let categories = [];

            for (let event of events) {
                if (!categories.find(element => element == event.category)) {
                    categories.push(event.category);
                }
            }
            $scope.categories = categories;
        };

        self.saveAllLocations = events => {
            let locations = [];

            for (let event of events) {
                if (!locations.find(element => element.id == event.position.id)) {
                    locations.push({
                        id: event.position.id,
                        address: event.position.address,
                        latitude: event.position.latitude,
                        longitude: event.position.longitude
                    });
                }
            }
            $scope.locations = locations;
        };

        self.getNearbyEvents = () => {
            let params = self.assemblePositionParams();
            eventService.getNearbyEvents(params)
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

        self.assemblePositionParams = () => {
            let params = {
                address: self.address,
                latitude: self.latitude,
                longitude: self.longitude,
                distance: self.distance
            };
            return params;
        };

        //self.querySearch = querySearch;

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
            let params = self.assembleCreateParams();
            // First create the new position.
            eventService.createPosition(params)
                .then(res => {
                    // Then create the new event when the position ID has been returned.
                    if (res.status == 201) {
                        params['position_id'] = res.data.position.id;
                        eventService.createEvent(params)
                            .then(res => {
                                if (res.status == 201) {
                                    const message = 'Event has been successfully created!';
                                    self.showSuccessMessage(message);
                                    self.closeEventDialog();
                                    $route.reload();
                                }
                            });
                    }
                });
        };

        self.assembleCreateParams = () => {
            let params = {
                category: self.categoryCreate,
                description: self.descriptionCreate,
                latitude: self.latitudeCreate,
                longitude: self.longitudeCreate,
                address: self.addressCreate
            };
            return params;
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

        self.getEventsByParams = () => {
            const params = self.assembleParams();

            eventService.getEventsByParams(params)
                .then(res => {
                    let events = [];
                    for (let event of res.data.events) {
                        events.push(event);
                    }
                    $scope.events = events;
                });
        };

        self.assembleParams = () => {
            return {
                creator: self.creatorParam,
                position: self.locationParam,
                category: self.categoryParam
            };
        };

    }