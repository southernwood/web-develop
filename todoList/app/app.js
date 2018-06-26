'use strict';

// Declare app level module which depends on views, and components
angular.module('todoList', [
  'ngRoute',
  'todoList.main'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
}]);

