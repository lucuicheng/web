'use strict';

var projectModuleRoute = angular.module('projectModuleRoute', []);

projectModuleRoute.config(function ($stateProvider) {
    var dependencies = [
        '/scripts/services/teacherService.js',
        '/modules/project/controller.js',
        '/modules/project/service.js'
    ];
    $stateProvider
        .state('project-main', {
            url: '/project/index.htm',
            templateUrl: 'modules/project/views/main.html',
            controller: 'projectMainCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('project-list', {
            url: '/project/list.htm?type&id',
            templateUrl: 'modules/project/views/list.html',
            controller: 'projectListCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('project-detail', {
            url: '/project/detail.htm?type&id',
            templateUrl: 'modules/project/views/detail.html',
            controller: 'projectDetailCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        });
});
