var app = angular.module("ClusterManageApp", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages", "clusterServiceModule"]);

app.config(function ($routeProvider) {

  $routeProvider.when("/clusters/list", {

    templateUrl: 'partials/clusterList.html',
    controller: 'ClusterListController'

  }).when("/cluster/create", {


    templateUrl: 'partials/clusterAdd.html',
    controller: 'ClusterEditController'


  }).when("/cluster/:id/edit", {


    templateUrl: 'partials/clusterEdit.html',
    controller: 'ClusterEditController'


  }).when("/clusterConfigure/:id/edit", {


    templateUrl: 'partials/clusterConfig.html',
    controller: 'ClusterEditController'


  }).when("/cluster/:id/view", {


    templateUrl: 'partials/clusterView.html',
    controller: 'ClusterViewController'


  }).when("/cluster/config", {

    templateUrl: 'partials/clusterConfig.html',
    controller: 'CustomInputDemoCtrl'

  }).when("/cluster/configlist", {

    templateUrl: 'partials/clusterConfigList.html',
    controller: 'ClusterListController'

  }).when("/callserver/list", {
    templateUrl: 'partials/callList.html',
    controller: 'CallListController'
  }).
    when("/callserver/create", {
      templateUrl: 'partials/callAdd.html',
      controller: 'CallEditController'

    }).when("/callserver/:id/edit", {
      templateUrl: 'partials/callEdit.html',
      controller: 'CallEditController'
    }).otherwise({
      templateUrl: 'partials/clusterList.html',
      controller: 'ClusterListController'
    });

});
