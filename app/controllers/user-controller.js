'use strict';

gardenApp.controller('UserController', function($scope, $window, UserFactory){

	$scope.login = () => {
		console.log("login clicked");
		UserFactory.loginUser()
		.then( (userData) => {
		  $window.location.href = '#!/build-garden';
		});
	};

	$scope.logout = () => {
		UserFactory.logoutUser();
		$window.location.href = '#!/';
	};

});