'use strict';
// 通过 require 引入依赖
var $ = require('jquery');
require("rxjs");
require("rx-angular");
require("./directives");

var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");

exports.getTokens = function() {
	return _csrf_token;
};


angular.module('rxApp', [ 'rx', 'rxApp.directive'])
	.config(["$httpProvider", '$locationProvider', function($httpProvider, $locationProvider) {
			$httpProvider.defaults.headers.common[_csrf_header] = _csrf_token;
			$locationProvider.html5Mode(true);
	}])
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