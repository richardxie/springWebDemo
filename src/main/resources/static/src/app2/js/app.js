'use strict';
// 通过 require 引入依赖
var $ = require('jquery');
require('rx-lite');
require('rx-lite-angular');
require('angular-ui-router')
require('angular-sanitize')
//require("angular-ui-select")
require("./directives");

var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");

exports.getTokens = function() {
	return _csrf_token;
};


angular.module('rxApp', [ 'rx', 'rxApp.directive', 'ui.router', 'ui.select', 'ngSanitize'])
	.config(["$httpProvider", '$locationProvider', '$stateProvider', '$urlRouterProvider',
		function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
			// For any unmatched url, redirect to /custs
  			$urlRouterProvider.otherwise("/custs");
			// Now set up the states
			$stateProvider
			.state('list' ,{
				url: '/custs',
				templateUrl: "/dist/app2/partials/state1.html",
				controller: 'RxCtrl'
			})
			.state('list.detail', {
				url: '/{custId:[0-9]{1,4}}',
				templateUrl: "/dist/app2/partials/state1.edit.html",
				controller: function($scope) {
					$scope.items = ["A", "List", "Of", "Items"];
				}
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

		function searchCust(term) {
			var deferred = $http({
				url : "/cust/searchCust",
				method : "post",
				data : {
					action : "namesearch",
					search : term,
					format : "json"
				}
			});

			return rx.Observable
				.fromPromise(deferred)
				.retry(2) // Retry 10 times then give up
				.map(
					function(response) {
						console.log(response);
						return response.data;
					}
				);
		}

		$scope.search = '';
		$scope.results = [];
		$scope.stateArray = [
	        {id: 1, name: 'normal'},
	        {id: 2, name: 'frozed'},
	        {id: 3, name: 'deleted'}
    	];

    	$scope.selectedItem= $scope.stateArray[0];

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
			.subscribe(function(val){ $scope.results = val; $scope.$apply();});
		}
	]);