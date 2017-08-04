'use strict';

let gardenApp = angular.module("GardenApp", ["ngRoute"])
.constant("FirebaseUrl", "https://garden-app-46292.firebaseio.com/");

let isAuth = (UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if(userBoolean) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

gardenApp.config( ($routeProvider) => {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html',
			controller: 'UserController'
		})
		.when('/build-garden', {
			templateUrl: 'partials/build-garden.html',
			controller: 'BuildController'
		})
		.when('/plant-garden', {
			templateUrl: 'partials/plant-garden.html',
			controller: 'gardenCtrl'
		})
		.when('/my-garden', {
			templateUrl: 'partials/view-saved.html',
			controller: 'gardenCtrl'
		})
		.otherwise('/');
});