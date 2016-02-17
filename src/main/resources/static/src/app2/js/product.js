'use strict';
// 通过 require 引入依赖
angular.module('rxApp.product', [ 'rx', 'rxApp.directive', "rxApp.service", "rxApp.utils", 'ui.router', 'ui.bootstrap', 'ui.select', 'ngSanitize', 'ngDialog'])
	.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
		function($locationProvider, $stateProvider, $urlRouterProvider) {
			// For any unmatched url, redirect to /custs
  			$urlRouterProvider.otherwise("/prod");
			// Now set up the states
			$stateProvider
			.state('prod', {
				abstract: true,
				url: '/prod',
				templateUrl: '/dist/app2/partials/product/prod.html',
				resolve: {
	            	prods: ['ProdService',
	              		function( ProdService){
	                		return ProdService.pagable('', 0, 2);
	              	}]
	          	},
	         	controller: 'MainProdCtrl'
			})
			.state('prod.list' ,{
				url: '',
				templateUrl: "/dist/app2/partials/product/prod.list.html",
				controller: 'ListProdCtrl'
			})
			.state('prod.detail', {
				url: '/{prodId:[0-9]{1,4}}',
				templateUrl: "/dist/app2/partials/product/prod.edit.html",
				controller: 'EditProdCtrl'
			})
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
	.controller('MainProdCtrl', ['$scope', '$rootScope','$state', 'prods', 'utils', function($scope, $rootScope, $state, prods, utils){
		$rootScope.jsonData = '{"foo": "bar"}';
        $rootScope.theme = 'ngdialog-theme-default';
		$scope.search = { //prototype 继承
		            		term: '',
							totalItems: 0,
							itemsPerPage: 2,
							currentPage: 1
						};
		$scope.results = [];
		$scope.prods = prods.data.content;
	}])
	.controller('ListProdCtrl', ["$scope", "$http", "rx", "ngDialog", "ProdService",  function($scope, $http, rx, ngDialog, ProdService ) {

		/**
		* datapicker
		**/
		$scope.today = function() {
			$scope.dt = new Date();
		};
  		$scope.today();

  		$scope.open1 = function() {
			$scope.popup1.opened = true;
		};
		$scope.dateOptions = {
			formatYear: 'yy',
    		startingDay: 1
  		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
		$scope.altInputFormats = ['M!/d!/yyyy'];

		$scope.popup1 = {
			opened: false
		};

		function searchProd(term) {
			var deferred = $http({ //
				url : "/prod/searchProdPagable2",
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
			.flatMapLatest(searchProd)
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
			.flatMapLatest(searchProd)
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
				ProdService.pagable($scope.search.term, val.split(',')[0] - 1, val.split(',')[1])
				.then(function(result) {
					$scope.results = result.data.content; 
					console.log(result);
				});
    			console.log(val);
    		});

	}])
	.controller("EditProdCtrl", ["$scope", "$http", "$state", "$stateParams", "rx", "ProdService", "utils",
		function($scope, $http, $state, $stateParams, rx, ProdService, utils) {
			$scope.currentProd = '';
			$scope.stateArray = [
		        {id: 1, name: '停用'},
		        {id: 2, name: '启用'}
    		];

    		/*function whichState(name) {
    			for(var i =0; i < $scope.stateArray.length; i++) {
    				if($scope.stateArray[i].name == name) 
    					return $scope.stateArray[i];
    			}
    			return 'undefined';
    		}*/
    		$scope.selectedItem= $scope.stateArray[0];
			var vm = this;
		 	vm.getById = function(id) {
	 		 	ProdService.detail(id)
		 		 	.then(function(prod) {
		 		 		$scope.currentProd = prod.data;
		 		 		$scope.selectedItem= utils.findByName($scope.stateArray, $scope.currentProd.enableStatus);
		 		 		console.log('product returned to controller.');
		 		 	},
		 		 	function() {
		 		 		console.log('product retrieval failed.')
		 		 	});
		 		};

		 	vm.getById($stateParams.prodId);

		 	function editProd() {
				var deferred = $http({
					url : "/cust/" + $stateParams.prodId,
					method : "post",
					data : $scope.currentProd
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
				.flatMapLatest(editProd)
				.subscribe(
					function(results) {
						$scope.$apply();
						console.log(results);
						$state.go('prod.list', $stateParams);
					}
				);

			$scope.cancel = function () {
				// Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
				$state.go('prod.list', $stateParams);
			};
	}])
	.controller("InsideCtrl", ["$scope", function($scope){
		$scope.dialogModel = {
                message : 'message from passed scope'
            };
	}]);