'use strict';

gardenApp.controller('ViewGardenController', function($scope, $routeParams, $route, UserFactory, TodoFactory, PlantFactory, GardenFactory) {

  let currentUser = UserFactory.getUser();
 
  UserFactory.isAuthenticated()
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchGardenArea();
    fetchPlants();
    fetchTodos();
  });

  function fetchPlants() {
    let plantArr = [];
    PlantFactory.getPlants($routeParams.gardenId)
    .then( (plantList) => {
      let plantData = plantList.data;
      Object.keys(plantData).forEach( (key) => {
        plantData[key].id = key;
        plantArr.push(plantData[key]);
      });
      $scope.plants = plantArr;
      printGarden(plantArr);
    });
  }

  function printGarden(plantArr) {
    let canvas = $("#graphCanvas2")[0];
    plantArr.forEach((plant) => {
      let imgName = plant.imgName;
      let $img = $(`#${imgName}`)[0];
      canvas
      .getContext("2d").drawImage($img, plant.xCoord, plant.yCoord);
    });
  }

  function fetchGardenArea() {
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
          $scope.gardens.length = garden.length * 100;
          $scope.gardens.width = garden.width * 100;
          $scope.gardens.name = garden.name;
        }
      });
    });
  }

  function fetchTodos() {
    let todoArr = [];
    TodoFactory.getTodoList($routeParams.gardenId)
    .then( (todoList) => {
      let todoData = todoList.data;
      Object.keys(todoData).forEach( (key) => {
        todoData[key].id = key;
        todoArr.push(todoData[key]);
      });
      $scope.todos = todoArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  }

  $scope.todoItem = {
    text: "",
    date: "",
    gardenId: $routeParams.gardenId
  };

  $scope.saveTodo = () => {
    TodoFactory.postNewTodo($scope.todoItem)
    .then( (data) => {
      fetchTodos();
    });
  };

  $scope.deleteTodo = (todoId) => {
    TodoFactory.deleteTodo(todoId)
    .then( (data) => {
      fetchTodos();
    });
  };

  angular.element('.datepicker').datepicker();

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

});