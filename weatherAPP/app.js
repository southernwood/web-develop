//delcare an app

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//define the routes

weatherApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

})

//controllers

weatherApp.controller('homeController', ['$scope','cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city',function () {
        cityService.city = $scope.city;
    })

}]);

weatherApp.controller('forecastController', ['$scope','cityService','$resource','$routeParams', function ($scope, cityService, $resource, $routeParams) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?",{callback: 'JSON_CALLBACK'}, {get: {method:"JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days, APPID: "d8e85b3e2e276badc310800c97aa4f57"});
    $scope.converToF = function (deg) {
        return Math.round((deg-273)*1.8 + 32);
    };
    $scope.convertToDate = function (dt) {
        return new Date(dt*1000);
    };
}]);

//service
weatherApp.service('cityService', function () {
    this.city = "New York, NY"
})

weatherApp.directive("weatherReport", function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStand: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
})