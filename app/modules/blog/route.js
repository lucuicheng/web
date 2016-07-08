'use strict';

var blogModuleRoute = angular.module('blogModuleRoute', []);

blogModuleRoute.config(function ($stateProvider) {
    var dependencies = [
        '/scripts/services/teacherService.js',
        '/modules/blog/controller.js',
        '/modules/blog/service.js'
    ];
    $stateProvider
        .state('blog-main', {
            url: '/blog/index.htm?type&id',
            templateUrl: 'modules/blog/views/main.html',
            controller: 'blogMainCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('blog-list', {
            url: '/blog/list.htm?type&id',
            templateUrl: 'modules/blog/views/list.html',
            controller: 'blogListCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('blog-detail', {
            url: '/blog/detail.htm?type&id',
            templateUrl: 'modules/blog/views/detail.html',
            controller: 'blogDetailCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        });
});
