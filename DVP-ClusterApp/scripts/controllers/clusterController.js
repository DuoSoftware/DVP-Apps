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
        if(answer)
          $scope.updateResource();
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
    $scope.cluster = clusterService.Cluster;
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

        if (response) {
          $mdDialog.hide(response);
          $scope.showAlert("Cluster Updated", "Cluster Updated", "ok", "Successfully Added Load Balancer.");
        }
        else {
          $scope.cluster.LoadBalancer.MainIP = "Error";
          $mdDialog.cancel();
          $scope.showAlert("Error", "Error", "ok", "There is an error ");
        }
      }, function (error) {
        $scope.cluster.LoadBalancer.MainIP = "Error";
        $mdDialog.cancel();
        $scope.showAlert("Error", "Error", "ok", "There is an error ");

      });


    };
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


app.controller("ClusterConfigController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {
});

app.controller("NetworkListController", function ($scope, $location, $mdDialog, $log, $filter, networkService) {

  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };

  $scope.userNatworks = [];
  $scope.TelcoNetworks = [];
  $scope.network = {};

  $scope.query = {
    order: 'Network',
    limit: 5,
    page: 1
  };

  $scope.queryTelco = {
    order: 'Network',
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

  $scope.GetNetworks = function () {

    networkService.GetNetworks().then(function (response) {

      $log.debug("GetNetworks: response" + response);
      $scope.dataReady = true;
      $scope.networks = response;
      $scope.userNatworks = $filter('filter')(response, {Type: "USER"});
      $scope.TelcoNetworks = $filter('filter')(response, {Type: "TELCO"});
      $scope.total = $scope.userNatworks.length;
      $scope.totalTELCO = $scope.TelcoNetworks.length;

    }, function (error) {
      $log.debug("GetNetworks err");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });

  };

  $scope.networkConfigure = function (networkId) {

    $location.path('/networkConfigure/' + networkId + '/edit');

  };

  $scope.viewNetwork = function (networkId) {

    $location.path('/network/' + networkId + '/edit');

  };

  $scope.deleteNetwork = function (networkObj) {

    $scope.showConfirm("Delete Cluster", "Delete", "ok", "cancel", "Do you want to delete " + networkObj.Network, function (obj) {

      networkService.DeleteNetwork(networkObj).then(function (response) {
        if (response) {
          $scope.GetNetworks();
          $scope.showAlert("Deleted", "Deleted", "ok", "Cluster " + obj.Network + " Deleted successfully");
        }
        else
          $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }, function (error) {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });

    }, function () {

    }, networkObj)
  };

  $scope.GetNetworks();

  /*
   angular.element(document).ready(function () {
   campaignService.getOngoingCampaigns().then(onGetSuccess, onError);
   });*/

});

app.controller("NetworkEditController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, networkService) {

  $scope.editMode=false;
  $scope.network = {};

  $scope.NetType = [
    {Type: "USER", name: 'USER'},
    {Type: "TELCO", name: 'TELCO'},

  ];

  $scope.createCluster = function () {
    networkService.CreateNetwork($scope.network).then(function (response) {
      if (response) {
        $scope.showAlert("Cluster Created", "Cluster Created", "ok", "Network created successfully " + $scope.network.Network);
        $location.path('/network/list');
      } else {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }

    }, function (error) {
      $log.debug("onGetSuccess3");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
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

  $scope.loadNetwork = function () {
    if ($routeParams.id) {
      $scope.editMode=true;
      networkService.GetNetwork($routeParams.id).then(function (response) {
        $scope.network = response;

      }, function (error) {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });
    }
  };

  $scope.updateNetwork = function () {

    networkService.UpdateNetwork($scope.network).then(function (response) {
      if (response) {
        $scope.showAlert("Cluster Updated", "Cluster Updated", "ok", "Network Updated successfully " + $scope.network.Network);
      }
      else
        $scope.showAlert("Error", "Error", "ok", "There is an error ");

    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };

  $scope.loadNetwork();

});



