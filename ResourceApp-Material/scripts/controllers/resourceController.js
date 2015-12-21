var app = angular.module("ResourceApp");


app.controller("ResourceListController",function($scope, $location,resource,task){






  $scope.loadResources = function() {

   // resource.user = {};
    resource.GetResources().then(function (response) {
      $scope.resources = response;
    }, function (error) {
      alert(error);
    });

  };


  $scope.deleteResource = function(resourceObj){

    resource.DeleteResource(resourceObj.ResourceId).then(function (response) {
      //$scope.resources = response;
      $scope.loadResources();

    }, function (error) {
      alert(error);
    });


  };


  $scope.viewResource = function(resourceID){

    $location.path('/resource/'+resourceID+'/edit');

  }


  $scope.loadResources();


});

app.controller("ResourceCreateController",function($scope,$location,resource){



  $scope.resource = {};

  $scope.createResource = function() {
    resource.CreateResource($scope.resource).then(function (response) {
      //$scope.resource = response;

      $location.path('/resources/list');

    }, function (error) {
      alert(error);
    });
  };


});

app.controller("ResourceEditController",function($scope,$routeParams,$location,resource){


  $scope.loadResource = function() {
    resource.GetResource($routeParams.id).then(function (response) {
      $scope.resource = response;
      resource.User = response;
    }, function (error) {
      alert(error);
    });
  };


  $scope.loadResource();

  //$scope.resource = resource.User;

  $scope.updateResource = function() {
    resource.UpdateResource($scope.resource).then(function (response) {
      //$scope.resource = response;

      $location.path('/resource/'+resource.User.ResourceId+'/view');
      $location.path('/resource/list');

    }, function (error) {
      alert(error);
    });
  };



});

app.controller("ResourceViewController",function($scope,$routeParams,resource){




  $scope.loadResource = function() {
    resource.GetResource($routeParams.id).then(function (response) {
      $scope.resource = response;
      resource.User = response;
    }, function (error) {
      alert(error);
    });
  };


  $scope.loadResource();


});

app.controller("ResourceTaskListController",function($scope,$routeParams,$location,$route,resource, task){



  $scope.resource = resource.User;
  $scope.Delete = function(resourceTask){

    alert(resourceTask.ResTask.ResTaskInfo.TaskName);



    resource.DeleteTaskToResource($routeParams.id,resourceTask.ResTask.TaskId).then(function (response) {

      $route.reload();
      //$location.path('/resource/'+resource.User.ResourceId+'/tasklist');

    }, function (error) {
      alert(error);
    });

  };




  $scope.UpdateTask= function(resourceTask){

    resource.UpdateTasksAssignedToResource($routeParams.id,resourceTask).then(function (response) {

      //$route.reload();
      //$location.path('/resource/'+resource.User.ResourceId+'/tasklist');

    }, function (error) {
      alert(error);
    });

  };




  $scope.Configure = function(resourceTask){

    alert(resourceTask.ResTask.ResTaskInfo.TaskName);

  };


  $scope.loadResourceTasks = function() {
    resource.GetTasksAssignedToResource($routeParams.id).then(function (response) {
      $scope.resourceTasks = response;

    }, function (error) {
      alert(error);
    });
  };




  $scope.loadResourceTasks();



  $scope.loadMasterTasks= function() {

    // resource.user = {};
    task.GetTasks().then(function (response) {
      $scope.masterTasks = response;
    }, function (error) {
      alert(error);
    });

  };

  $scope.loadMasterTasks();


  $scope.AssignTask = function(mastertask){

    mastertask = JSON.parse(mastertask);
    ////att.Concurrency,att.RefInfo,att.OtherData


    var concurrencyObj = {};
    concurrencyObj.Concurrency = $scope.concurrency;
    concurrencyObj.RefInfo = "";
    concurrencyObj.OtherData = $scope.otherData;
    // resource.user = {};
    resource.AssignTaskToResource($routeParams.id,mastertask.TaskId,concurrencyObj).then(function (response) {
      //$scope.masterTasks = response;

      $route.reload();
      //$scope.$apply();
      //$location.path('/resource/'+resource.User.ResourceId+'/tasklist');

    }, function (error) {
      alert(error);
    });


  }

});

app.controller("ResourceTaskListAttributeController",function($scope){

});
