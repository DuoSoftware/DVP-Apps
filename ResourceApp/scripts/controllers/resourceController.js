var app = angular.module("ResourceApp");


app.controller("ResourceListController",function($scope, $location,resource){


  $scope.loadResources = function() {

    resource.user = {};
    resource.GetResources().then(function (response) {
      $scope.resources = response;
    }, function (error) {
      alert(error);
    });

  };


  $scope.deleteResource = function(resourceObj){

    resource.DeleteResource(resourceObj.ResourceId).then(function (response) {
      //$scope.resources = response;
      $location.path('/resources/list');

    }, function (error) {
      alert(error);
    });


  };

  $scope.loadResources();

});

app.controller("ResourceCreateController",function($scope,$location,resource){



  $scope.resource = resource.user;

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

  $scope.resource = resource.User;

  $scope.updateResource = function() {
    resource.UpdateResource($scope.resource).then(function (response) {
      //$scope.resource = response;

      $location.path('/resource/'+resource.User.ResourceId+'/view');

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
