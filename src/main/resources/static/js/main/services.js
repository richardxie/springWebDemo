// 所有模块都通过 define 来定义
define(function(require, exports) {

	// 通过 require 引入依赖
	var $ = require('jquery');
	require("angular");
	require("angular-route");
	var myService = angular.module('myService', []);
	
	/*
	 * angluarjs $http return promise defaultly.
	 * no need to customize a promise again
	 * notice: json date is stored in returnObject.data
	 */
	myService.service('CustService', function($http, $q) {
		this.list = function() {
			return $http.get('/cust');
		};

		this.detail = function(custId) {
			return $http.get('/cust/' + custId);
		}
		
//		this.detail = function(custId) {
//			var def = $q.defer();
//			return $http.get('/cust/' + custId).success(
//				function(data) {
//					cust = data;
//					def.resolve(data);
//				}).error(function() {
//                    def.reject("Failed to get cust");
//                });
//			return def.promise;
//		};

	});
});