/**
 * Created by dinusha on 1/22/2016.
 */
/**
 * Created by dinusha on 12/30/2015.
 */

(function(){
  var app = angular.module("autoAttendantApp", ["ngMaterial", "ngMessages", "ngRoute", "md.data.table"]);

  app.config(function($routeProvider)
  {
    $routeProvider.
      when("/autoAttendants", {
        templateUrl: 'partials/autoAttendantListView.html',
        controller: 'AutoAttendantListController'
      })
      .when("/autoAttendant/:name", {
        templateUrl: 'partials/autoAttendantConfigView.html',
        controller: 'AutoAttendantConfigController'
      })
      .when("/autoAttendant/:name/actions", {
        templateUrl: 'partials/autoAttendantAdvancedView.html',
        controller: 'AutoAttendantAdvancedController'
      })
      .otherwise({redirectTo:"/autoAttendants"});

  })
}());
