'use strict';

gardenApp.controller("NewGardenController", function($scope, $window, $route, UserFactory, GardenFactory) {

	let garden = {};
	let currentUser = null;

	$scope.newGarden = {
    	name: "",
    	//TODO get length and width multiplied by 96 and made a number
    	length: "",
    	width: "",
	};

	$scope.saveGarden = () => {
	    $scope.newGarden.uid = UserFactory.getUser();
		GardenFactory.saveNewGarden($scope.newGarden)
		.then((data) => {
			console.log("save worked", data);
			$window.location.href = `/#!/add-plants/${data.data.name}`;
		});
		// $route.reload();
	};

 });