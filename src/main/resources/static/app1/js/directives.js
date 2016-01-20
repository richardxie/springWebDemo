	'use strict';
	// 通过 require 引入依赖
	var myDirective = angular.module('myDirective', []);
	myDirective.directive('customers', function() {
	    return {
	        restrict: 'E',
	        templateUrl : 'dist/app1/component/cust_list.html',
	        replace: true
	    };
	});
	myDirective.directive('customercell', function() {
		return {
	        restrict : "A",
	        templateUrl : 'dist/app1/component/cust_list_cell.html',
	        replace: true,
	        transclude: true
	    };
	});