'use strict';
// 通过 require 引入依赖
var $ = require('jquery');
require('rx-lite');
require('rx-lite-angular');
require("angular-animate");
require('angular-ui-router')
require('angular-ui-bootstrap')
require('angular-sanitize')
require('ng-dialog')
require('./customer')
require('./product')
require("./directives");
require("./services");

var _csrf_token = $("meta[name='_csrf']").attr("content");
var _csrf_header = $("meta[name='_csrf_header']").attr("content");

exports.getTokens = function() {
	return _csrf_token;
};


angular.module('rxApp', [ 'rx','ui.router', 'ngAnimate', 'rxApp.customer', 'rxApp.product'])
	.config(["$httpProvider", '$locationProvider', '$stateProvider', '$urlRouterProvider',
		function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
			// For any unmatched url, redirect to /custs
  			$urlRouterProvider
  			.when('/c?id', '/custs/:id')
        	.when('/user/:id', '/custs/:id')
  			.otherwise("/");
			// Now set up the states
			$stateProvider
			.state('home' ,{
				url: '/',
				template: '<p class="lead">Welcome to the Spring Web Demo</p>' +
	            '<p>Use the menu above to navigate. ' +
	            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
	            '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
	            '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>',
			})
			.state('about', {
				url: '/about',
				template: '<p class="lead">Welcome to the Spring Web Demo v1.0</p>'
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
	]);