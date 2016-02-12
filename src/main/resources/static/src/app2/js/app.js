'use strict';
// 通过 require 引入依赖
var $ = require('jquery');
require('rx-lite');
require('rx-lite-angular');
require('angular-ui-router')
require('angular-ui-bootstrap')
require('angular-sanitize')
require('ng-dialog')
//require("angular-ui-select")
require("./directives");
require("./services");

var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");

exports.getTokens = function() {
	return _csrf_token;
};


angular.module('rxApp', [ 'rx', 'rxApp.directive', "rxApp.service", 'ui.router', 'ui.bootstrap', 'ui.select', 'ngSanitize', 'ngDialog'])
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
	                		return CustService.pagable('', 0, 2);
	              	}]
	          	},
	         	controller: 'MainCtrl'
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
	.config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                }
            });
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
	.controller('MainCtrl', ['$scope', '$rootScope','$state', 'custs', function($scope, $rootScope, $state, custs){
		$rootScope.jsonData = '{"foo": "bar"}';
        $rootScope.theme = 'ngdialog-theme-default';
		$scope.search = { //prototype 继承
		            		term: '',
							totalItems: 0,
							itemsPerPage: 2,
							currentPage: 1
						};
		$scope.results = [];
		$scope.custs = custs.data.content;
	}])
	.controller('RxCtrl', ["$scope", "$http", "rx", "ngDialog", "CustService",  function($scope, $http, rx, ngDialog, CustService ) {

		function searchCust(term) {
			var deferred = $http({ //
				url : "/cust/searchCustPagable",
				method : "post",
				data : {
					action : "namesearch",
					search : $scope.search.term,
					size: $scope.search.itemsPerPage,
					page: $scope.search.currentPage - 1,
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
		
  		$scope.setPage = function (pageNo) {
			$scope.search.currentPage = pageNo;

		};

		$scope.pageChanged = function() {
			console.log('Page changed to: ' + $scope.search.currentPage);
		};

		$scope.openDefault = function () {
                ngDialog.open({
                    template: 'firstDialogId',
                    controller: 'InsideCtrl',
                    className: 'ngdialog-theme-plain'
                });
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
					$scope.search.totalItems = val.totalElements;
					$scope.$apply();
					console.log($scope.results);
				}
			);

		$scope.$toObservable('search.term')
			.debounce(300)
			.map(function(data) { 
				console.log(data); 
				$scope.search.currentPage = 1;
				return data.newValue; })
			.distinctUntilChanged()
			.flatMapLatest(searchCust)
			.subscribe(function(val){ 
				$scope.results = val.content; 
				$scope.search.totalItems = val.totalElements;
				$scope.$apply();
			});

		var source1 = $scope.$toObservable('search.currentPage').map(function(value) {return value.newValue;});
		var source2 = $scope.$toObservable('search.itemsPerPage').map(function(value) {return value.newValue;});
		var source = source1.combineLatest(
        	source2,
        	function (s1, s2) { 
        		return s1 + ',' + s2; 
        	})
		.debounce(300)
		.subscribe(function(val){
				CustService.pagable($scope.search.term, val.split(',')[0] - 1, val.split(',')[1])
				.then(function(result) {
					$scope.results = result.data.content; 
					console.log(result);
				});
    			console.log(val);
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
	}])
	.controller("InsideCtrl", ["$scope", function($scope){
		$scope.dialogModel = {
                message : 'message from passed scope'
            };
	}]);