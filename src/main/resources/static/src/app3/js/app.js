'use strict';
// 通过 require 引入依赖
require("angular");
var $ = require('jquery');	
var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");
var _http_header = {};
	
exports.getTokens = function() {
	return _csrf_token;
};
angular.module('themleaf', [])
.config(["$httpProvider", '$locationProvider', function($httpProvider, $locationProvider) {
	$httpProvider.defaults.headers.common[_csrf_header] = _csrf_token;
	$locationProvider.html5Mode(true);
}])
.controller('ThemleafCtrl', ["$scope", "$http", "rx", function($scope, $http, rx) {
	console.log("in ThemleafCtrl");
}]);