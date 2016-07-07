'use strict';

var webApp = angular.module('webApp', ['ngAnimate', 'ngCookies',
    'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.router',
    'ui.bootstrap','pascalprecht.translate',

    'appController', 'appService', 'appRoute',
    'appDirective', 'appFilter']);

webApp
    .config(function ($locationProvider, $httpProvider) {
        //拦截器
        $httpProvider.interceptors.push('httpInterceptor');
    })
    .config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        //动态加载注册器
        webApp.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
        //动态加载js文件
        webApp.asyncJs = function (dependencies) {
            return ["$q", "$route", "$rootScope", function ($q, $route, $rootScope) {
                var deferred = $q.defer();
                var v = new Date().getTime();
                if (Array.isArray(dependencies)) {
                    for (var i = 0; i < dependencies.length; i++) {
                        dependencies[i] += "?v=" + v;
                    }
                } else {
                    dependencies += "?v=" + v;//v是版本号
                }
                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }];
        }
    })
    .config(function($translateProvider) {
        //国际化处理
        $translateProvider.useStaticFilesLoader({
            files : [ {
                prefix : '/i18n/locale-',
                suffix : '.json'
            } ]
        });
        $translateProvider.registerAvailableLanguageKeys([ 'en', 'zh' ], {
            'en_US' : 'en',
            'en_UK' : 'en',
            'zh_CN' : 'zh'
        });
        $translateProvider.preferredLanguage('en');
    });

//全局常量, 权限相关的事件
webApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});
//全局常量, 权限相关的几个页面(弹出框内容？)地址
webApp.constant('AUTH_PAGES', {
    login:'/login.htm',
    loginSuccess: '/login-success.htm',
    loginFailed: '/login-failed.htm',
    logoutSuccess: '/logout-success.htm',
    sessionTimeout: '/session-timeout.htm',
    notAuthenticated: '/not-authenticated.htm',
    notAuthorized: '/not-authorized.htm'
});

//具体的权限实施
webApp.run(
    function ($rootScope, $location, AUTH_EVENTS, authService) {

        //视图开始解析
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {


                /*//用户认证及访问权限控制 TODO 设置方法
                if(!authService.isAuthenticated() ) {//没有用户登录
                    console.log(' user is not logged in');

                    if(!authService.isNonAuthorization($location.path())) {//只有登录用户才可能有权限查看的页面
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        event.preventDefault();

                    } else {//未登录时，游客能够访问非授权页面
                        //do nothing
                        console.log('but can visit ');
                    }

                } else {//有用户登录
                    if (!authService.isAuthorized($location.path())) {//当前页面没授权,对用户而言所有页面都必须设置权限
                        console.log(' user is not allowed');
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        event.preventDefault();

                    }
                }*/
            });

        //视图解析完成
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
            });
    }
);
