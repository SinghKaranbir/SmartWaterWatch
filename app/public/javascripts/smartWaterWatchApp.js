var app = angular.module('smartApp', ['userModule','ngRoute', 'ngMaterial', 'ngMessages']).run(function($http, $rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function(){
		$http.get('auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';
		$location.path('/');
	};
});

app.config(function($routeProvider){
	$routeProvider

		.when('/',{
			templateUrl: 'main.html',
			controller: 'UserCtrl'
		})

		.when('/dashboard',{
			templateUrl:'dashboard.html',
			controller: 'dashboardController'
		})
		
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
/*app.controller('authController', function($scope, $http, $rootScope, $location){
	//$scope.user = {email: '', password: '', firstName: '', lastName: ''};
	//$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.firstName;
				$location.path('/dashboard');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.firstName;
				$location.path('/dashboard');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
});*/
