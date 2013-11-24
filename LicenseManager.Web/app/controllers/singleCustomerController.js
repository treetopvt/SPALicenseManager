(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'singleCustomerController';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['$routeParams', 'common', 'datacontext',singleCustomerController]);

    function singleCustomerController($routeParams, common, datacontext) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);


        // Bindable properties and functions are placed on vm.
        vm.activate = activate;
        vm.title = 'View Customer';//could be View as well

        vm.EditButtonText = 'Edit Customer';
        vm.updateStatus = false;

        vm.saveCustomer = saveCustomer;
        vm.deleteCustomer = deleteCustomer;
        vm.changeCustomerEdit = changeCustomerEdit;

        vm.isEditing = false;
        vm.errorMessage = '';
        vm.Customer = {
            firstName: 'TEST',
            lastName: 'USER',
            id:$routeParams.customerId
        };

        vm.organizations = [{
            "id": "1",
            "name": "<i class=\"glyphicon glyphicon-thumbs-up\"></i>&nbsp;ANG"
        },
            {
                "id": "2",
                "name": "<i class=\"glyphicon glyphicon-star\"></i>&nbsp;Alexandria"
            }
        ]
        activate();

        function activate() {
            common.activateController(controllerId)
    .then(function () { log('Activated Single Customer View'); });

        }

        function saveCustomer() {
            vm.updateStatus = true;
            if (!vm.Customer.id || vm.Customer.id < 0 ) {
                datacontext.insertCustomer(vm.Customer).then(processSuccess, processError);
            }
            else {
                datacontext.updateCustomer(vm.Customer).then(processSuccess, processError);
            }
            changeCustomerEdit(false);
        }

        function deleteCustomer() {
            vm.errorMessage = 'Please do not delete this customer';
            changeCustomerEdit(false);
        }

        function changeCustomerEdit(isEditing)
        {
            vm.isEditing = isEditing;
            if (isEditing) {
                vm.EditButtonText = 'Cancel Editing';
                vm.title = 'Edit Customer';
            } else {
                vm.EditButtonText = 'Edit Customer';
                vm.title = 'View Customer';
            }
        }

        //#region Internal Methods        
        function processSuccess() {
            console.log('Successful save of customer');
        }

        function processError(error) {
            vm.errorMessage = 'Error encountered with save: ' + error;

        }
        //#endregion
    }
})();
