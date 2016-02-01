/**
 * Created by Heshan.i on 1/29/2016.
 */
(function(){
  var app = angular.module('dvp-ardsConfigurationApp', ['ngRoute','ngMaterial', 'md.data.table', 'ngMessages']);
  app.config(function($routeProvider){
    $routeProvider
      .when('/ards/configuration/add',{
        templateUrl: 'partials/createConfiguration',
        controller: 'scripts/createConfigController'
      })
      .when('/ards/configuration/edit',{
        templateUrl: 'partials/updateConfiguration',
        controller: 'scripts/updateConfigController'
      })
      .when('/ards/configuration',{
        templateUrl: 'partials/viewConfiguration',
        controller: 'scripts/viewConfigController'
      })
      .otherwise({
        redirectTo: '/ards/configuration'
      });
  });
}());
