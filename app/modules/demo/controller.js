'use strict';

webApp.register.controller(
    'demoMainCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);

webApp.register.controller(
    'demoListCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);

webApp.register.controller(
    'demoDetailCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);

demoModuleController.controller(
    'demoSpecialCtrl',
    function ($scope, $stateParams, commonService) {
        $scope.demo = {};
        $scope.demo.url = '/modules/demo/views/demo_' + $stateParams.name + '.html';

        $scope.$on('$includeContentError', function (event, contentErrorSpy) {
            commonService.openModelAuto('', 'DEMO_ERROR', null, null);
            $scope.demo.err = true;
        });
    }
);