
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

	this.pagable = function() {
		return $http({
				url : "/cust/searchCustPagable",
				method : "post",
				data : {
					page: 1,
					size: 2,
					search: ""
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