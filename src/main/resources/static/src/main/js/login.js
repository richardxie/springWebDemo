'use strict';
// 通过 require 引入依赖
var $ = require('jquery');
require("angular");
require("angular-route");
require("angular-messages");


var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");

var login = angular.module('main.login', ['ngRoute', 'ngMessages']);
login.config([ '$routeProvider', 
	function($routeProvider) {
		$routeProvider.when('/login', {
				templateUrl : 'dist/main/partials/login.html',
				controller : 'LoginCtrl'
			}).when('/register', {
				templateUrl : 'dist/main/partials/register.html',
         		controller : 'RegCtrl'
         	}).otherwise({
         		redirectTo : '/login'
         	});
	} 
]);

login.controller('LoginCtrl', ["$scope", "$http", function($scope, $http) {
	console.log("i'm in loginCtrl");
	$scope.user = {
        name:'',
        password:''
    };
}]);

login.controller('RegCtrl', ["$scope", "$http", function($scope, $http) {
	console.log("i'm in RegCtrl");
    var vm = this;
	$scope.user = {
        name:'',
        email:'',
        age:''
    };

    $scope.register = function() {
        console.log("register for:" + $scope.user.name + " and email:" + $scope.user.email);
        $http.post('/cust')
            .success(function(custs) {
                $scope.custs = custs;
                console.log('custs returned to controller.');
            })
            .error(function() {
                console.log('custs retrieval failed.')
            }); 
    }

}]);

login.directive('validateName',function($http,$q){
    return {
        restrict:'A',
        require:'?^ngModel',
        link:function(scope,iele,iattr,ctrl){
            /*ctrl.$validators.validCharacters = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return value ? value.indexOf('bunny')!==-1 : true
            };*/
            ctrl.$asyncValidators.uniqueName = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                // Lookup user by username
                return $http.get('/cust/isExist?type='+ iattr.name + '&value=' + value)
                    .then(function resolved(res) {
                        if(res.data){
                            //用户名已经存在,验证失败,给下一个promise传递失败通知.
                            return $q.reject('res.data');
                        }
                        else {
                            //用户名不存在,验证成功.
                            return true
                        }

                    }, function rejected() {

                })
            };
        }
    }
});