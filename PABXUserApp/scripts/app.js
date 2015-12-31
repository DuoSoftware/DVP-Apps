/**
 * Created by dinusha on 12/30/2015.
 */

(function(){
  var app = angular.module("pabxUserApp", ["ngMaterial", "ngRoute", "md.data.table"]);

  app.config(function($routeProvider)
  {
    $routeProvider.
      when("/pabxUsers/list", {
        templateUrl: 'partials/pabxUserListView.html',
        controller: 'PABXUserListController'
      })
      .otherwise({redirectTo:"/pabxUsers/list"})

  })
}());
