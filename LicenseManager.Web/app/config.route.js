(function () {
    'use strict';

    var app = angular.module('app');
    
    // Collect the routes
    app.constant('routes', getRoutes());
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        //function (r) {
        //    $routeProvider.when(r.url, r.config);
        //}
       
        routes.forEach(function (r) {
            //$routeProvider.when(r.url, r.config);
            setRoute(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
        

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
    //getRoutes.$inject = ['config'];
    function getRoutes() {
        
        var access = routingConfig.accessLevels;
      //  var userLevel = access.user;
        return [
            {
                url: '/dashboard',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    access: access.user,
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    access: access.admin,
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="icon-lock"></i> Admin'
                    }
                }
            }, {
                url: '/',
                config: {
                    access: access.anon,
                    title: 'Login',
                    templateUrl: 'app/login/login.html',
                    settings: {
                    }
                }
            }
        ];
    }
})();