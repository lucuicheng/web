'use strict';

var apiModuleRoute = angular.module('apiModuleRoute', []);

apiModuleRoute.config(function ($stateProvider) {
    var dependencies = [
        '/scripts/services/teacherService.js',
        '/modules/api/controller.js',
        '/modules/api/service.js'
    ];
    $stateProvider
        .state('api-main', {
            url: '/api/index.htm',
            templateUrl: 'modules/api/views/main.html',
            controller: 'apiMainCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('api-list', {
            url: '/api/list.htm',
            templateUrl: 'modules/api/views/list.html',
            controller: 'apiListCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('api-detail', {
            url: '/api/detail.htm',
            templateUrl: 'modules/api/views/detail.html',
            controller: 'apiDetailCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        });
});
