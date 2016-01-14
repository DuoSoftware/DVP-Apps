var app = angular.module("NetworkManageApp");

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


