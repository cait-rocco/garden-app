"use strict";

gardenApp.factory('BuildFactory', function($q, $scope, $http, FirebaseUrl, FBCreds, gardenCtrl) {

  let garden = {};

  $scope.saveGarden = () => {
    $http.post(`${FirebaseUrl}gardens.json`,
      angular.toJson(garden))
    .then( (newGardenData) => {
      console.log("new garden saved", newGardenData.name );
    })
    .catch( (err) => {
      console.log("err", err);
    });
  };

  $scope.getGarden = () => {
    $http.get(`${FirebaseUrl}gardens.json`)
    .then( (garden) => {
      console.log("garden", garden.data);
      gardenCtrl.printGarden(garden.data);
    });
  };
});