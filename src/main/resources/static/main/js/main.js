
	'use strict';
	// 通过 require 引入依赖
	var $ = require('jquery');
	
	var _csrf_token = $("meta[name='_csrf']").attr("content");
	var _csrf_header = $("meta[name='_csrf_header']").attr("content");
	var _http_header = {};
	_http_header[_csrf_header] = _csrf_token;
	$.ajaxSetup({
		headers: _http_header,
		cache: false,
		statusCode: {
			403: function(xhr) {
				window.location.href = "/login";
			}
		}
	});
	
	exports.getTokens = function() {
		return _csrf_token;
	};
	
	 $("button.clickme").click(function(){
			$.ajax({
				url : "/postOne",
				type : "post",
				dataType : "text",
				contentType :  "application/json",
				data : JSON.stringify({ 'foo': 'foovalue', 'bar': 'barvalue' }),
				success : function(result) {
					console.log("%o",result);
				},
				error : function(req, msg, e) {
					console.log("%o",e);
				}
			});
		});
	 