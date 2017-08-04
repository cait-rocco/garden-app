'use strict';

gardenApp.controller("NavController", function($scope, $window, FilterFactory, UserFactory) {


  $scope.searchText = FilterFactory;
  $scope.isLoggedIn = false;

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
