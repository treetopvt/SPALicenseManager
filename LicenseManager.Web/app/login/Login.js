(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'login';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['$location','$scope','common', 'userService', login]);

    function login($location,$scope, common, userService) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;

        // Bindable properties and functions are placed on vm.
        vm.activate = activate;
        vm.title = 'Login';
        
        //gets the common logger
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.userName = "";
        vm.password = "";
        vm.rememberMe = false;

        vm.submit = submit;
        vm.reset = reset;

        activate();

        function activate() {
            common.activateController(controllerId)
                .then(function () { log('Activated Login View'); });

        }

        //#region Internal Methods        
        function submit() {

            var user = {
                userName: vm.userName,
                password: vm.password
            };
            userService.login(user);
            //authorize and redirect
            var route = '/dashboard';

            $location.path(route); //location service that angular provides

        }
        function reset() {
            vm.username = "";
            vm.password = "";
        }
        //#endregion
    }
})();
