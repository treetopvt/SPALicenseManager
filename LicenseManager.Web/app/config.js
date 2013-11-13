(function () {
    'use strict';

    var app = angular.module('app');

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    // For use with the HotTowel-Angular-Breeze add-on that uses Breeze
    var remoteServiceName = 'breeze/Breeze';

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };
    
    /* List all the roles you wish to use in the app
    * You have a max of 31 before the bit shift pushes the accompanying integer out of
    * the memory footprint for an integer
    */
    var roles = 
    [
        'public',
        'user',
        'admin'];

    /*
    Build out all the access levels you want referencing the roles listed above
    You can use the "*" symbol to represent access to all roles
     */
    var accessLevels =  {
        'public': "*",
        'anon': ['public'],
        'user': ['user', 'admin'],
        'admin': ['admin']
    };

    var config = {
        appErrorPrefix: '[HT Error] ', //Configure the exceptionHandler decorator
        docTitle: 'HotTowel: ',
        events: events,
        remoteServiceName: remoteServiceName,
        version: '2.0.0',
        userRoles: buildRoles(roles),
        accessLevels: buildAccessLevels(accessLevels, buildRoles(roles))
};

    app.value('config', config);
    
    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);
    
    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);
    //#endregion
   

    //#region Access Levels
    function buildRoles(roles) {

        var bitMask = "01";
        var userRoles = {};

        for (var role in roles) {
            var intCode = parseInt(bitMask, 2);
            userRoles[roles[role]] = {
                bitMask: intCode,
                title: roles[role]
            };
            bitMask = (intCode << 1).toString(2);
        }

        return userRoles;
    }

    /*
    This method builds access level bit masks based on the accessLevelDeclaration parameter which must
    contain an array for each access level containing the allowed user roles.
     */
    function buildAccessLevels(accessLevelDeclarations, userRoles) {

        var accessLevels = {};
        for (var level in accessLevelDeclarations) {

            if (typeof accessLevelDeclarations[level] == 'string') {
                if (accessLevelDeclarations[level] == '*') {

                    var resultBitMask = '';

                    for (var role in userRoles) {
                        resultBitMask += "1"
                    }
                    //accessLevels[level] = parseInt(resultBitMask, 2);
                    accessLevels[level] = {
                        bitMask: parseInt(resultBitMask, 2),
                        title: accessLevelDeclarations[level]
                    };
                }
                else console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'")

            }
            else {

                var resultBitMask = 0;
                for (var role in accessLevelDeclarations[level]) {
                    if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role]))
                        resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask
                    else console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'")
                }
                accessLevels[level] = {
                    bitMask: resultBitMask,
                    title: accessLevelDeclarations[level][role]
                };
            }
        }

        return accessLevels;
    }
    //#endregion

})();