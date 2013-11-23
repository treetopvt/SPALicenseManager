(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'singleCustomerController';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['$routeParams', 'common', singleCustomerController]);

    function singleCustomerController($routeParams, common) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);


        // Bindable properties and functions are placed on vm.
        vm.activate = activate;
        vm.title = 'Edit Customer';//could be View as well

        vm.saveCustomer = saveCustomer;

        vm.Customer = {
            firstName: 'TEST',
            lastName: 'USER',
            id:$routeParams.customerId
        };


        activate();

        function activate() {
            common.activateController(controllerId)
    .then(function () { log('Activated Single Customer View'); });

        }

        function saveCustomer() {
            alert('Save Customer');
        }

        //#region Internal Methods        

        //#endregion
    }
})();
