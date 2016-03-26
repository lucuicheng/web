'use strict';

var loginModuleController = angular.module('loginModuleController', []);

loginModuleController.controller(
  'loginCtrl',
  function ($scope, $rootScope, AUTH_EVENTS, authService) {

    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function (credentials) {

      authService.login(credentials)
        .then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);

      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });

    };

  }
);
