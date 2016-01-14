var app = angular.module("ClusterManageApp");

app.controller("CallListController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {

  $scope.showConfirm = function (tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {


    var confirm = $mdDialog.confirm()
      .title(tittle)
      .textContent(content)
      .ok(okbutton)
      .cancel(cancelbutton);
    $mdDialog.show(confirm).then(function () {
      OkCallback(okObj);
    }, function () {
      CancelCallBack();
    });
  };

  $scope.showAlert = function (tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };

  $scope.query = {
    order:"Name",
    limit: 10,
    page: 1
  };
  $scope.dataReady = false;

  $scope.loadCallServer = function () {

    clusterService.GetCallServers().then(function (response) {

      $log.debug("GetCallServers: response" + response);
      $scope.dataReady = true;
      $scope.callServers = response;
      $scope.total = response.length;

    }, function (error) {
      $log.debug("GetCallServers err");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });

  };

  $scope.viewCallServer = function (callServerId) {

    $location.path('/callserver/' + callServerId + '/edit');

  };

  $scope.deleteCallServer = function (callServer) {

    $scope.showConfirm("Delete Cluster", "Delete", "ok", "cancel", "Do you want to delete " + callServer.Name, function (obj) {

      clusterService.DeleteCallServer(callServer).then(function (response) {
        if (response) {
          $scope.loadCallServer();
          $scope.showAlert("Deleted", "Deleted", "ok", "Call Server " + obj.Name + " Deleted successfully");
        }
        else
          $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }, function (error) {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });

    }, function () {

    }, callServer)
  };

  $scope.loadCallServer();

});

app.controller("CallEditController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {

  $scope.callServer = {};


  $scope.codes = [
    {Code: 1, name: 'Basic'},
    {Code: 2, name: 'Intermediate'},
    {Code: 3, name: 'Advanced'},
  ];

  $scope.showAlert = function (tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };

  $scope.createCallServer = function () {

    clusterService.CreateCallServer($scope.callServer).then(function (response) {
      if (response) {
        $scope.showAlert("Call Server Created", "Call Server Created", "ok", "Call Server created successfully " + $scope.callServer.Name);
        $location.path('/callserver/list');
      } else {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }
    }, function (error) {
      $log.debug("onGetSuccess3");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };

  $scope.updateResource = function () {

    clusterService.UpdateCallServer($scope.callServer).then(function (response) {
      if (response) {
        $scope.showAlert("Call Server Updated", "Call Server Updated", "ok", "Call Server Updated successfully " + $scope.callServer.Name);
      }
      else
        $scope.showAlert("Error", "Error", "ok", "There is an error ");

    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };

  $scope.loadResource = function () {
    clusterService.GetCallServer($routeParams.id).then(function (response) {
      $scope.callServer = response;
      clusterService.CallServer = $scope.callServer;
    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };

  angular.element(document).ready(function () {
    $scope.loadResource();
  });

});

app.controller("ClusterConfigController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {
});


