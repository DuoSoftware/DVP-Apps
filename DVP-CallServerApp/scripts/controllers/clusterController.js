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
    order: "Name",
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
  $scope.IpAddress = {};

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

  $scope.updateCallServer = function () {

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

  $scope.loadCallServer = function () {
    /*clusterService.GetIpAddresses().then(function (response) {
      $scope.ipAddress = response;
    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "Fail to get IP Address List.");
    });*/

    if ($routeParams.id) {
      clusterService.GetCallServer($routeParams.id).then(function (response) {
        $scope.callServer = response;
        clusterService.CallServer = $scope.callServer;
      }, function (error) {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });
    }

  };


  $scope.showAdvanced = function (ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'partials/addIpAddress.html',
      parent: angular.element(document.body),
      clickOutsideToClose: false,
      fullscreen: useFullScreen,
    })
      .then(function (answer) {
        if(answer.IsSuccess)
          $scope.updateCallServer();
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
    $scope.callServer = clusterService.CallServer;

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

    $scope.addIpAddress = function (data) {

      data.CallserverID = clusterService.CallServer.id;
      clusterService.CreateIpAddress(data).then(function (response) {
        data.IsSuccess = response;
        if (response) {
          $mdDialog.hide(data);
          clusterService.CallServer.InternalMainIP = data.IP;
          $scope.showAlert("IP Address", "Add IP Address", "ok", "IP address Successfully Added.");
        }
        else {
          $mdDialog.cancel();
          $scope.callServer.InternalMainIP = "Error";

          $scope.showAlert("Error", "Error", "ok", "There is an error ");
        }

      }, function (error) {
        $scope.callServer.InternalMainIP = "Error";
        $mdDialog.cancel();
        $scope.showAlert("Error", "Error", "ok", "There is an error ");

      });


    };
  }


  angular.element(document).ready(function () {
    $scope.loadCallServer();
  });


});

app.controller("ProfileListController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {

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
    order: "ProfileName",
    limit: 10,
    page: 1
  };
  $scope.dataReady = false;

  $scope.loadProfiles = function () {

    clusterService.GetProfiles().then(function (response) {

      $log.debug("GetCallServers: response" + response);
      $scope.dataReady = true;
      $scope.profiles = response;
      $scope.total = response.length;

    }, function (error) {
      $log.debug("GetCallServers err");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });

  };

  $scope.editProfile = function (profileId) {

    $location.path('/profile/' + profileId + '/edit');

  };

  $scope.deleteProfile = function (profile) {

    $scope.showConfirm("Delete Cluster", "Delete", "ok", "cancel", "Do you want to delete " + profile.ProfileName, function (obj) {

      clusterService.DeleteProfile(profile).then(function (response) {
        if (response) {
          $scope.loadProfiles();
          $scope.showAlert("Deleted", "Deleted", "ok", "Call Server " + obj.ProfileName + " Deleted successfully");
        }
        else
          $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }, function (error) {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });

    }, function () {

    }, profile)
  };

  $scope.loadProfiles();

});

app.controller("ProfileEditController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {

  $scope.profile = {};


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

  $scope.createProfile = function () {

    clusterService.CreateProfile($scope.profile).then(function (response) {
      if (response) {
        $scope.showAlert("Profile Created", "Profile Created", "ok", "Profile - "+ $scope.profile.ProfileName+" created successfully " );
        $location.path('/profile/list');
      } else {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }
    }, function (error) {
      $log.debug("onGetSuccess3");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };

  $scope.updateProfile = function () {

    clusterService.UpdateProfile($scope.profile).then(function (response) {
      if (response) {
        $scope.showAlert("Profile Updated", "Profile Updated", "ok", "Profile - "+ $scope.profile.ProfileName+" Updated successfully." );
      }
      else
        $scope.showAlert("Error", "Error", "ok", "There is an error ");

    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };

  $scope.loadProfile = function () {

    clusterService.GetIpAddresses().then(function (response) {
      $scope.ipAddress = response;
    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "Fail to get IP Address List.");
    });

    if ($routeParams.id) {
      clusterService.GetProfile($routeParams.id).then(function (response) {
        $scope.profile = response;
        clusterService.Profile = $scope.profile;

      }, function (error) {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });
    }

  };


  $scope.loadProfile();

});

app.controller("IPAddressController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {



});
