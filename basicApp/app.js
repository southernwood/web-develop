/**
 * Created by sensen on 2017-06-26.
 */
var app = angular.module("computerApp", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'pages/main.html',
            controller: 'MainCtrl'
    })
        .when('/about',{
            templateUrl:'pages/about.html',
            controller:"AboutCtrl"
        })
        .when('/services',{
            templateUrl:'pages/services.html',
            controller:"ServicesCtrl"
        })
        .when('/contact',{
            templateUrl:'pages/contact.html',
            controller:'ContactCtrl'
        })
        .otherwise({
        redirectTo:'main.html'
    })
});

app.controller('MainCtrl', ['$scope', function ($scope ){
    console.log("this is main controller");
}]);

app.controller('AboutCtrl', ['$scope', function ($scope ){
    console.log("this is About controller");
}]);
app.controller('ServicesCtrl', ['$scope', '$http',function ($scope, $http ){
    $http.get('data/services.json').then(function (res) {
       $scope.services = res.data;
    });
    console.log("this is Services controller");
}]);
app.controller('ContactCtrl', ['$scope','$http', function ($scope, $http ){
    $http.get('data/locations.json').then(function (res) {
        $scope.locations = res.data;
    })
}]);