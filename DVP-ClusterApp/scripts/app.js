
var app = angular.module("ClusterManageApp",["ngMaterial","md.data.table","ngRoute", "clusterServiceModule"]);

app.config(function($routeProvider){

  $routeProvider.when("/clusters/list",{

    templateUrl: 'partials/clusterList.html',
    controller: 'ClusterListController'

  }).when("/cluster/create",{


    templateUrl: 'partials/clusterAdd.html',
    controller: 'ClusterCreateController'


  }).when("/cluster/:id/edit",{


    templateUrl: 'partials/clusterEdit.html',
    controller: 'ClusterEditController'



  }).when("/cluster/:id/view",{


      templateUrl: 'partials/clusterView.html',
      controller: 'ClusterViewController'



    }).when("/cluster/:id/tasklist",{

    templateUrl: 'partials/clusterTaskList.html',
    controller: 'ClusterTaskListController'


  }).when("/cluster/:resId/task/:taskId",{


    templateUrl: 'partials/clusterTaskAttributeList.html',
    controller: 'ClusterTaskListAttributeController'


  }).when("/cluster/:resId/newtask",{


    templateUrl: 'partials/clusterTaskAttributeList.html',
    controller: 'ClusterTaskListAttributeController'


  }).otherwise({


    templateUrl: 'partials/clusterList.html',
    controller: 'ClusterListController'

  });

});
