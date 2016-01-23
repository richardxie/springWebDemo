
'use strict';
// 通过 require 引入依赖
require("./services")
var myController = angular.module('myApp.controller', []);
myController.controller('TestCtrl1', [ '$scope',
	 	                  			
	function($scope) {
		$scope.who = 'i am here!';
	}
]);
	
myController.controller('CustListCtrl', [ '$scope', '$http', 'CustService',
	 	                function($scope, $http, CustService) {
	 		 				var vm = this;
	 		 				vm.list = function() {
 		 					CustService.list()
	 		 					.then(function(custs) {
	 		 					      $scope.custs = custs.data;
	 		 					       console.log('custs returned to controller.');
	 		 					},
	 		 					function() {
	 		 					    console.log('custs retrieval failed.')
	 		 					 });
	 		 				};
	 		 					        
	 		 				/*vm.list = function() {
	 		 					CustService.list()
	 		 					    .success(function(custs) {
	 		 					         $scope.custs = custs;
	 		 					     	console.log('custs returned to controller.');
	 		 					  	})
	 		 					  	.error(function() {
	 		 							console.log('custs retrieval failed.')
	 		 					    });		 					           
	 		 					};*/
	 		 					        
	 		 					vm.list();
	 	               			$scope.orderProp = 'age';
	 	                  	} ]);

myController.controller('CustDetailsCtrl', [
	 	                  		'$scope',
	 	                  		'$http',
	 	                  		'$routeParams',
	 	                  		'CustService',
	 	                  		function($scope, $http, $routeParams, CustService) {
	 	                  			$scope.custId = $routeParams.custId;
	 	                  			var vm = this;
	 		 						vm.details = function() {
	 		 							CustService.detail($routeParams.custId)
	 	 					          	.then(function(cust) {
	 	 					                $scope.cust = cust.data;
	 	 					                console.log('cust returned to controller.');
	 	 					            },
	 	 					            function(data) {
	 	 					               	console.log('cust retrieval failed.')
	 	 					            });
	 		 						};
	 	                  		vm.details();
	 	                  	} ]);