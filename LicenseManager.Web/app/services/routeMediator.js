(function () {
    'use strict';

    // Factory name is handy for logging
    var serviceId = 'routemediator';

    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    angular.module('app').factory(serviceId, ['$location', '$rootScope', 'logger', 'config', routemediator]);

    function routemediator($location, $rootScope, logger, config) {
        // Define the functions and properties to reveal.

        var handleRouteChangeError = false; //guard logic so we don't get into infinite loop if home route doesn't exist
        var service = {
            setRoutingHandlers: setupRoutingHandlers,
        };

        return service;

        function setupRoutingHandlers() {
            updateDocTitle();
            handleRoutingErrors();
        }

        function handleRoutingErrors() {
            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                if (handleRouteChangeError) {
                    return;
                }

                handleRouteChangeError = true;
                var msg = 'Error routing: ' + (current && current.name + ', ' + (rejection.msg || ''));//added rejection message to error write
                logger.logWarning(msg, current, serviceId, true);
                $location.path('/'); //go to home page/dashboard on error
            });
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function (event, current, previous) {
                    handleRouteChangeError = false; //we are sucessful, so set this to false
                    var title = config.docTitle + ' ' + (current.title);
                    $rootScope.title = title;

                });

        }


        //#region Internal Methods        

        //#endregion
    }
})();