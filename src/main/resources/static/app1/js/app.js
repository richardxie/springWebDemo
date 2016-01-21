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

exports.getTokens = function() {
	return _csrf_token;
};

var app = angular.module('myApp', [ 'ngRoute', 'ngAnimate', 'myApp.controller', 'myApp.service', 'myApp.directive']);
app.config([ '$routeProvider', '$httpProvider', 
	function($routeProvider, $httpProvider) {
		$routeProvider.when('/custs', {
			templateUrl : 'dist/app1/partials/cust_list.html',
			controller : 'CustListCtrl'
		}).when('/custs/:custId', {
			templateUrl : 'dist/app1/partials/cust_details.html',
			controller : 'CustDetailsCtrl'
		}).when('/test', {
			templateUrl : 'dist/app1/partials/test.html',
			controller : 'TestCtrl1'
		}).otherwise({
			redirectTo : '/custs'
		});
		
		$httpProvider.defaults.headers.common[_csrf_header] = _csrf_token;
} ]).run(["$rootScope", "$window", function($rootScope, $window) {
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
}]);
