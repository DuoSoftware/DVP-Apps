/**
 * Created by Heshan.i on 12/30/2015.
 */
(function(){
  var app = angular.module("extension_DID_DOD",["ngRoute",'ngMaterial']);
  app.config(function($routeProvider){
    $routeProvider
      .when("/extension",{
        templateUrl:"partials/extension.html",
        controller:"ExtensionController"
      })
      .when("/did",{
        templateUrl:"partials/did.html",
        controller:"DidController"
      })
      .otherwise({
        redirectTo:"/extension"
      });
  });
}());
