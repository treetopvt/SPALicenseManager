(function () {
    'use strict';

    // Factory name is handy for logging
    var serviceId = 'userService';

    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    // TODO: replace app with your module name
    angular.module('app').factory(serviceId, ['$http', userService]);

    function userService($http) {
        
        // Define the functions and properties to reveal.
        var service = {
            isLoggedOn: false,
            userName: '',
            login: login,
            logoff:logoff,
            register: register,
            credential: credential,

        };

        var svc = this;
        svc.accessToken = '';
        svc.isLoggedOn = false;

        //@property {string} baseAdress - Base address for the api calls
        var baseAdress = "/api/account";
        var loginUrl = "/Token";
        return service;
        



        //#region Public Methods
        function credential(username, password, rememberme) {
            this.userName = username;
            this.password = password;
            this.rememberMe = rememberme;
        }

        function login(user) {

            var data = {
                grant_type: "password",
                username: user.userName,
                password: user.password
            };
            $.ajax(loginUrl, {
                type: "POST",
                data: data
            }).success(function (data, status, headers, config) {
                if (data.success) {
                    this.userName = data.userName;
                    svc.isLoggedOn = true;
                    svc.accessToken = data.access_Token;
                } else {
                    //login failed
                    this.isLoggedOn = false;
                    this.userName = '';

                }
                // data contains the response
                // status is the HTTP status
                // headers is the header getter function
                // config is the object that was used to create the HTTP request
            }).error(function (data, status, headers, config) {
                //login failed
                this.isLoggedOn = false;
                this.userName = '';
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

        //#endregion
    }
})();