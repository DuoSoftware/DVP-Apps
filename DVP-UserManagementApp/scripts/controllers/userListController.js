(function() {
  var app = angular.module("userManagementApp");

  var UserListController = function ($scope, dvpHandler, $location, $mdDialog, $mdToast)
  {
    $scope.query = {
      limit: 5,
      page: 1
    };

    $scope.dataReady = false;

    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function PickUserController($scope, $mdDialog, dvpHandler)
    {
      dvpHandler.getSIPUsers().then(function(data)
      {
        $scope.sipUserList = data.Result;
      }, function(err)
      {

      });
      $scope.onContinue = function()
      {
        sharedResPABXUser.PABXUser = {};
        sharedResPABXUser.PABXUser.UserUuid = $scope.selectedUserUuid;
        sharedResPABXUser.PABXUser.IsEdit = false;
        $mdDialog.hide();
      };
      $scope.onCancel = function()
      {
        $mdDialog.cancel();
      };
    }

    $scope.onNewPressed = function(ev)
    {

      $mdDialog.show({
        controller: PickUserController,
        templateUrl: '../PABXUserApp/partials/newUserSelectionView.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
        .then(function(answer)
        {
          $location.url("/pabxUser/" + sharedResPABXUser.PABXUser.UserUuid);
        }, function()
        {

        });
    };

    $scope.onDeleteUser = function(ev, userUuid)
    {
      var confirm = $mdDialog.confirm()
        .title('Delete PABX User')
        .textContent('Warning - this operation will delete pabx user and all its configuration')
        .ariaLabel('Delete User')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function()
        {
          dvpHandler.deletePABXUser(userUuid)
            .then(function(data)
            {
              if(data.IsSuccess)
              {
                $scope.reloadUserList();
              }

            },
            function(err)
            {

            })
        },
        function() {
        });

    };

    $scope.onEditPressed = function(usrObj)
    {
      usrObj.IsEdit = true;
      sharedResPABXUser.PABXUser = usrObj;
      $location.url("/pabxUser/" + sharedResPABXUser.PABXUser.UserUuid);
    };

    $scope.reloadUserList = function()
    {
      dvpHandler.getSIPUsers().then(function(data)
      {
        if(data.IsSuccess)
        {
          $scope.sipUsrList = data.Result;
          $scope.total = data.Result.length;
        }
        else
        {
          var errMsg = data.CustomMessage;

          if(data.Exception)
          {
            errMsg = data.Exception.Message;
          }
          $mdToast.show(
            $mdToast.simple()
              .textContent(errMsg)
              .position($scope.getToastPosition())
              .hideDelay(5000)
          );
        }

        $scope.dataReady = true;

      }, function(err)
      {
        var errMsg = "Error occurred while getting pabx user list";
        if(err.statusText)
        {
          errMsg = err.statusText;
        }
        $mdToast.show(
          $mdToast.simple()
            .textContent(errMsg)
            .position($scope.getToastPosition())
            .hideDelay(5000)
        );
        $scope.dataReady = true;
      });
    };

    $scope.reloadUserList();

  };

  app.controller("UserListController", UserListController);
}());
