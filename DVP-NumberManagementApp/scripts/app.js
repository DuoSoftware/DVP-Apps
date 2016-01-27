/**
 * Created by Heshan.i on 1/20/2016.
 */
(function(){
  var app = angular.module('numberManagementApp', ['ngRoute', 'ngMaterial', 'md.data.table', 'ngMessages']);
  app.config(function($routeProvider){
    $routeProvider
      .when('/order', {
        templateUrl: "partials/order.html",
        controller: "orderController"
      })
      .otherwise({
        redirectTo: "/order"
      });
  });
}());
