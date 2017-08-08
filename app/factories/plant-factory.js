'use strict';

gardenApp.factory('PlantFactory', function($q, $http, FirebaseUrl) {

// let getPlants = (gardenId) => {
//     return $q( (resolve, reject) => {
//       $http.get(`${FirebaseUrl}gardens/${gardenId}.json`)
//       .then( (garden) => {
//         resolve(garden.data);
//       })
//       .catch( (err) => {
//         reject(err);
//       });
//     });
//   };

  let getPlants = (gardenId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}plants.json?orderBy="gardenId"&equalTo="${gardenId}"`)
      .then( (plantData) => {
        resolve(plantData);
        console.log("plants factory?", plantData);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };

  let saveNewPlants = (plants) =>  {
    // loop through plants array and save each to firebase
    return $q( (resolve, reject) => {
      let promiseArr = [];
      plants.forEach((plant) => {
        promiseArr.push($http.post(`${FirebaseUrl}plants.json`,
            angular.toJson(plant)));
      });
      Promise.all(promiseArr)
      .then((plantData) => {
        resolve(plantData);
        // $window.location.href = `/#!/gardens/detail/${newGardenData.data.name}'`;
      });
    });
   };

  return {getPlants, saveNewPlants};
});