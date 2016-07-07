'use strict';

var indexModuleRoute = angular.module('indexModuleRoute', []);

indexModuleRoute.config(function ($stateProvider) {
    var dependencies = [
        '/modules/index/controller.js',
        '/modules/index/service.js'
    ];
    $stateProvider
        .state('index-main', {
            url: '/index/basic.htm?type&id',
            templateUrl: 'modules/index/views/main.html',
            controller: 'indexMainCtrl',
            resolve: {delay:webApp.asyncJs(dependencies)},
        })
        .state('index-list', {
            url: '/index/list.htm?type&id',
            templateUrl: 'modules/index/views/list.html',
            controller: 'indexListCtrl',
            resolve: {delay:webApp.asyncJs(dependencies)},
        })
        .state('index-detail', {
            url: '/index/detail.htm?type&id',
            templateUrl: 'modules/index/views/detail.html',
            controller: 'indexDetailCtrl',
            resolve: {delay:webApp.asyncJs(dependencies)},
        });
});
