var publishVersion = '@version@';
var version = '20160115';

if(publishVersion.indexOf('@') < 0){
	version = publishVersion;
}

seajs.config({
	base: "/js/",
	alias: {
		"jquery": "jquery/jquery.js",
	     "angular": "angular/angular.js",
	   	 "angular-route": "angular/angular-route.js",
	   	 "angular-animate": "angular/angular-animate.js",
		 "rx.angular": "angular/rx.angular.js",
	   	 "rxjs": "rx/rx.lite.compat.min.js"
	},
	map: [
	    	[ /^(.*\.(?:css|js))(.*)$/i, '$1?v=' + version ]
		]
});