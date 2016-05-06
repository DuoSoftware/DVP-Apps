/**
 * Created by Achintha on 12/29/2015.
 */
(function () {

    var app = angular.module("holdMusicApp");
    var ReloadAppsController = function($scope,$location){
      $location.path("/main");
    };
    app.controller("ReloadAppsController",ReloadAppsController)
}())
