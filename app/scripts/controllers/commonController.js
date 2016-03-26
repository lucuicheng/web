'use strict';

var commonModuleController = angular.module('commonModuleController', []);

commonModuleController.controller('applicationController',
  function ($scope, authService) {

    $scope.currentUser = null;
    $scope.isAuthorized = authService.isAuthorized;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };
  })

commonModuleController.controller('notFoundCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$stateParams',
  function ($scope, $rootScope, $state, $stateParams) {
    $scope.formData = {};

  }]);

commonModuleController.controller(
  'modalInfoInstanceCtrl',
  function ($scope, $uibModalInstance, type, message) {

    $scope.type = type;
    $scope.message = message;

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
);

commonModuleController.controller(
  'modalOperateInfoInstanceCtrl',
  function ($scope, $uibModalInstance, operate, message, params) {

    $scope.operate = operate;
    $scope.message = message;

    if (Boolean(params.type)) {
      $scope.operator = '-';
    } else {
      $scope.operator = '+';
    }

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
);
