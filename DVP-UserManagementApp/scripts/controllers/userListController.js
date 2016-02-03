(function() {
  var app = angular.module("userManagementApp");

  var UserListController = function ($scope, dvpHandler, sharedData, $location, $mdDialog, $mdToast)
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

    $scope.onNewPressed = function()
    {
      sharedData.User.IsEdit = false;
      $location.url("/user");
    };

    $scope.onGroupPressed = function()
    {
      $location.url("/group");
    };

    $scope.onTransPressed = function()
    {
      $location.url("/attTransfer");
    };

    $scope.onDeleteUser = function(ev, username)
    {
      var confirm = $mdDialog.confirm()
        .title('Delete Sip User')
        .textContent('Warning - Are you sure you want to delete sip user')
        .ariaLabel('Delete Sip User')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function()
        {
          dvpHandler.updateSipUserStatus(username, false)
            .then(function(data)
            {
              if(data.IsSuccess)
              {
                $scope.reloadUserList();
              }
              else
              {
                var errMsg = data.CustomMessage;

                if(data.Exception)
                {
                  errMsg = data.Exception.Message;
                }
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error occurred while deleting sip user')
                    .textContent(errMsg)
                    .ariaLabel('')
                    .ok('Ok')
                );
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
      sharedData.User = usrObj;
      $location.url("/user");
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
