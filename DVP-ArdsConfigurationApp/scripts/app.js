/**
 * Created by Heshan.i on 1/29/2016.
 */
(function(){
  var app = angular.module('dvp-ardsConfigurationApp', ['ngRoute','ngMaterial', 'md.data.table', 'ngMessages']);
  app.config(function($routeProvider){
    $routeProvider
      .when('/ards/configuration/add',{
        templateUrl: "partials/createConfiguration.html",
        controller: "createConfigController"
      })
      .when('/ards/configuration/edit/:serverType/:requestType',{
        templateUrl: "partials/updateConfiguration.html",
        controller: "updateConfigController"
      })
      .when('/ards/configuration',{
        templateUrl: "partials/viewConfiguration.html",
        controller: "viewConfigController"
      })
      .otherwise({
        redirectTo: '/ards/configuration'
      });
  });
}());
