'use strict';

var interceptor = angular.module('interceptor', []);

//拦截器
interceptor.factory('httpInterceptor', function ($q, $injector, AUTH_EVENTS) {

  var httpInterceptor = {

    'responseError': function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    },

    'response': function (response) {
      console.log('success');
      return response;
    }
  };

  return httpInterceptor;
});
