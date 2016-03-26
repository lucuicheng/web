'use strict';

var authService = angular.module('authService', []);

//身份认证和授权服务
authService.factory('authService', function ($http, $state, $q, sessionService, commonService) {

  var authService = {};

  authService.login = function (credentials) {
    var url = commonService.getBaseParams().url + 'datas/user/detail.json';
    return commonService.handleSyncData(url, params)
      .then(function(data) {
        sessionService.create(data.id, data.user.id, data.user.role);

        return data;
      });
  };

  authService.isAuthenticated = function () {
    return !!sessionService.userId;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
    authorizedRoles.indexOf(sessionService.userRole) !== -1);
  };

  return authService;

});


authService.service('sessionService', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
  return this;
})
