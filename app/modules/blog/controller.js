'use strict';

webApp.register.controller(
    'blogMainCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);

webApp.register.controller(
    'blogListCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);

webApp.register.controller(
    'blogDetailCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}
        $scope.code = "";

        console.log('done');
    }
);
