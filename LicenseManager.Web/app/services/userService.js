(function () {
    'use strict';

    // Factory name is handy for logging
    var serviceId = 'userService';

    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    // TODO: replace app with your module name
    angular.module('app').factory(serviceId, ['$http', '$cookieStore', userService]);

    function userService($http, $cookieStore, config) {
        
        // Define the functions and properties to reveal.
        var service = {
            isLoggedOn: isLoggedOn,
            login: login,
            logoff:logoff,
            register: register,
            credential: credential,
            isAuthorized:isAuthorized
        };
        var svc = this;

        var accessLevels = routingConfig.accessLevels;
        var userRoles = routingConfig.userRoles;
        var currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

        svc.accessLevels = accessLevels;
        svc.userRoles = userRoles;
        svc.currentUser = currentUser;
        
        //svc.accessToken = '';

        //@property {string} baseAdress - Base address for the api calls
        var baseAdress = "/api/account";
        var loginUrl = "/Token";
        return service;
        

        //#region Public Methods
        
        function isAuthorized(accessLevel, role) {
            ///use current user role if none is passed in
            if (role === undefined)
                role = currentUser.role;

            return accessLevel.bitMask & role.bitMask;
        }
        
        function isLoggedOn(user) {
            if (user === undefined)
                user = currentUser;
            return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
        }

        function credential(username, password, rememberme) {
            this.userName = username;
            this.password = password;
            this.rememberMe = rememberme;
        }

        function login(user, success, error) {

            var data = {
                grant_type: "password",
                username: user.userName,
                password: user.password
            };
            $.ajax(loginUrl, {
                type: "POST",
                data: data
            }).success(function (data, status, headers, config) {
                if (data.userName !=null && data.access_token !=null) {
                    //this.userName = data.userName;
                    changeUser(data);
                    svc.isLoggedOn = true;
                    svc.accessToken = data.access_token;
                    success(svc.currentUser);
                } else {
                    //login failed
                    this.isLoggedOn = false;
                    this.userName = '';
                    error({});
                }
                // data contains the response
                // status is the HTTP status
                // headers is the header getter function
                // config is the object that was used to create the HTTP request
            }).error(function (data, status, headers, config) {
                //login failed
                this.isLoggedOn = false;
                this.userName = '';
                error(data);
            });
            //$http({
            //    url: loginUrl,
            //    method: "POST",
            //    data: data,
            //}).success(function (data, status, headers, config) {
            //    if (data.success) {
            //        this.userName = data.userName;
            //        svc.isLoggedOn = true;
            //        svc.accessToken = data.access_Token;
            //    } else {
            //        //login failed
            //        this.isLoggedOn = false;
            //        this.userName = '';

            //    }
            //    // data contains the response
            //    // status is the HTTP status
            //    // headers is the header getter function
            //    // config is the object that was used to create the HTTP request
            //}).error(function (data, status, headers, config) {
            //    //login failed
            //    this.isLoggedOn = false;
            //    this.userName = '';
            //});            
        }
        
        function logoff() {
            
        }
        
        function register(newUser) {
            
        }
        //#endregion
  
        //#region Internal Methods        

        function changeUser(user) {
            _.extend(currentUser, user);
        };
        
        function _getRoles(roleArrayString) {
            var rtnArray = roleArrayString.split(',');

            return rtnArray;

        }
        //#endregion
    }
})();