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
      .when("/groups", {
        templateUrl: 'partials/groupListView.html',
        controller: 'GroupListController'
      })
      .otherwise({redirectTo:"/users"});

  })
}());
