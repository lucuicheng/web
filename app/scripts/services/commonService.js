'use strict';

var commonModuleService = angular.module('commonService', []);

//通用服务方法
commonModuleService.factory('commonService', function ($http, $state, $q, $uibModal) {

  var service = { // our factory definition

    getParams: function (params) {
      return params;
    },

    getBaseParams: function () {
      return {
        'url': 'http://192.168.5.10:9000/',
        /*'url' : 'http://www.dfzhgx.com/',*/
        'project': 'owWeb'
      };
    },

    getSyncData: function (url, params) {
      var deferred = $q.defer();

      $http.post(url, params)
        .success(function (data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function (data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    },

    handleSyncData: function (url, params) {
      var deferred = $q.defer();

      $http.get(url, params)
        .success(function (data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function (data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    },

    openOperateModel: function (target, operate, message, params) {
      var base = this;
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/common/views/operateModal.html',
        controller: 'modalOperateInfoInstanceCtrl',
        resolve: {
          target: function () {
            return target;
          },
          operate: function () {
            return operate;
          },
          message: function () {
            return message;
          },
          params: function () {
            return params;
          }
        }
      });
      modalInstance.opened.then(function () {//
        setTimeout(function () {
          modalInstance.close('auto close');
        }, 1500);
      });
      modalInstance.result.then(function (result) {
        //更新操作记录数 及 插入操作历史记录
        if(operate != null && target != null) {
          var url = base.getBaseParams().url + 'datas/'+target + '/' + operate + 'History/save';
          $http.post(url, params);
        }//TODO 优化只弹出一次

      }, function (reason) {
        console.log(reason);

      });
    },

    openModelAuto: function (type, message, cancelUrl, cancelUrlParams) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/common/views/modal.html',
        controller: 'modalInfoInstanceCtrl',
        resolve: {
          message: function () {
            return message;
          },
          type: function () {
            return type;
          }
        }
      });
      modalInstance.opened.then(function () {//打开
        //console.log('modal is opened');
        setTimeout(function () {
          modalInstance.close('auto close');
        }, 2000);
      });

      modalInstance.result.then(function (result) {//撤销
        //console.log(result);
        if (cancelUrl != null) {
          $state.go(cancelUrl, cancelUrlParams, {inherit: false, reload: true});
        }

      }, function (reason) {//关闭
        if (cancelUrl != null) {
          $state.go(cancelUrl, cancelUrlParams, {inherit: false, reload: true});
        }

      });
    }

  };

  return service;

});
