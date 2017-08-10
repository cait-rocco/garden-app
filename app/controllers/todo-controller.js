'use strict';

gardenApp.controller("TodoController", function($scope, $routeParams, TodoFactory) {

  $scope.updateTodo = (todo) => {
    TodoFactory.updateTodo(todo)
    .then( (data) => {
    });
  };

  TodoFactory.getSingleTodo($routeParams.todoId)
  .then( (todoItem) => {
    $scope.todoItem = todoItem;
  });

});