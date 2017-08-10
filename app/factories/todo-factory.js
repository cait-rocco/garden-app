'use strict';

gardenApp.factory("TodoFactory", function($q, $http, FirebaseUrl) {

  let getTodoList = (gardenId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}todos.json?orderBy="gardenId"&equalTo="${gardenId}"`)
      .then( (todoData) => {
        resolve(todoData);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };

  let postNewTodo = (newTodo) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}todos.json`,
        angular.toJson(newTodo))
      .then( (newTodoData) => {
        resolve(newTodoData);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

  let updateTodo = (todo) => {
    return $q( (resolve, reject) => {
      let todoId = todo.id;
      if (todoId) {
        $http.put(`${FirebaseUrl}todos/${todoId}.json`,
          angular.toJson(todo))
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
      } else {
        console.log("error updating");
      }
    });
  };

  let deleteTodo = (todoId) => {
    return $q( (resolve, reject) => {
      console.log("todoId", todoId);
      if (todoId) {
        $http.delete(`${FirebaseUrl}todos/${todoId}.json`)
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

  let getSingleTodo = (todoId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}todos/${todoId}.json`)
      .then( (todo) => {
        resolve(todo.data);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

  return { getTodoList, postNewTodo, deleteTodo, updateTodo, getSingleTodo };
});