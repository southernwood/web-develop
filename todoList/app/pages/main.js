'use strict';

angular.module('todoList.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'pages/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("Welcome to the main controller");
  $http.get('data/data.json').then(function (res) {
     $scope.items = res.data;
     console.log($scope.items);
  });
  //Increase the priority
    
  $scope.onUp = function (idx) {
      if(idx != 0){
        var temp = $scope.items[idx-1];
        $scope.items[idx-1] = $scope.items[idx];
          $scope.items[idx] = temp;
      }
  }
    $scope.onDown = function (idx) {
        if(idx < $scope.items.length-1){
            var temp = $scope.items[idx+1];
            $scope.items[idx+1] = $scope.items[idx];
            $scope.items[idx] = temp;
        }
    }
    $scope.onRemove = function (idx) {
        $scope.items.splice(idx,1);
    }
    $scope.addItem = function (item) {
        $scope.items.add(item);
    }
    $scope.toggle = function (idx) {
        $scope.items[idx].flag = !$scope.items[idx].flag;
    }
    $scope.onShowForm = function () {
        $scope.showAddForm = true;
    }
    $scope.onHideForm = function () {
        $scope.showAddForm = false;
    }

    //add new item
    $scope.addItem = function () {
        var newItem = {
          "item": $scope.item,
            "flag": false
        }
        $scope.items.unshift(newItem);
        $scope.item = null;
        $scope.showAddForm = false;
    }
}]);