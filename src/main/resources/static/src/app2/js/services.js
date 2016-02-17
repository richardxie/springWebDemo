
// 通过 require 引入依赖
var myService = angular.module('rxApp.service', []);
	
/*
 * angluarjs $http return promise defaultly.
 * no need to customize a promise again
 * notice: json date is stored in returnObject.data
 */
myService.service('CustService', ["$http", "$q", function( $http, $q) {
	this.list = function() {
		return $http.get('/cust');
	};

	this.pagable = function(search, page, size) {
		return $http({
				url : "/cust/searchCustPagable",
				method : "post",
				data : {
					page: page,
					size: size,
					search: search
				}
			});
	};

	this.detail = function(custId) {
		return $http.get('/cust/' + custId);
	};

	this.edit  = function(custId, cust){
		return $http({
				url : "/cust/" + custId,
				method : "post",
				data : cust
			});
	}
}]);

myService.service('ProdService', ["$http", "$q", function( $http, $q) {
	this.list = function() {
		return $http.get('/prod');
	};

	this.pagable = function(search, page, size) {
		return $http({
				url : "/prod/searchProdPagable2",
				method : "post",
				data : {
					page: page,
					size: size,
					search: search
				}
			});
	};

	this.detail = function(prodId) {
		return $http.get('/prod/' + prodId);
	};

	this.edit  = function(prodId, prod){
		return $http({
				url : "/prod/" + prodId,
				method : "post",
				data : prod
			});
	}
}]);