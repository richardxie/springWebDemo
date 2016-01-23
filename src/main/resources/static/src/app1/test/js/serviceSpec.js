'use strict';
describe('myApp service', function() {

  describe('CustService', function(){
  	var service, httpBackend;
  	//mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('myApp.service'));
    

    //模拟Controller，并且包含 $rootScope 和 $controller
    beforeEach(angular.mock.inject(function($injector, _$httpBackend_){
      httpBackend = _$httpBackend_;
      httpBackend.when('GET', '/cust').respond([{id: 1, name: 'Bob', email: 'bob@demo.com', age: 18}, {id:2, name: 'Jane', email: 'jane@demo.com', age: 16}]);
      //声明 Controller并且注入已创建的空的 scope
      service = $injector.get('CustService');

    }));
    it('should list 4 customers', function() {
        service.list().then(function(res){
            expect(res.data.length).toBe(2);
       });
       httpBackend.flush(); 
       expect(service).toBeTruthy();
    });
  });
});