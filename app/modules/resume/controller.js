'use strict';

webApp.register.controller(
    'resumeMainCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);

webApp.register.controller(
    'resumeListCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {};

    }
);

webApp.register.controller(
    'resumePageCtrl',
    function ($scope, $stateParams, $rootScope) {
        $scope.formData = {};
        console.log($rootScope.pageClass);
        console.log('done');
    }
);

resumeModuleController.controller(
    'resumeDetailCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);
