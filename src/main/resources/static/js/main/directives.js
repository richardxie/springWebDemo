// 所有模块都通过 define 来定义
define(function(require, exports) {
	'use strict';
	// 通过 require 引入依赖
	var $ = require('jquery');
	require("angular");
	require("angular-route");
	var myDirective = angular.module('myDirective', []);
	myDirective.directive('customers', function() {
	    return {
	        restrict: 'E',
	        templateUrl : 'directive/cust_list.html',
	        replace: true
	    };
	});
	myDirective.directive('customercell', function() {
		return {
	        restrict : "A",
	        templateUrl : 'directive/cust_list_cell.html',
	        replace: true,
	        transclude: true
	    };
	});
});