'use strict';

var loginModuleRoute = angular.module('loginModuleRoute', ['ngRoute', 'ui.router']);

loginModuleRoute.config(function ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login.htm?type&id',
      templateUrl: 'modules/login/views/login.html',
      controller: 'loginCtrl',
    })
    .state('logout', {
      url: '/logout.htm?type&id',
      templateUrl: 'modules/login/views/logout.html',
      controller: 'loginCtrl',
    });
});
