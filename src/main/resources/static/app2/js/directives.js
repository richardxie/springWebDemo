'use strict';
// 通过 require 引入依赖
var myDirective = angular.module('rxApp.directive', []);
myDirective.directive('myButton', function() {
	return {
		restrict: 'AE',
		replace : true,
        transclude : true,
	 	scope : {
            title : '=expanderTitle'
        },
        template: '<div>'
                 + '<div class="title" ng-click="toggle()">{{title}}</div>'
                 + '<div class="body" ng-show="showMe" ng-transclude></div>'
                 + '</div>',
        link : function(scope, element, attrs) {
            scope.showMe = false;
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
            }
        }

	};
});

myDirective.directive('rxDrag', ["$document", "$window", "rx", function($document, $window, rx) {
    return function(scope, element, attrs) {
      // Get the three major events
      var mouseup   = rx.Observable.fromEvent(element,   'mouseup');
      var mousemove = rx.Observable.fromEvent($document, 'mousemove');
      var mousedown = rx.Observable.fromEvent(element,   'mousedown').map(function (event) {
          // calculate offsets when mouse down
          event.preventDefault();
          return {
              left: event.clientX - element[0].getBoundingClientRect().left,
              top:  event.clientY - element[0].getBoundingClientRect().top,
          };
      });

      // Combine mouse down with mouse move until mouse up
      var mousedrag = mousedown.selectMany(function(imageOffset) {
          return mousemove.map(function (pos) {
              // calculate offsets from mouse down to mouse moves
              return {
                  left: pos.clientX - imageOffset.left,
                  top:  pos.clientY - imageOffset.top
              };
          }).takeUntil(mouseup);
      });

      mousedrag.subscribe (function (pos) {
          // Update position
          element.css({top: pos.top + 'px', left: pos.left + 'px'});
      });

    };
  }]);
