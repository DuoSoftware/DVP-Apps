var app = angular.module("EngagementApp", ["ui-notification","ngMaterial", "md.data.table", "ngRoute", "ngMessages","ngAnimate","ngTable", "engagementServiceModule","authServiceModule","btford.socket-io","socketConnectorServiceModule","socketConnectorAuthModule","onlineStatusApp"]);

app.constant('engagementUrl', 'http://localhost:8827/DVP/API/6.0/EngagementService/');
app.config(function ($routeProvider) {

  $routeProvider.when("/engagement/list", {
    templateUrl: 'partials/engagementList.html',
    controller: 'FileListController'
  })
    .when("/engagement/create", {
      templateUrl: 'partials/saveEngagement.html',
      controller: 'FileEditController'

    })
    .when("/engagement/history", {
      templateUrl: 'partials/engagementHistory.html',
      controller: 'FileHistoryController'

    })
    .otherwise({
      templateUrl: 'partials/engagementList.html',
      controller: 'FileListController'
    });

});
