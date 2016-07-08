'use strict';

var blankModuleRoute = angular.module('blankModuleRoute', []);

blankModuleRoute.config(function ($stateProvider) {
    var dependencies = [
        '/scripts/services/teacherService.js',
        '/modules/blank/controller.js',
        '/modules/blank/service.js'
    ];
    $stateProvider
        .state('blank-main', {
            url: '/blank/index.htm?type&id',
            templateUrl: 'modules/blank/views/main.html',
            controller: 'blankMainCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('blank-list', {
            url: '/blank/list.htm?type&id',
            templateUrl: 'modules/blank/views/list.html',
            controller: 'blankListCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('blank-detail', {
            url: '/blank/detail.htm?type&id',
            templateUrl: 'modules/blank/views/detail.html',
            controller: 'blankDetailCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        });
});
