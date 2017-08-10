'use strict';

gardenApp.factory('PlantFactory', function($q, $http, FirebaseUrl) {

  let getPlants = (gardenId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}plants.json?orderBy="gardenId"&equalTo="${gardenId}"`)
      .then( (plantData) => {
        resolve(plantData);
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
      });
    });
   };

  let deletePlants = (plantId)=>{
    return $q ((resolve, reject)=>{
        if(plantId){
            $http.delete(`${FirebaseUrl}plants/${plantId}.json`)
            .then((data)=>{
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            });
        }else{
            console.log ("didn't get the id for deletion");
        }
    });
 };

  return {getPlants, saveNewPlants, deletePlants};
});