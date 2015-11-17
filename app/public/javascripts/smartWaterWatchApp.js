var app = angular.module('smartApp', ['ngRoute', 'ngMaterial']).run(function($http, $rootScope) {
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
			controller: 'authController'
		})

		
		
});

app.config(function($mdThemingProvider){

	$mdThemingProvider.theme('default')
		.primaryPalette('indigo', {
			'default': '400', // by default use shade 400 from the pink palette for primary intentions
			'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
			'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
			'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
		})
		// If you specify less than all of the keys, it will inherit from the
		// default shades
		.accentPalette('orange', {
			'default': '200' // use shade 200 for default, and keep all other shades the same
		});



});

app.controller('authController', function($scope, $http, $rootScope, $location){
	$scope.user = {email: '', password: '', firstName: '', lastName: ''};
	$scope.error_message = '';

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
});

