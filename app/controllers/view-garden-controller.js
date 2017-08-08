'use strict';

gardenApp.controller('ViewGardenController', function($scope, $routeParams, UserFactory, PlantFactory, GardenFactory) {

  console.log("this is the view garden controller");

  let currentUser = UserFactory.getUser();
 
  UserFactory.isAuthenticated()
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchPlants();
  });

  function fetchPlants() {
    console.log("routeParams", $routeParams.gardenId);
    let plantArr = [];
    PlantFactory.getPlants($routeParams.gardenId)
    .then( (plantList) => {
      let plantData = plantList.data;
      Object.keys(plantData).forEach( (key) => {
        plantData[key].id = key;
        plantArr.push(plantData[key]);
      });
      $scope.plants = plantArr;
      console.log("plants controller?", plantArr);
    });
  }

  function printGarden(garden) {
    // We saved nested data (gasp!), so this is how to mine down into it to get the
    // object of objects we need
    console.log("garden object", garden);
    let gardenObjects = garden[Object.keys(garden)[0]];
    let canvas = $("#graphCanvas2")[0];
    for( let plant in gardenObjects ) {
      let imgName = garden.plant1.imgName;
      console.log("img", imgName);
      let $img = $(`#${imgName}`);
      console.log("img???", garden.plant1.$img[0]);
      canvas
      .getContext("2d").drawImage($img[0], gardenObjects[plant].xCoord, gardenObjects[plant].yCoord);
    }
  }

  // PlantFactory.getPlants($routeParams.gardenId)
  // .then( (garden) => {
  //   console.log("garden item", garden);
  //   // $scope.selectedItem = garden;
  //   // printGarden(garden.data);
  // })
  // .catch( (err) => {
  //   console.log("error! No item returned", err );
  // });

});