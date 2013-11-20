(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'licenseController';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['$scope', 'common', 'datacontext', licenseController]);

    function licenseController($scope, common,datacontext) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);


        // Bindable properties and functions are placed on vm.
        //vm.activate = activate;
        vm.title = 'Generate License';
        vm.newLicenses = 12;

        vm.generateLicenseKey = generateLicenseKey;

        vm.licenses = [];
        activate();
        vm.isCustomer = false; //determined by employee or customer that is logged in

        function activate() {
            getLicenses();
            common.activateController(controllerId)
                .then(function () { log('Activated Licenses View'); });

        }

        //#region Internal Methods        
        function getLicenses(){
            datacontext.getLicensesForOrganization('dummyOrg').then(function(data){
                vm.licenses = data;
            });
        }

        function generateLicenseKey(license)
        {
            alert('Are you sure you want to generate a new license for Machine Code: ' + license.machineCode);
        }
        //#endregion
    }
})();
