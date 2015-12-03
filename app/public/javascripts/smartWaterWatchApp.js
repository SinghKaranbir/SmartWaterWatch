var app = angular.module('smartApp', ['userModule','dashboardModule','ui.router', 'ngMaterial', 'ngMessages','chart.js']);

app.config(function ($stateProvider, $urlRouterProvider){
	$stateProvider

		.state('index',{
			url:'/index',
			views: {
				'' : { templateUrl: 'main.html',
					controller: 'UserCtrl'},
				'toolbar': {
					templateUrl : '/views/toolbar.html',
					controller: 'ToolbarCtrl',
					controllerAs:'toolbar'				}
			}
		})
		.state('dashboard',{
			url:'/dashboard',

			views: {
				'' : { templateUrl: 'dashboard.html'},
				'toolbar': {
					templateUrl : '/views/toolbar.html',
					controller : 'ToolbarCtrl',
					controllerAs : 'toolbar'
				}
			}

		})

		.state('dashboard.home',{
			url:'/home',
			templateUrl: '/views/home.html'
		})
		.state('dashboard.profile',{
			url:'/profile',
			templateUrl: '/views/profile.html',
			controller: 'ProfileCtrl',
			controllerAs: 'profile'
		})
		.state('dashboard.manage_sensors',{
			url:'/manage-sensors',
			templateUrl:'/views/manage_sensors.html'
		})

		.state('login',{
			url:'/login',
			data:'login',
			views: {
				'': {
					templateUrl: '/views/login.html',
					controller: 'UserCtrl'
				},
				'toolbar': {
					templateUrl : '/views/toolbar.html',
					controller: 'ToolbarCtrl',
					controllerAs:'toolbar'

				}
			}
		})
		.state('forgot',{
			url:'/forgot',
			data: 'forgot',
			views: {
				'' : {
					templateUrl: '/views/forgot.html',
					controller: 'UserCtrl'
				},
				'toolbar': {
					templateUrl : 'views/toolbar.html',
					controller:'ToolbarCtrl',
					controllerAs:'toolbar'

				}
			}
		});


	$urlRouterProvider.when('', '/index');
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


app.controller("LineCtrl", function ($scope) {

	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
});
