'use strict';

var appService = angular.module('appService',
  [
    'interceptor',
    'authService',
    'commonService',
    'teacherService'
  ]);
