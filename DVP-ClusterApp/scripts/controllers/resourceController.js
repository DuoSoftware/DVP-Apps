var app = angular.module("ClusterManageApp");


app.controller("ClusterListController",function($scope, $location,$mdDialog,$log,clusterService){


  $scope.query = {
    limit: 5,
    page: 1
  };

  $scope.dataReady = false;
  $scope.loadClusters = function() {

    // resource.user = {};
    clusterService.GetClusters().then(function (response) {

      $log.debug("GetClusters: response"+response);
      $scope.dataReady=true;
      $scope.clusters = response;
      $scope.total = response.length;
    }, function (error) {
      $log.debug("GetClusters err");
      $scope.showAlert("Error","Error","ok","There is an error ");
    });

  };

  $scope.viewCluster = function(clusterID){

    $location.path('/cluster/'+clusterID+'/edit');

  };

  $scope.deleteCluster = function(clusterObj){

    $scope.showConfirm("Delete Cluster","Delete","ok","cancel","Do you want to delete " + clusterObj.Name,function(obj){

      clusterService.DeleteCluster(obj.ResourceId).then(function (response) {
        $scope.loadResources();
        $scope.showAlert("Deleted", "Deleted", "ok","Cluster " + obj.Name+ " Deleted successfully");
      }, function (error) {
        $scope.showAlert("Error","Error","ok","There is an error ");
      });

    }, function(){

    },clusterObj)
  };


  $scope.loadClusters();

  /*
   angular.element(document).ready(function () {
   campaignService.getOngoingCampaigns().then(onGetSuccess, onError);
   });*/

});

app.controller("ClusterCreateController",function($scope,$location,$mdDialog,$log,clusterService){

  $scope.showAlert = function(tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };

  $scope.cluster = {};

  $scope.createCluster = function() {
    $log.debug("onGetSuccess1");
    clusterService.CreateCluster($scope.cluster).then(function (response) {
      $log.debug("onGetSuccess2"+response);
      $scope.showAlert("Cluster Created","Cluster Created","ok","Cluster created successfully "+response.Name);
      $location.path('/cluster/list');

    }, function (error) {
      $log.debug("onGetSuccess3");
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };



});

app.controller("ClusterEditController",function($scope,$routeParams,$mdDialog,$location,$log,clusterService){



  $scope.showAlert = function(tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };

  $scope.loadResource = function() {
    clusterService.GetCluster($routeParams.id).then(function (response) {
      $log.debug("GetCluster");
      $scope.cluster = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };


  $scope.loadResource();

  //$scope.resource = clusterService.User;

  $scope.updateResource = function() {
    clusterService.UpdateCluster($scope.cluster).then(function (response) {
      //$scope.resource = response;

      $scope.showAlert("Cluster Updated","Cluster Updated","ok","Cluster Updated successfully "+$scope.cluster.Name);
      //$location.path('/resource/'+resource.User.ResourceId+'/view');
      //$location.path('/resource/list');

    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };



});

app.controller("ClusterViewController",function($scope,$mdDialog,$routeParams,resource){


  $scope.loadResource = function() {
    resource.GetResource($routeParams.id).then(function (response) {
      $scope.resource = response;
      resource.User = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };


  $scope.loadResource();


});

app.controller("ClusterTaskListController",function($scope,$routeParams,$mdDialog,$location,$route,resource, task){


  $scope.showAlert = function(tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };


  $scope.resource = resource.User;
  $scope.Delete = function(resourceTask){

    //alert(resourceTask.ResTask.ResTaskInfo.TaskName);

    resource.DeleteTaskToResource($routeParams.id,resourceTask.ResTask.TaskId).then(function (response) {

      $route.reload();
      //$location.path('/resource/'+resource.User.ResourceId+'/tasklist');

    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });

  };




  $scope.UpdateTask= function(resourceTask){

    resource.UpdateTasksAssignedToResource($routeParams.id,resourceTask).then(function (response) {

      //$route.reload();
      //$location.path('/resource/'+resource.User.ResourceId+'/tasklist');
      $scope.showAlert("Cluster Updated","Cluster Updated","ok","Cluster Updated successfully "+$scope.resource.ResourceName);

    }, function (error) {

      $scope.showAlert("Error","Error","ok","There is an error ");

    });

  };




  $scope.Configure = function(resourceTask){

    //alert(resourceTask.ResTask.ResTaskInfo.TaskName);

  };


  $scope.loadResourceTasks = function() {
    resource.GetTasksAssignedToResource($routeParams.id).then(function (response) {
      $scope.resourceTasks = response;

    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };




  $scope.loadResourceTasks();



  $scope.loadMasterTasks= function() {

    // resource.user = {};
    task.GetTasks().then(function (response) {
      $scope.masterTasks = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
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
      $scope.showAlert("Error","Error","ok","There is an error ");
    });


  }

});

app.controller("ClusterTaskListAttributeController",function($scope){

});
