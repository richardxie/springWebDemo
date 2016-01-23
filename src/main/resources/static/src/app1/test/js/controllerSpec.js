'use strict';
describe('myApp controllers', function() {

  describe('CustListCtrl', function(){
  	var scope, service, controller, httpBackend;
  	//mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('myApp.controller', 'myApp.service'));

	//模拟Controller，并且包含 $rootScope 和 $controller
    beforeEach(angular.mock.inject(function($injector, $rootScope, $controller,$q, _$httpBackend_){
      
      httpBackend = _$httpBackend_;
      httpBackend.when('GET', '/cust').respond([{id: 1, name: 'Bob', email: 'bob@demo.com', age: 18}, {id:2, name: 'Jane', email: 'jane@demo.com', age: 16}]);
  		//创建一个空的 scope
      scope = $rootScope.$new();
      scope.custs = [];

     
      service = $injector.get('CustService');
  		//声明 Controller并且注入已创建的空的 scope
  		controller = $injector.get('$controller');

    }));

    it('should list 4 customers', function() {
      controller('CustListCtrl', {$scope: scope}).list();
      httpBackend.flush();
      console.log(scope.custs);
      expect(scope.custs.length).toBe(2);
    });
  });
});