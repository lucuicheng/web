'use strict';

var resumeModuleRoute = angular.module('resumeModuleRoute', []);

resumeModuleRoute.config(function ($stateProvider) {
    var dependencies = [
        '/scripts/services/teacherService.js',
        '/modules/resume/controller.js',
        '/modules/resume/service.js'
    ];
    $stateProvider
        .state('resume-main', {
            url: '/resume/index.htm',
            templateUrl: 'modules/resume/views/main.html',
            controller: 'resumeMainCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('resume-list', {
            url: '/resume/list',
            templateUrl: 'modules/resume/views/list.html',
            controller: 'resumeListCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('resume-detail', {
            url: '/resume/detail.htm',
            templateUrl: 'modules/resume/views/detail.html',
            controller: 'resumeDetailCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        /*嵌套后可以使用另外一种切换视图的效果*/
        .state('resume-list.education', {
            url:'/education.htm',
            templateUrl: 'modules/resume/views/pageEducation.html',
            controller: 'resumePageCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('resume-list.experience', {
            url:'/experience.htm',
            templateUrl: 'modules/resume/views/pageExperience.html',
            controller: 'resumePageCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        })
        .state('resume-list.projects', {
            url:'/projects.htm',
            templateUrl: 'modules/resume/views/pageProjects.html',
            controller: 'resumePageCtrl',
            resolve: {
                delay: webApp.asyncJs(dependencies)
            },
        });
});
