'use strict';

gardenApp.controller("GardenListController", function($scope, $window, $routeParams, UserFactory, GardenFactory, PlantFactory) {

let currentUser = UserFactory.getUser();

 UserFactory.isAuthenticated()
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchGardens();
  });

function fetchGardens() {
    let gardenArr = [];
    GardenFactory.getGardenList(currentUser)
    .then( (gardenList) => {
      let gardenData = gardenList.data;
      Object.keys(gardenData).forEach( (key) => {
        gardenData[key].id = key;
        gardenArr.push(gardenData[key]);
      });
      $scope.gardens = gardenArr;
    });
  }
	
$scope.deleteGarden = (gardenId) => {
    GardenFactory.deleteGarden(gardenId)
    .then( (data) => {
      fetchGardens();
    });
  };

  $scope.viewSavedGarden = (gardenId) => {
    PlantFactory.getPlants($routeParams.gardenId)
    .then( (garden) => {
      $window.location.href = `#!/gardens/detail/${gardenId}`;
    })
    .catch( (err) => {
      console.log("error! No item returned", err );
    });
  };

});
