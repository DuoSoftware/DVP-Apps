/**
 * Created by dinusha on 12/30/2015.
 */

(function(){
  var app = angular.module("userManagementApp", ["ngMaterial", "ngMessages", "ngRoute", "md.data.table"]);

  app.config(function($routeProvider)
  {
    $routeProvider.
      when("/users", {
        templateUrl: 'partials/userListView.html',
        controller: 'UserListController'
      })
      .when("/group", {
        templateUrl: 'partials/groupConfigurationView.html',
        controller: 'GroupConfigurationController'
      })
      .when("/user", {
        templateUrl: 'partials/userConfigurationView.html',
        controller: 'UserConfigurationController'
      })
      .when("/attTransfer", {
        templateUrl: 'partials/attendantTransferView.html',
        controller: 'AttendantTransferController'
      })
      .otherwise({redirectTo:"/users"});

  })
}());
