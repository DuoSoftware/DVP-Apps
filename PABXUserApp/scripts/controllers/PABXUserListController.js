/**
 * Created by dinusha on 12/30/2015.
 */

(function() {
  var app = angular.module("pabxUserApp");

  var PABXUserListController = function ($scope, dvpHandler, sharedResPABXUser, $location, $mdDialog)
  {
      $scope.query = {
        limit: 5,
        page: 1
      };

      $scope.dataReady = false;

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
           $location.url("/pabxUser/123");
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
          $location.url("/pabxUser/123");
      };

      $scope.reloadUserList = function()
      {
        var onGetPABXUserListSuccess = function(data)
        {
          $scope.pabxUsrList = data.Result;
          $scope.total = data.Result.length;
          $scope.dataReady = true;
        };

        var onGetPABXUserListError = function(err)
        {
          console.log('Error occurred : ' + err);
          $scope.serviceErr = "Could not load pabx users";
          $scope.dataReady = true;
        };


        dvpHandler.getPABXUsers().then(onGetPABXUserListSuccess, onGetPABXUserListError);
      };

      $scope.reloadUserList();

  };

  app.controller("PABXUserListController", PABXUserListController);
}());
