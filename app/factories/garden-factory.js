"use strict";

gardenApp.factory("GardenFactory", function($q, $http, $window, FirebaseUrl) {

let getGardenList = (userId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}gardens.json?orderBy="uid"&equalTo="${userId}"`)
      .then( (gardenData) => {
        resolve(gardenData);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };

  let saveNewGarden = (garden) => {
      return $q((resolve, reject) => {
        $http.post(`${FirebaseUrl}gardens.json`,
            angular.toJson(garden))
        .then( (newGardenData) => {
            resolve(newGardenData);
          })
          .catch( (err) => {
            console.log("err", err);
          });
      });
  };

  let getVegetables = () => {
      return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}vegetables.json`)
      .then( (veggieData) => {
        resolve(veggieData);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  } ;

  let deleteGarden = (gardenId) => {
    return $q( (resolve, reject) => {
      if (gardenId) {
        $http.delete(`${FirebaseUrl}gardens/${gardenId}.json`)
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
      } else {
        console.log("No id passed in");
      }
    });
  };

   let getSingleGarden = (gardenId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}gardens.json?orderBy="gardenId"&equalTo="${gardenId}"`)
      .then( (garden) => {
        resolve(garden.data);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

   return { getGardenList, saveNewGarden, deleteGarden, getSingleGarden, getVegetables };
});