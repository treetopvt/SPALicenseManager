(function () {
    'use strict';

    var app = angular.module('app');
    
    // Collect the routes
    app.constant('routes', getRoutes());
    // Configure the routes and route resolvers
    app.config(['$routeProvider','$locationProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider,$locationProvider, routes) {

        //function (r) {
        //    $routeProvider.when(r.url, r.config);
        //}
       
        routes.forEach(function (r) {
            //$routeProvider.when(r.url, r.config);
            setRoute(r.url, r.config);
        });
        //$routeProvider.otherwise({ redirectTo: '/' });
        
        //when following line is set to true, no #'s are needed in the URL, but you need to set up server side redirects
        //so if someone tries to deep navigate before the page is loaded, then the server should redirect to index.html (page that hosts the SPA)
               // $locationProvider.html5Mode(true);

        //sets the resolvers for all the routes
        //by extending any existing resolvers (or creating a new one)
        function setRoute(url, definition) {
            
            //angular extend is a helper method that will NOT overwrite any existing resolves, just will add to them.
            //following call will add the prime function to the route for resolve
            //resolve || {} will create an object literal if resolve doesn't exist
            //definition.resolve = angular.extend(definition.resolve || {}, {
            //    prime: prime
            //});
            
            $routeProvider.when(url, definition);
            return $routeProvider;
        }    
    }


    // Define the routes 
    function getRoutes() {
        
        var access = routingConfig.accessLevels;
      //  var userLevel = access.user;
        return [
            {
                url: '/dashboard',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                   // access: access.user,
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="glyphicon glyphicon-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                   // access: access.admin,
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="glyphicon glyphicon-lock"></i> Admin'
                    }
                }
            }, {
                url: '/Login',
                config: {
                    access: access.anon,
                    title: 'Login',
                    templateUrl: 'app/login/login.html',
                    settings: {
                    }
                }
            }, {
                url: '/CreateLicense',
                config: {
                    access: access.user,
                    title: 'Generate License',
                    templateUrl: 'app/partials/CreateNewLicense.html',
                    settings: {
                    }
                }
            }

        ];
    }
})();