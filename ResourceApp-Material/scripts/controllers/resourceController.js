var app = angular.module("ResourceApp");


app.controller("ResourceListController",function($scope, $location,$mdDialog, resource,task){




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

  $scope.showConfirm = function(tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

    var confirm = $mdDialog.confirm()
      .title(tittle)
      .textContent(content)
      .ok(okbutton)
      .cancel(cancelbutton);
    $mdDialog.show(confirm).then(function() {
      OkCallback(okObj);
    }, function() {
      CancelCallBack();
    });
  };



  $scope.loadResources = function() {

    // resource.user = {};
    resource.GetResources().then(function (response) {
      $scope.resources = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });

  };


  $scope.deleteResource = function(resourceObj){


    $scope.showConfirm("Delete Resource","Delete","ok","cancel","Do you want to delete " + resourceObj.ResourceName,function(obj){

      resource.DeleteResource(obj.ResourceId).then(function (response) {
        //$scope.resources = response;
        $scope.loadResources();

        $scope.showAlert("Deleted", "Deleted", "ok","Resource " + obj.ResourceName+ " Deleted successfully");

      }, function (error) {
        $scope.showAlert("Error","Error","ok","There is an error ");
      });

    }, function(){

      //$scope.showAlert("title","lable","ok","content");

    },resourceObj)




  };


  $scope.viewResource = function(resourceID){

    $location.path('/resource/'+resourceID+'/edit');

  }


  $scope.loadResources();


});

app.controller("ResourceCreateController",function($scope,$location,$mdDialog,resource){


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



  $scope.resource = {};

  $scope.createResource = function() {
    resource.CreateResource($scope.resource).then(function (response) {
      //$scope.resource = response;


      $scope.showAlert("Resource Created","Resource Created","ok","Resource created successfully "+response.ResourceName);
      $location.path('/resources/list');



    }, function (error) {

      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };


});

app.controller("ResourceEditController",function($scope,$routeParams,$mdDialog,$location,resource){



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
    resource.GetResource($routeParams.id).then(function (response) {
      $scope.resource = response;
      resource.User = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };


  $scope.loadResource();

  //$scope.resource = resource.User;

  $scope.updateResource = function() {
    resource.UpdateResource($scope.resource).then(function (response) {
      //$scope.resource = response;

      $scope.showAlert("Resource Updated","Resource Updated","ok","Resource Updated successfully "+$scope.resource.ResourceName);
      //$location.path('/resource/'+resource.User.ResourceId+'/view');
      //$location.path('/resource/list');

    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };



});

app.controller("ResourceViewController",function($scope,$mdDialog,$routeParams,resource){


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

app.controller("ResourceTaskListController",function($scope,$routeParams,$mdDialog,$location,$route,resource, task){


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
      $scope.showAlert("Resource Updated","Resource Updated","ok","Resource Updated successfully "+$scope.resource.ResourceName);

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

app.controller("ResourceTaskListAttributeController",function($scope){

});
