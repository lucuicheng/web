'use strict';

var appRoute = angular.module('appRoute', ['ngRoute', 'ui.router']);

appRoute.config(
  function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'modules/blank/views/main.html',
        controller: 'blankMainCtrl',
      })
      .state('not-found', {
        url: '/not-found.htm',
        templateUrl: '404.html',
        controller: 'notFoundCtrl',
      });
    $urlRouterProvider
      .otherwise("/not-found.htm");
  });
