'use strict';

var demoModuleRoute = angular.module('demoModuleRoute', []);

demoModuleRoute.config(function ($stateProvider) {
    var dependencies = [
        '/scripts/services/teacherService.js',
        '/modules/demo/controller.js',
        '/modules/demo/service.js'
    ];
    $stateProvider
        .state('demo-main', {
            url: '/demo/index.htm',
            templateUrl: 'modules/demo/views/main.html',
            controller: 'demoMainCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('demo-list', {
            url: '/demo/list.htm?type&id',
            templateUrl: 'modules/demo/views/list.html',
            controller: 'demoListCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('demo-detail', {
            url: '/demo/detail.htm?type&id',
            templateUrl: 'modules/demo/views/detail.html',
            controller: 'demoDetailCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('demo-demo', {
            url: '/demo/special/:name.htm?type&id',
            templateUrl: 'modules/demo/views/demo.html',
            controller: 'demoSpecialCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        });
});
