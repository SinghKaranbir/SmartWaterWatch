var app = angular.module('smartApp', ['userModule','dashboardModule','ui.router', 'ngMaterial', 'ngMessages']).run(function($http, $rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function(){
		$http.get('auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';
		$location.path('/');
	};
});
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider){
	$stateProvider
		.state('index', {
			url: '/index',
			templateUrl: 'main.html',
			controller: 'UserCtrl'
		})
		.state('index.dashboard',{
			url:'/dashboard',
			templateUrl: 'dashboard.html',
			controller: 'dashboardCtrl'
		});

	$urlRouterProvider.when('', '/index');
	// use the HTML5 History API
	$locationProvider.html5Mode(true);
});

app.config(function($mdThemingProvider){

	$mdThemingProvider.theme('default')
		.primaryPalette('light-blue', {
			'default': '500',
			'hue-1': '50',
			'hue-2': '700',
			'hue-3' : '300'
		})
		.accentPalette('blue', {
			'default': 'A700' // use shade 200 for default, and keep all other shades the same
		})
		.backgroundPalette('grey');

	$mdThemingProvider.theme('custom')
		.primaryPalette('blue')
		.accentPalette('orange')
		.warnPalette('red');





});

app.controller('NavCtrl', function(){

});

