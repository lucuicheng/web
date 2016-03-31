'use strict';

var blankModuleController = angular.module('blankModuleController', []);

blankModuleController.controller(
    'blankMainCtrl',
    function ($scope, $stateParams, teacherService) {
        $scope.formData = {}

        teacherService.queryListBy(
            $scope.formData
        ).success(function (data, status, header, config) {
            $scope.result = data;

        }).error(function (data, status, header, config) {

        });

    }
);

blankModuleController.controller(
    'blankListCtrl',
    function ($scope, $stateParams, teacherService) {
        $scope.formData = {}

        console.log('start to fetch data...');
        teacherService.queryListBy(
            $scope.formData
        ).success(function (data, status, header, config) {
            $scope.list = data;

        }).error(function (data, status, header, config) {

        });

        //对应下拉刷新操作，必须有这个方法
        $scope.refresh = function() {
            return teacherService.queryListSyncBy($scope.formData);
        };

        console.log('done');
    }
);

blankModuleController.controller(
    'blankDetailCtrl',
    function ($scope, $stateParams) {

    }
);
