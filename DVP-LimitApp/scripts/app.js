/**
 * Created by Heshan.i on 1/18/2016.
 */
(function(){
  var app = angular.module("dvp-limitApp",['ngRoute','ngMaterial', 'md.data.table', 'ngMessages', 'ngclipboard']);
  app.config(function($routeProvider){
    $routeProvider
      .when("/limit",{
        templateUrl: "partials/limit.html",
        controller: "limitController"
      })
      .otherwise({
        redirectTo:"/limit"
      });
  });
}());
