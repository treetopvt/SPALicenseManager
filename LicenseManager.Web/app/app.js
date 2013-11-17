(function () {
    'use strict';
    
    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)
        'ngCookies',        //provides access to the cookie store

        // Custom modules 
        'common',           // common functions, logger, spinner
        'common.bootstrap', // bootstrap dialog wrapper functions

        // 3rd Party Modules
        'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
    ]);
    
    // Handle routing errors and success events
    //convention, put all angular dependencies first, then follow them with all app related dependencies (ie: datacontext)
    app.run(['$route', '$rootScope', '$q', 'routemediator',
    function ($route, $rootScope, $q, routemediator) {
        // Include $route to kick start the router.
        breeze.core.extendQ($rootScope, $q); //translation of promises from breeze to angular, need to add dependencies in app.run function
        routemediator.setRoutingHandlers();
    }]);
})();