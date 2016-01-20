	'use strict';
	// 通过 require 引入依赖
	var $ = require('jquery');
	require("rxjs");
	require("rx-angular");

	var _csrf_token = $("meta[name='_csrf']").attr("content");
	var _csrf_header = $("meta[name='_csrf_header']").attr("content");

	exports.getTokens = function() {
		return _csrf_token;
	};

	angular
			.module('rxApp', [ 'rx' ])
			.config(
					[
							"$httpProvider",
							function($httpProvider) {
								$httpProvider.defaults.headers.common[_csrf_header] = _csrf_token;
							} ]).controller(
					'RxCtrl',
					function($scope, $http, rx) {

						function searchWikipedia(term) {
							var deferred = $http({
								url : "/postOne",
								method : "post",
								data : {
									action : "opensearch",
									search : term,
									format : "json"
								}
							});

							return rx.Observable.fromPromise(deferred).map(
									function(response) {
										console.log(response);
										return response.data;
									});
						}

						$scope.search = '';
						$scope.results = [];

						/*
						 * The following code deals with: Creates a "submit"
						 * function which is an observable sequence instead of
						 * just a function.
						 */
						$scope.$createObservableFunction('submit').map(
								function(term) {
									return term;
								}).flatMapLatest(searchWikipedia).subscribe(
								function(results) {
									$scope.results = results;
									console.log($scope.results);
								});
					});