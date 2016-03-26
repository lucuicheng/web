'use strict';

var blankModuleController = angular.module('blankModuleController', []);

blankModuleController.controller(
  'blankMainCtrl',
  function ($scope, $stateParams, teacherService) {
    $scope.formData = {}

    console.log('start');
    teacherService.queryListBy(
      $scope.formData
    ).success(function(data, status, header, config) {
      console.log('done');
      $scope.result = data;

    }).error(function(data, status, header, config) {

    });
    console.log('end');

  }
);

blankModuleController.controller(
  'blankListCtrl',
  function ($scope, $stateParams, teacherService) {
    $scope.formData = {}

    console.log('start');
    teacherService.queryListBy(
      $scope.formData
    ).success(function(data, status, header, config) {
      console.log('done');
      $scope.result = data;

    }).error(function(data, status, header, config) {

    });
    console.log('end');

  }
);

blankModuleController.controller(
  'blankDetailCtrl',
  function ($scope, $stateParams) {

  }
);
