'use strict';
// 通过 require 引入依赖
var $ = require('jquery');
require("angular");

var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");

angular.module('main.login', [])
.controller('loginCtrl', ["$scope", "$http", "rx", function($scope, $http, rx) {
	console.log("i'm in loginCtrl");
}]);