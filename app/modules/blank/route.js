'use strict';

var blankModuleRoute = angular.module('blankModuleRoute', ['ngRoute', 'ui.router', 'authService']);

blankModuleRoute.config(function ($stateProvider) {
  $stateProvider
    .state('blank-main', {
      url: '/blank/basic.htm?type&id',
      templateUrl: 'modules/blank/views/main.html',
      controller: 'blankMainCtrl',
    })
    .state('blank-list', {
      url: '/blank/list.htm?type&id',
      templateUrl: 'modules/blank/views/list.html',
      controller: 'blankListCtrl',
      resolve: {
        // 只有当它下面提到的承诺被处理之后
        // 才将控制器应用到路由。
          permission: function (authService) {
            return authService.permissionCheck();
          }
        }
      })
      .state('blank-detail', {
        url: '/blank/detail.htm?type&id',
        templateUrl: 'modules/blank/views/detail.html',
        controller: 'blankDetailCtrl',
      });
});
