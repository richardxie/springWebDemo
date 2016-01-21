'use strict';
// 通过 require 引入依赖
var $ = require('jquery');
require("angular");
require("./login");
	
var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");
var _http_header = {};
	
exports.getTokens = function() {
	return _csrf_token;
};
angular.module('main', [])
.config(["$httpProvider", function($httpProvider) {
	$httpProvider.defaults.headers.common[_csrf_header] = _csrf_token;
}])
.controller('mainCtrl', ["$scope", "$http", "rx", function($scope, $http, rx) {
	console.log("in mainCtrl");
}]);