'use strict';

var toolsModuleRoute = angular.module('toolsModuleRoute', []);

toolsModuleRoute.config(function ($stateProvider) {
    var dependencies = [
        '/scripts/services/teacherService.js',
        '/modules/tools/controller.js',
        '/modules/tools/service.js'
    ];
    $stateProvider
        .state('tools-main', {
            url: '/tools/index.htm',
            templateUrl: 'modules/tools/views/main.html',
            controller: 'toolsMainCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('tools-list', {
            url: '/tools/list.htm?type&id',
            templateUrl: 'modules/tools/views/list.html',
            controller: 'toolsListCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('tools-detail', {
            url: '/tools/detail.htm?type&id',
            templateUrl: 'modules/tools/views/detail.html',
            controller: 'toolsDetailCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        });
});
