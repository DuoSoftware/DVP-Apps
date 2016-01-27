/**
 * Created by dinusha on 1/26/2016.
 */

(function(){
  var app = angular.module("scheduleApp", ["ngMaterial", "ngMessages", "ngRoute", "md.data.table"]);

  app.config(function($routeProvider)
  {
    $routeProvider.
      when("/schedules", {
        templateUrl: 'partials/scheduleListView.html',
        controller: 'ScheduleListController'
      })
      .otherwise({redirectTo:"/schedules"});

  })
}());
