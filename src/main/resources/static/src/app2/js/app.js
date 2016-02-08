'use strict';
// 通过 require 引入依赖
var $ = require('jquery');
require('rx-lite');
require('rx-lite-angular');
require('angular-ui-router')
require('angular-ui-bootstrap')
require('angular-sanitize')
//require("angular-ui-select")
require("./directives");
require("./services");

var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");

exports.getTokens = function() {
	return _csrf_token;
};


angular.module('rxApp', [ 'rx', 'rxApp.directive', "rxApp.service", 'ui.router', 'ui.bootstrap', 'ui.select', 'ngSanitize'])
	.config(["$httpProvider", '$locationProvider', '$stateProvider', '$urlRouterProvider',
		function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
			// For any unmatched url, redirect to /custs
  			$urlRouterProvider.otherwise("/custs");
			// Now set up the states
			$stateProvider
			.state('custs', {
				abstract: true,
				url: '/custs',
				templateUrl: '/dist/app2/partials/custs.html',
				resolve: {
	            	custs: ['CustService',
	              		function( CustService){
	                		return CustService.pagable();
	              	}]
	          	},
	         	controller: ['$scope', '$state', 'custs',
		            function (  $scope,   $state,   custs ) {
		            	$scope.custs = custs.data.content;
					}]
			})
			.state('custs.list' ,{
				url: '',
				templateUrl: "/dist/app2/partials/custs.list.html",
				controller: 'RxCtrl'
			})
			.state('custs.detail', {
				url: '/{custId:[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}}',
				templateUrl: "/dist/app2/partials/custs.edit.html",
				controller: 'EditCtrl'
			})
			$httpProvider.defaults.headers.common[_csrf_header] = _csrf_token;
			//$locationProvider.html5Mode(true);
	}])
	.run(['$rootScope', '$state', '$stateParams',
		function ($rootScope,   $state,   $stateParams) {

			// It's very handy to add references to $state and $stateParams to the $rootScope
			// so that you can access them from any scope within your applications.For example,
			// <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
			// to active whenever 'contacts.list' or one of its decendents is active.
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
	    }
	])
	.controller('RxCtrl', ["$scope", "$http", "rx", function($scope, $http, rx) {

		$scope.totalItems = 64;
    	$scope.itemsPerPage = 2
  		$scope.currentPage = 0;
		function searchCust(term) {
			var deferred = $http({
				url : "/cust/searchCustPagable",
				method : "post",
				data : {
					action : "namesearch",
					search : term,
					size: $scope.itemsPerPage,
					page: $scope.currentPage,
					format : "json"
				}
			});

			return rx.Observable
				.fromPromise(deferred)
				.retry(2) // Retry 2 times then give up
				.map(
					function(response) {
						console.log(response);
						return response.data;
					}
				);
		}

		$scope.search = '';
		$scope.results = [];
		

  		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
			console.log('Page changed to: ' + $scope.currentPage);
		};

		/*
		 * The following code deals with: Creates a "submit"
		* function which is an observable sequence instead of
		* just a function.
		*/
		$scope.$createObservableFunction('submit')
			.debounce(300)
			.map(function(term) {
				console.log('submit clicked!' + term)
				return term;
			})
			.distinctUntilChanged()
			.flatMapLatest(searchCust)
			.subscribe(
				function(results) {
					$scope.results = results;
					$scope.$apply();
					console.log($scope.results);
				}
			);

		$scope.$toObservable('search')
			.debounce(300)
			.map(function(data) { console.log(data); return data.newValue; })
			.distinctUntilChanged()
			.flatMapLatest(searchCust)
			.subscribe(function(val){ 
				$scope.results = val.content; 
				$scope.$apply();
				//$scope.totalItems = val;
			});

	}])
	.controller("EditCtrl", ["$scope", "$http", "$state", "$stateParams", "rx", "CustService", 
		function($scope, $http, $state, $stateParams, rx, CustService) {
			$scope.currentCust = '';
			$scope.stateArray = [
		        {id: 1, name: 'normal'},
		        {id: 2, name: 'frozed'},
		        {id: 3, name: 'deleted'}
    		];
    		$scope.selectedItem= $scope.stateArray[0];
			var vm = this;
		 	vm.getById = function(id) {
	 		 	CustService.detail(id)
		 		 	.then(function(custs) {
		 		 		$scope.currentCust = custs.data;
		 		 		console.log('custs returned to controller.');
		 		 	},
		 		 	function() {
		 		 		console.log('custs retrieval failed.')
		 		 	});
		 		};

		 	vm.getById($stateParams.custId);

		 	function editCust() {
				var deferred = $http({
					url : "/cust/" + $stateParams.custId,
					method : "post",
					data : $scope.currentCust
				});

				return rx.Observable
					.fromPromise(deferred)
					.map(
						function(response) {
							console.log(response);
							return response.data;
						}
					);
			};

			$scope.$createObservableFunction('submit')
				.debounce(300)
				.map(function(term) {
					console.log('submit clicked!' + term)
					return term;
				})
				.flatMapLatest(editCust)
				.subscribe(
					function(results) {
						$scope.$apply();
						console.log(results);
						$state.go('custs.list', $stateParams);
					}
				);

			$scope.cancel = function () {
				// Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
				$state.go('custs.list', $stateParams);
			};
	}]);