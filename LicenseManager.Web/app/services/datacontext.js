(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
        ['common', 'entityManagerFactory', datacontext]);

    function datacontext(common, emFactory) {
        var $q = common.$q;

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getCustomers: getCustomers,
            getLicensesForOrganization: getLicensesForOrganization,
            getLicenseRequests: getLicenseRequests,
            insertCustomer: insertCustomer,
            updateCustomer: updateCustomer,
            getCustomersForOrganization: getCustomersForOrganization
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            var people = [
                {id:0, firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }

        function getCustomers(){
            var customers=[
                {firstName:'Tom', lastName:'Bull', address:'25 Osprey Ln', organization:{Id:0, Name:'DGI'}}
            ];
            return $q.when(customers);
        }

        function getLicensesForOrganization(organization) {
            if (organization) {
                var licenses = [
                    {
                        id: 0, licenseKey: '33XCMHJI2EJ1633600U720DJMRA78X', machineCode: 'GDFED', dateIssued: Date.now(),
                        issuedBy: {
                            id: 0, firstName: 'Tom', lastName: 'Bull', address: '25 Osprey Ln', organization: { Id: 0, Name: 'DGI' }
                        },
                        requestedBy: {
                            id:0, firstName: 'John', lastName: 'Papa'
                        }

                    }
                ];
                return $q.when(licenses);
            }
            return $q.when({});
        }
        function getLicenseRequests() {
            return $q.when({});
        }


        //#region "Customers"
        function insertCustomer(newCustomer) {
            var results = { success: true };
            return $q.when(results);
        }

        function updateCustomer(customer) {
            return $q.when(customer);
        }

        function getCustomersForOrganization(organization)
        {
            if (organization) {
                var customers=[
                    {id:0, firstName:'Chris', lastName:'Matthews', address:'25 Pennsylvania Ave', sex:'male', organization:{Id:0, Name:'ABCD'}},
                    {id:1, firstName:'Anna', lastName:'Adams', address:'1234 Homes Ln', sex:'female', organization:{Id:0, Name:'ABCD'}},
                    {id:2, firstName:'Dan', lastName:'Draper', address:'Denver, Colorado', sex:'male', organization:{Id:1, Name:'Private'}},
                    {id:3, title:'Chief', firstName:'Chris', lastName:'Tucker', address:'Andrews, Md', sex:'male', organization:{Id:2, Name:'ANGA'}}
                ];
            return $q.when(customers);
            }
            return $q.when({});
        }

        //#endregion
    }
})();