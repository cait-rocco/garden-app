'use strict';

gardenApp.controller("GardenListController", function($scope, $window, $routeParams, TodoFactory, UserFactory, GardenFactory, PlantFactory) {

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
      gardenArr.forEach((garden) => {
        if(garden.id == $routeParams.gardenId) {
          $scope.gardens.id = garden.id;
        }
      });
    });
  }

function deleteRelatedPlants(gardenId) {
  let plantDeleteArray = [];
  PlantFactory.getPlants(gardenId)
  .then((plantList) => {
        let plantData = plantList.data;
        Object.keys(plantData).forEach((key)=>{
          plantData[key].id = key;
          plantDeleteArray.push(plantData[key]);
      });
      plantDeleteArray.forEach((plantToDelete)=>{
        PlantFactory.deletePlants(plantToDelete.id);
      });
  });
}

function deleteRelatedTodos(gardenId) {
  let todoDeleteArray = [];
  TodoFactory.getTodoList(gardenId)
  .then((todoList)=>{
      let todoData = todoList.data;
      Object.keys(todoData).forEach((key)=>{
          todoData[key].id = key;
          todoDeleteArray.push(todoData[key]);
      });
      todoDeleteArray.forEach((todoToDelete)=>{
        TodoFactory.deleteTodo(todoToDelete.id);
      });
    });
}
	
  $scope.deleteGarden = (gardenId) => {
      deleteRelatedPlants(gardenId);
      deleteRelatedTodos(gardenId);
      GardenFactory.deleteGarden(gardenId)
      .then( (data) => {
        fetchGardens();
      });
  };

  $scope.viewSavedGarden = (gardenId) => {
    PlantFactory.getPlants($routeParams.gardenId)
    .then( (garden) => {
    })
    .catch( (err) => {
      console.log("error! No item returned", err );
    });
  };

// instanciate new modal
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    beforeClose: function() {
      return true;
    }
});

  $scope.openModal = (gardenId) => {
    modal.open();
    modal.setContent('<h1>Deleting a garden will delete all associated plants and to-do items.</h1>');
    modal.addFooterBtn('Cancel', 'tingle-btn tingle-btn--primary', function() {
      modal.close();
    });
    modal.addFooterBtn('Confirm', 'tingle-btn tingle-btn--danger', function() {
      $scope.deleteGarden(gardenId);
      modal.close();
    });
  };

});
