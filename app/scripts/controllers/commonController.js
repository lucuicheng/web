'use strict';

/**
 * @ngdoc function
 * @name owWebApp.controller:owWebAppController
 * @description
 * # owWebAppController
 * Controller of the owWebApp
 */
var commonModuleController = angular.module('commonModuleController', []);

commonModuleController.controller('notFoundCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$stateParams',
  function ($scope, $rootScope, $state, $stateParams) {
    $scope.formData = {};

  }]);

commonModuleController.controller('modalInfoInstanceCtrl', [ '$scope',
		'$uibModalInstance', 'type', 'message',
		function($scope, $uibModalInstance, type, message) {

			$scope.type = type;
			$scope.message = message;

			$scope.ok = function() {
				$uibModalInstance.close($scope.selected);
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

		} ]);

commonModuleController.controller('modalOperateInfoInstanceCtrl', [ '$scope',
		'$uibModalInstance', 'operate', 'message', 'params',
		function($scope, $uibModalInstance, operate, message, params) {

			$scope.operate = operate;
			$scope.message = message;

			if (Boolean(params.type)) {
				$scope.operator = '-';
			} else {
				$scope.operator = '+';
			}

			$scope.ok = function() {
				$uibModalInstance.close($scope.selected);
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

		} ]);
