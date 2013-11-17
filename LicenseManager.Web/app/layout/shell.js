(function () { 
    'use strict';
    
    var controllerId = 'shell';
    angular.module('app').controller(controllerId,
        ['$rootScope', '$location', 'userService', 'common', 'config', shell]);

    function shell($rootScope,$location, userService, common, config) {
        var vm = this;
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        var events = config.events;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.LogonVisible = false;
        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };

        activate();

        function activate() {
            logSuccess('Hot Towel Angular loaded!', null, true);
            common.activateController([], controllerId);
        }

        function toggleSpinner(on) { vm.isBusy = on; }
        function toggleLogon(on) {
             vm.LogonVisible = on;
        }

        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                console.log(event);
                console.log(next);
                toggleSpinner(true);
                $rootScope.error = null;
                if(config.checkAuthorization){

                    if (!userService.isAuthorized(next.access)) {
                               if (!userService.isLoggedOn()) {
                                   //next.templateUrl == "app/login/login.html";
                                   //                        $location.url("/Login");
                                   //common.showLogonScreen(true);
                                   toggleLogon(true);
           
                               } else {
                                   $location.url('/');//go to dashboard if logged in
                               }
                                   
                    }
                    
                }
                
            }
        
        );
        
        $rootScope.$on(events.controllerActivateSuccess,
            function(data) {
                 toggleSpinner(false);
            }
        );

        $rootScope.$on(events.spinnerToggle,
            function(data) {
                 toggleSpinner(data.show);
            }
        );

        $rootScope.$on(events.showLogonScreen,
            function (data) {
                console.log(data);
                 toggleLogon(true);
            }
        );
        $rootScope.$on(events.hideLogonScreen,
            function (data) {
                console.log(data);
                toggleLogon(false);
            }
        );
        
    };
})();