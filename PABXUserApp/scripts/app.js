/**
 * Created by dinusha on 12/30/2015.
 */

(function(){
  var app = angular.module("pabxUserApp", ["ngMaterial", "ngMessages", "ngRoute", "md.data.table"]);

  app.config(function($routeProvider)
  {
    $routeProvider.
      when("/pabxUsers", {
        templateUrl: 'partials/pabxUserListView.html',
        controller: 'PABXUserListController'
      })
      .when("/pabxUser/:userUuid", {
        templateUrl: 'partials/pabxBasicConfigView.html',
        controller: 'PABXBasicConfigController'
      })
      .when("/pabxUser/:userUuid/followMe", {
        templateUrl: 'partials/followMeConfigView.html',
        controller: 'FollowMeConfigController'
      })
      .otherwise({redirectTo:"/pabxUsers"});

  })
}());
