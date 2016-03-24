'use strict';

var blankModuleController = angular.module('blankModuleController', []);

blankModuleController.controller(
  'blankMainCtrl',
  ['$scope', '$stateParams','teacherService',
    function ($scope, $stateParams, teacherService) {
      $scope.formData = {}

      teacherService.queryListBy(
        $scope.formData
      ).success(function(data, status, header, config) {
        console.log(data)
        $scope.result = data;

      }).error(function(data, status, header, config) {

      });

    }
  ]
);

blankModuleController.controller(
  'blankListCtrl',
  ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }
  ]
);

blankModuleController.controller(
  'blankDetailCtrl',
  ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }
  ]
);
