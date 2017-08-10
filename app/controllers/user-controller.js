'use strict';

gardenApp.controller('UserController', function($scope, $window, UserFactory){

	$scope.login = () => {
		UserFactory.loginUser()
		.then( (userData) => {
		  $window.location.href = '#!/gardens';
		});
	};

	$scope.logout = () => {
		UserFactory.logoutUser();
		$window.location.href = '#!/';
	};

});