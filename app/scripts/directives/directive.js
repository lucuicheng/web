'use strict';

var appDirective = angular.module('appDirective', []);

//触摸指令-按住
appDirective.directive('ngTouchstart', [function () {
  return function (scope, element, attr) {
    element.on('touchstart', function (event) {
      scope.$apply(function () {
        scope.$eval(attr.ngTouchstart);
      });
    });
  };
}]);

//触摸指令-松开
appDirective.directive('ngTouchend', [function () {
  return function (scope, element, attr) {
    element.on('touchend', function (event) {
      scope.$apply(function () {
        scope.$eval(attr.ngTouchend);
      });
    });
  };
}]);

appDirective.directive('operateDialog', function (commonService, AUTH_EVENTS) {
  return {
    restrict: 'A',
    link: function ($scope, elem, attr) {
      var showDialog = function () {
        commonService.openOperateModel(null, null, '', {})
      };

      $scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      $scope.$on(AUTH_EVENTS.notAuthorized, showDialog);
      $scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
    }
  };
})

//播放指令-播放
appDirective.directive("ngPlay", ["$timeout", "$interval", function (timer, $interval) {
  return {
    restrict: "A",
    link: function ($scope, elem, attr) {
      timer(function () {
        var playWay = attr.playWay;//音频播放方式

        elem.on('click', function () {
          var src = attr.ngPlay;//音频来源
          var playSrc = elem.attr('play-src');//新的音频来源

          if (playSrc != null && typeof(playSrc) != 'undefined') {
            src = playSrc;
          }

          var audio = null;
          if (!(elem.find('audio').length > 0 )) {//第一次创建
            elem.append('<audio src="' + src + '"></audio>');
            audio = elem.find('audio').get(0);//坑点
          } else {//已经存在时判断
            audio = elem.find('audio').get(0);
            console.log($(audio).attr('src') + "\n" + src);
            if ($(audio).attr('src') != src) {//新来源时重建,否在还是同样的audio
              elem.find('audio').remove();
              elem.append('<audio src="' + src + '"></audio>');
              audio = elem.find('audio').get(0);
            }
          }

          $scope.timePromise = $interval(function () {//开始计时
            if (audio.ended) {
              elem.find('.audio-icon').css({
                'background-image': "url('http://wx.dfzhgx.com/images/audio-icon.png')"
              });
              $interval.cancel($scope.timePromise);
            }
            console.log(1)
          }, 10);

          if (audio.paused) {
            elem.find('.audio-icon').css({
              'background-image': "url('http://wx.dfzhgx.com/images/audio-icon.gif')"
            });
            audio.play();
            return;
          } else if (audio.play) {
            elem.find('.audio-icon').css({
              'background-image': "url('http://wx.dfzhgx.com/images/audio-icon.png')"
            });
            audio.pause();
          }


        });

      }, 0);
    }
  };
}]);


//选择指令-选择
appDirective.directive("customSelect", ["$timeout", function (timer) {
  return {
    restrict: "A",
    link: function ($scope, elem, attr) {
      timer(function () {

        elem.on('click', function () {

          if (elem.find('.audio-edit').attr('class').indexOf('selected') < 0) {
            $('.audio-edit').removeClass('selected');
            elem.find('.audio-edit').addClass('selected');
          } else {
            elem.find('.audio-edit').removeClass('selected');
          }

        });

      }, 0);
    }
  };
}]);

//渲染后处理1
appDirective.directive("handleHtmlPart", ["$timeout", function (timer) {
  return {
    restrict: "A",
    link: function ($scope, elem, attr) {
      timer(function () {
        //alert($(elem.context).text());
        $scope.$watch(function () {

          elem.find('img').parent().css({'margin': '0rem'});
          elem.find('p').each(function () {
            if ($(this).text() != null && $(this).text().trim().length == 4) {
              $(this).css({'font-size': '1.6rem', 'color': '#333333'});
            }
          });

        });
      }, 0);
    }
  };
}]);

//轮播指令
appDirective.directive("owlCarousel", ["$timeout", function (timer) {
  return {
    restrict: "A",
    link: function ($scope, elem, attr) {
      timer(function () {
        //alert($(elem.context).text());
        $scope.$watch(function () {
          if ($scope.list != null) {
            var owl = $("#owl-demo");

            owl.owlCarousel({
              navigation: false,
              slideSpeed: 400,
              pagination: false,
              paginationSpeed: 400,
              singleItem: true,
              rewindNav: false,
              dragBeforeAnimFinish: true,
              mouseDrag: false,
              touchDrag: true,

              afterMove: function () {
                elem.attr('data-current', this.owl.currentItem)
                $scope.$apply(function () {
                  $scope.$eval(attr.owlCarousel);
                });
              },
            });
          }
        });
      }, 0);
    }
  };
}]);


//下拉刷新指令
appDirective.directive('loadingLabel', [function () {
  return {
    restrict: "EA",
    templateUrl: 'modules/common/views/loadingLabel.html',
    link: function ($scope, elem, attr) {

      var startX, startY, endX, endY, moveX, moveY, canMove, startLoad;

      var maxH = $(window).height();
      var maxW = $(window).width();

      var minH = maxH / 10;
      var minW = maxW / 6;

      /**
       * 手指开始触摸
       */
      function startStopScrolling(touchEvent) {
        var touch = touchEvent.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
      };
      document.addEventListener('touchstart', startStopScrolling, false);

      /**
       * 手指离开
       */
      function endMoveScrolling(touchEvent) {
        var touch = touchEvent.changedTouches[0];
        endX = touch.pageX;
        endY = touch.pageY;

        //离开时恢复默认事件
        touchEvent.returnValue = true;

        //开始并处理刷新时的数据
        if (startLoad) {
          $scope.$apply(function () {

            $scope.refresh()
              .then(function (data) {//先处理数据

                $scope.result = data.result;

                return data;//必须返回让下一个步骤处理
              }, function (error) {
                return error;//同样必须返回让下一个步骤处理
              })
              .then(function (data) {//数据处理结束后，页面开始动态效果

                $(".data-list").css({
                  'transform': 'translateY(0px)',
                  '-webkit-transform': 'translateY(0px)',
                  '-moz-transform': 'translateY(0px)',
                  'transition': 'all 500ms ease 0s',
                  '-moz-transition': 'all 500ms ease 0s',
                  '-webkit-transition': 'all 500ms ease 0s',
                  '-o-transition': 'all 500ms ease 0s'
                });
                startLoad = false;//刷新结束

              }, function (error) {

              });

          });
        } else {//未满足刷新条件时，下拉自动回到原位置
          $(".data-list").css({
            'transform': 'translateY(0px)',
            '-webkit-transform': 'translateY(0px)',
            '-moz-transform': 'translateY(0px)',
            'transition': 'all 500ms ease 0s',
            '-moz-transition': 'all 500ms ease 0s',
            '-webkit-transition': 'all 500ms ease 0s',
            '-o-transition': 'all 500ms ease 0s'
          });
        }

      };
      document.addEventListener('touchend', endMoveScrolling, false);

      /**
       * 手指移动
       */
      function moveScrolling(touchEvent) {
        var touch = touchEvent.touches[0];

        moveX = touch.pageX;
        moveY = touch.pageY;

        $(window).scroll(function () {//判断滚动的位置，滚动到顶部后吧，页面处于取消默认事件状态，开始下移数据区域
          if ($(window).scrollTop() == 0) {
            canMove = false;
          } else {
            canMove = true;
          }
          ;
        });

        if (!canMove) {
          //取消默认事件，无法滚动
          touchEvent.preventDefault();

          //手指向下滑动，下移数据区域
          if (startY <= moveY) {
            var height = (parseInt(moveY) - parseInt(startY));

            //计算下移的位置、距离等
            var minH = 100;
            var maxH = parseInt(3 * $(window).height() / 4);
            var percent = (parseFloat(height / minH)).toFixed(2);

            //开始下移一段
            if (height <= minH && height >= 40) {
              height = height - 40;

              $(".data-list").css({
                'transform': 'translateY(' + height + 'px)',
                '-webkit-transform': 'translateY(' + height + 'px)',
                '-moz-transform': 'translateY(' + height + 'px)',

                'transition': 'all 0ms linear 0s',
                '-moz-transition': 'all 0ms linear 0s',
                '-webkit-transition': 'all 0ms linear 0s',
                '-o-transition': 'all 0ms linear 0s'
              });
            } else if (height > minH) {//超过下移区域后才能刷新
              startLoad = true;
            }

          }
        }
        ;

        if (startY >= moveY) {//手指向上滑动，恢复默认事件
          touchEvent.returnValue = true;
        }

      };
      document.addEventListener('touchmove', moveScrolling, false);
    }
  };
}]);
