'use strict';
// 通过 require 引入依赖
var $ = require('jquery');
require("angular");
require("angular-route");
require("angular-messages");


var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");

var login = angular.module('main.login', ['ngRoute', 'ngMessages']);
login.config([ '$httpProvider', 
	function($httpProvider) {
		$httpProvider.defaults.headers.common[_csrf_header] = _csrf_token;
	} 
]);

login.controller('LoginCtrl', ["$scope", "$http", function($scope, $http) {
	console.log("i'm in loginCtrl");
	$scope.user = {
        name:'',
        password:''
    };
}]);

login.controller('RegCtrl', ["$scope", "$http", "$window", function($scope, $http, $window) {
	console.log("i'm in RegCtrl");
    var vm = this;
	$scope.user = {
        name:'',
        email:'',
        age:''
    };

    $scope.register = function() {
        console.log("register for:" + $scope.user.username + " and email:" + $scope.user.email);
        $http.post('/register', {
                name: $scope.user.username,
                email: $scope.user.email,
                age: 32
            })
            .success(function(custs) {
                $scope.custs = custs;
                console.log('custs returned to controller.');
                $window.location.href = '/';
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