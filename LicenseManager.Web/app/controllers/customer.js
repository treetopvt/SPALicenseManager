﻿(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'customer';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['$scope', 'common', customer]);

    function customer($scope, common) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        // Bindable properties and functions are placed on vm.
       // vm.activate = activate;
        vm.title = 'Customers';
        
        vm.customers = [];//collection of customers for given organization

        activate();

        function activate() {
            common.activateController(controllerId)
                .then(function () { log('Activated Customers View'); });

        }

        //#region Internal Methods        

        //#endregion
    }
})();