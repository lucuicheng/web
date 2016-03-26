'use strict';

var webApp = angular.module('owWebApp', ['ngAnimate', 'ngCookies',
  'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.router',
  'ui.bootstrap',

  'appController', 'appService', 'appRoute',
  'appDirective', 'appFilter']);

webApp
  .config(function ($locationProvider, $httpProvider) {
    //头信息处理
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    //location friendly
    //$locationProvider.html5Mode(true);

    //字符集处理
    // Override $http services's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {

      var param = function (obj) {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
          value = obj[name];

          if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (value instanceof Object) {
            for (subName in value) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (value !== undefined && value !== null) {
            query += encodeURIComponent(name) + '='
              + encodeURIComponent(value) + '&';
          }
        }

        return query.length ? query.substr(0, query.length - 1)
          : query;
      };

      return angular.isObject(data)
      && String(data) !== '[object File]' ? param(data)
        : data;
    }];

    //拦截器
    $httpProvider.interceptors.push('httpInterceptor');
  });

//全局常量
webApp.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});
webApp.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})

webApp.run(
  function ($rootScope, AUTH_EVENTS, authService) {

    //视图开始解析
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        //访问权限控制
        var authorizedRoles = null;

        if (!authService.isAuthorized(authorizedRoles)) {
          event.preventDefault();

          if (authService.isAuthenticated()) {
            console.log(' user is not allowed')
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);

          } else {
            console.log(' user is not logged in')
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

          }
        }

      });

    //视图解析完成
    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) {
      });

  });
