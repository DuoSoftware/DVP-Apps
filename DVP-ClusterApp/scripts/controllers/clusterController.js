var app = angular.module("ClusterManageApp");

app.controller("ClusterListController", function ($scope, $location, $mdDialog, $log, clusterService) {

  $scope.query = {
    order:"Name",
    limit: 5,
    page: 1
  };
  $scope.dataReady = false;
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


  $scope.loadClusters = function () {

    // resource.user = {};
    clusterService.GetClusters().then(function (response) {

      $log.debug("GetClusters: response" + response);
      $scope.dataReady = true;
      $scope.clusters = response;
      $scope.total = response.length;

    }, function (error) {
      $log.debug("GetClusters err");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });

  };

  $scope.clusterConfigure = function (clusterID) {

    $location.path('/clusterConfigure/' + clusterID + '/edit');

  };

  $scope.viewCluster = function (clusterID) {

    $location.path('/cluster/' + clusterID + '/edit');

  };

  $scope.deleteCluster = function (clusterObj) {

    $scope.showConfirm("Delete Cluster", "Delete", "ok", "cancel", "Do you want to delete " + clusterObj.Name, function (obj) {

      clusterService.DeleteCluster(clusterObj).then(function (response) {
        if (response) {
          $scope.loadResources();
          $scope.showAlert("Deleted", "Deleted", "ok", "Cluster " + obj.Name + " Deleted successfully");
        }
        else
          $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }, function (error) {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });

    }, function () {

    }, clusterObj)
  };

  $scope.loadClusters();

  /*
   angular.element(document).ready(function () {
   campaignService.getOngoingCampaigns().then(onGetSuccess, onError);
   });*/

});


app.controller("ClusterEditController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {

  $scope.cluster = clusterService.Cluster;

  $scope.createCluster = function () {
    $log.debug("onGetSuccess1");
    $scope.cluster.CloudModel = clusterService.Cluster.CloudModel;
    clusterService.CreateCluster($scope.cluster).then(function (response) {
      if (response) {
        $scope.showAlert("Cluster Created", "Cluster Created", "ok", "Cluster created successfully " + response.Name);
        $location.path('/cluster/list');
      } else {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }

    }, function (error) {
      $log.debug("onGetSuccess3");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };

  $scope.cModels = [
    {CloudModel: 1, name: 'Basic'},
    {CloudModel: 2, name: 'Intermediate'},
    {CloudModel: 3, name: 'Advanced'},
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

  $scope.loadResource = function () {
    clusterService.GetCluster($routeParams.id).then(function (response) {
      $log.debug("GetCluster");
      $scope.cluster = response;
      clusterService.Cluster = $scope.cluster;

    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };

  $scope.updateResource = function () {
    $scope.cluster.CloudModel = clusterService.Cluster.CloudModel;
    clusterService.UpdateCluster($scope.cluster).then(function (response) {
      //$scope.resource = response;

      if (response) {
        $scope.showAlert("Cluster Updated", "Cluster Updated", "ok", "Cluster Updated successfully " + $scope.cluster.Name);
      }
      else
        $scope.showAlert("Error", "Error", "ok", "There is an error ");

    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };


  angular.element(document).ready(function () {
    $scope.loadResource();
  });

});


app.controller("ClusterViewController", function ($scope, $mdDialog, $routeParams, resource) {


  $scope.loadResource = function () {
    resource.GetResource($routeParams.id).then(function (response) {
      $scope.resource = response;
      resource.User = response;
    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };


  $scope.loadResource();


});

app.controller("LoadBalancerController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {

  $scope.cluster = clusterService.Cluster;

  $scope.showAdvanced = function (ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'partials/loadBalancerAdd.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false,
      fullscreen: useFullScreen,
    })
      .then(function (answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
    $scope.$watch(function () {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function (wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  function DialogController($scope, $mdDialog, clusterService) {
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

    $scope.hide = function () {
      $mdDialog.hide();
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
    $scope.saveLoadBalancer = function (data) {

      $scope.cluster = clusterService.Cluster;
      clusterService.AddLoadBalancer($scope.cluster).then(function (response) {
        $mdDialog.cancel();
        if (response) {
          $scope.showAlert("Cluster Updated", "Cluster Updated", "ok", "Successfully Added Load Balancer.");
        }
        else {
          $scope.cluster.LoadBalancer.MainIP = "Error";

          $scope.showAlert("Error", "Error", "ok", "There is an error ");
        }
      }, function (error) {
        $scope.cluster.LoadBalancer.MainIP = "Error";
        $mdDialog.cancel();
        $scope.showAlert("Error", "Error", "ok", "There is an error ");

      });


    };
  };
});

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


