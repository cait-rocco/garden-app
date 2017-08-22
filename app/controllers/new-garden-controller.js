'use strict';

gardenApp.controller("NewGardenController", function($scope, $window, $route, UserFactory, GardenFactory) {

	let garden = {};
	let currentUser = null;

	UserFactory.isAuthenticated()
  	.then( (user) => {
	    currentUser = UserFactory.getUser();
	    fetchVegetables();
  	});

	$scope.newGarden = {
    	name: "",
    	length: "",
    	width: "",
    	tomato: false,
    	cucumber: false,
    	potato: false,
    	carrot: false,
    	onion: false,
    	lettuce: false,
    	radishes: false,
    	cabbage: false,
    	pepper: false,
    	corn: false,
    	broccoli:false,
    	peas: false,
    	garlic: false,
    	greenBeans: false,
    	eggplant: false,
    	chiliPepper: false,
    	redPotato: false
    	// {{vegetable}}: false
	};

	$scope.saveGarden = () => {
	    $scope.newGarden.uid = UserFactory.getUser();
		GardenFactory.saveNewGarden($scope.newGarden)
		.then((data) => {
			$window.location.href = `/#!/add-plants/${data.data.name}`;
			fetchVegetables();
		});
	};

	function fetchVegetables() {
	    let veggieArr = [];
	    GardenFactory.getVegetables()
	    .then( (veggieList) => {
	      let veggieData = veggieList.data;
	      Object.keys(veggieData).forEach( (key) => {
	        veggieData[key].id = key;
	        veggieArr.push(veggieData[key]);
	      });
	      $scope.veggies = veggieArr;
	      veggieArr.forEach((veggie) => {
	          $scope.veggies.name = veggie.name;  
	      });
	    });
  	}

  	$scope.cancelNew = () => {
  		$window.location.href = '/#!/gardens';
  	};
	
 });