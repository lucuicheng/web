'use strict';

var demoModuleController = angular.module('demoModuleController', []);

demoModuleController.controller(
    'demoMainCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);

demoModuleController.controller(
    'demoListCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);

demoModuleController.controller(
    'demoDetailCtrl',
    function ($scope, $stateParams) {
        $scope.formData = {}

        console.log('done');
    }
);
