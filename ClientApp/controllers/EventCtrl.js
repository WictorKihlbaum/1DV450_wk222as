angular
    .module('app')
    .controller('Event', EventCtrl);

    function EventCtrl() {
        const self = this;
        console.log('EventCtrl Test!');
    }