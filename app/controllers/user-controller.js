'use strict';

gardenApp.controller('UserController', function($scope, $window, UserFactory){

	$scope.isLoggedIn = false;

	$scope.login = () => {
		UserFactory.loginUser()
		.then( (userData) => {
		  $window.location.href = '#!/gardens';
		});
	};

  // Listen for changes to auth state; If logged in, change isLoggedIn to true so
  // the search input, add btn, and "logout" shows
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      $scope.$apply();
      $window.location.href = "#!/";
    }
  });

  $scope.logout = () => {
    UserFactory.logoutUser();
    $window.location.href = '#!/';
  };


});