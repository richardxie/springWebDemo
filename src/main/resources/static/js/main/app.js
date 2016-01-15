// 所有模块都通过 define 来定义
define(function(require, exports) {
	'use strict';
	// 通过 require 引入依赖
	var $ = require("jquery");
	require("angular");
	require("angular-route");
	require("angular-animate");
	require("./controllers");
	require("./directives")

	var _csrf_token = $("meta[name='_csrf']").attr("content");
	var _csrf_header = $("meta[name='_csrf_header']").attr("content");
	var _http_header = {};
	_http_header[_csrf_header] = _csrf_token;
	$.ajaxSetup({
		headers : _http_header,
		cache : false,
		statusCode : {
			403 : function(xhr) {
				window.location.href = "/login";
			}
		}
	});

	exports.getTokens = function() {
		return _csrf_token;
	};

	var app = angular.module('myApp', [ 'ngRoute', 'ngAnimate', 'myController', 'myService', 'myDirective']);
	app.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when('/custs', {
			templateUrl : 'html/cust_list.html',
			controller : 'CustListCtrl'
		}).when('/custs/:custId', {
			templateUrl : 'html/cust_details.html',
			controller : 'CustDetailsCtrl'
		}).when('/test', {
			templateUrl : 'html/test.html',
			controller : 'TestCtrl1'
		}).otherwise({
			redirectTo : '/custs'
		});
	} ]).run(function($rootScope, $window) {
		$rootScope.slide = '';
		$rootScope.$on('$routeChangeStart', function() {
			//event button to move backward  
			$rootScope.back = function() {
				$rootScope.slide = 'slide-right';
				$window.history.back();
			}
			//event button item list to move forward  
			$rootScope.next = function() {
				$rootScope.slide = 'slide-left';
			}
		});
	});

	//angular.bootstrap(document.body, ['myApp'])
});