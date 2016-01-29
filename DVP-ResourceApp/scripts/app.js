
var app = angular.module("ResourceApp",["ngMaterial","ngMessages","directivelibrary","ngRoute", "resourceService", "taskService", "attributeService",'md.data.table']);

app.config(function($routeProvider){

  $routeProvider.when("/resources/list",{

    templateUrl: 'partials/resourceList.html',
    controller: 'ResourceListController'

  }).when("/resource/create",{


    templateUrl: 'partials/resourceAdd.html',
    controller: 'ResourceCreateController'


  }).when("/resource/:id/edit",{


    templateUrl: 'partials/resourceEdit.html',
    controller: 'ResourceEditController'



  }).when("/resource/:id/view",{


      templateUrl: 'partials/resourceView.html',
      controller: 'ResourceViewController'



    }).when("/resource/:id/tasklist",{

    templateUrl: 'partials/resourceTaskList.html',
    controller: 'ResourceTaskListController'


  }).when("/resource/:resId/task/:taskId",{


    templateUrl: 'partials/resourceTaskAttributeList.html',
    controller: 'ResourceTaskListAttributeController'


  }).when("/resource/:resId/newtask",{


    templateUrl: 'partials/resourceTaskAttributeList.html',
    controller: 'ResourceTaskListAttributeController'


  }).otherwise({


    templateUrl: 'partials/resourceList.html',
    controller: 'ResourceListController'

  });

});





/*

var app = angular.module("ResourceApp",["ngRoute", "resourceService","ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/resource/list");

  $stateProvider.state('main', {
      url: '/resource/list',
      templateUrl: 'partials/resourceList.html',
      controller: 'ResourceListController'
    })

    .state('main.create', {
      url: '/resource/create',
      templateUrl: 'partials/resourceAdd.html',
      controller: 'ResourceCreateController'
    })

    .state('main.edit', {
      url: '/resource/:id/edit',
      templateUrl: 'partials/resourceEdit.html',
      controller: 'ResourceEditController'
    })

    .state('main.view', {
      url: '/resource/:id/view',
      templateUrl: 'partials/resourceView.html',
      controller: 'ResourceViewController'
    })

});

*/
