"use strict";

gardenApp.controller('AddPlantsController', function($scope, $route, $window, $routeParams, GardenFactory, PlantFactory, UserFactory) {
  // This controller and the related HTML in index.html
  // are based on this mess: http://jsfiddle.net/YXxsH/5/
  let position;
  let counter = 0;
  let plants = [];
  let currentUser = null;

  UserFactory.isAuthenticated()
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchGardenArea();
  });

  $scope.allowDrop = (ev) => {
      ev.preventDefault();
  };

  $scope.getPos = (ev) => {
      //the event, which has the target's (the image itself's) x,y coords as properties
      position = [ev.pageX, ev.pageY];
  };

  $scope.drag = (ev) => {
      ev.dataTransfer.setData("Text", ev.target.id);
  };

  $scope.drop = (ev) => {
      counter ++;
      ev.preventDefault();
      // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
      // Basically is grabbing the id string of the image
      let data = ev.dataTransfer.getData("Text");
      let $img = $(`#${data}`);
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
      // http://api.jquery.com/offset/
      let adjustedX = position[0] - $img.offset().left + $("#graphCanvas").offset().left;
      let adjustedY = position[1] - $img.offset().top + $("#graphCanvas").offset().top;
      $("#graphCanvas")[0].getContext("2d").drawImage($img[0],
        ev.pageX - adjustedX,
        ev.pageY - adjustedY
      );
      let newPlant = {xCoord: ev.pageX - adjustedX, yCoord: ev.pageY - adjustedY, imgName: $img.attr("id"), gardenId: $routeParams.gardenId};
      plants.push(newPlant);
  };  

  $scope.savePlants = () => {
    PlantFactory.saveNewPlants(plants);
  };

  $scope.viewSavedGarden = () => {
    PlantFactory.saveNewPlants(plants)
    .then( (garden) => {
      $window.location.href = `#!/gardens/detail/${$routeParams.gardenId}`;
    })
    .catch( (err) => {
      console.log("error! No item returned", err );
    });
  };

  $scope.clearPlants = () => {
   $route.reload();
  };

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
          if(garden.tomato === false) {
            $('#tomato').hide();
            $('.tomato').hide();
          }
          if(garden.cucumber === false) {
            $('#cucumber').hide();
            $('.cucumber').hide();
          }
          if(garden.carrot === false) {
            $('#carrot').hide();
            $('.carrot').hide();
          }
          if(garden.onion === false) {
            $('#onion').hide();
            $('.onion').hide();
          }
          if(garden.potato === false) {
            $('#potato').hide();
            $('.potato').hide();
          }
        }
      });
    });
  }

  function fetchVegetables(veggieId) {
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
          if(veggieId == veggie.id) {
            // $scope.veggies.name = veggie.name;  
            // $scope.veggies.test = veggie.test;
            modal.setContent(`<img src="${veggie.pic}"><h1>${veggie.name}</h1><p>${veggie.test}</p>`);
          }
        });
      });
    }

// instanciate new modal
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-2'],
    beforeClose: function() {
      return true;
    }
});

  $scope.openModal = (veggieId) => {
    modal.open();
    fetchVegetables(veggieId);
    // modal.setContent('<h1>Deleting a garden will delete all associated plants and to-do items.</h1><p>${veggie.test}</p>');
  };

});

