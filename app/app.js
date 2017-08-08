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
			templateUrl: 'partials/home.html',
			controller: 'UserController'
		})
		.when('/gardens', {
			templateUrl: 'partials/garden-list.html',
			controller: 'GardenListController'
		})
		.when('/new-garden', {
			templateUrl: 'partials/new-garden.html',
			controller: 'NewGardenController'
		})
		.when('/add-plants/:gardenId', {
			templateUrl: 'partials/add-plants.html',
			controller: 'AddPlantsController'
		})
		.when('/gardens/detail/:gardenId', {
			templateUrl: 'partials/view-garden.html',
			controller: 'ViewGardenController'
		})
		.otherwise('/');
});