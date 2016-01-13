/**
 * Created by user-pc on 1/2/2016.
 */
(function() {
  var app = angular.module("pabxUserApp");

  var PABXBasicConfigController = function ($scope, dvpHandler, sharedResPABXUser, $mdDialog, $location)
  {
      $scope.basicConfig = sharedResPABXUser.PABXUser;
      $scope.allowedNumbers = [];
      $scope.timeZoneList = timeZones;

      $scope.onMenuButtonPressed = function(btnType)
      {
          if(btnType == 1)
          {
            $location.url("/pabxUser/" + sharedResPABXUser.PABXUser.UserUuid + "/template");
          }
          else if(btnType == 2)
          {
            $location.url("/pabxUser/" + sharedResPABXUser.PABXUser.UserUuid + "/followMe");
          }
          else if(btnType == 3)
          {
            $location.url("/pabxUser/" + sharedResPABXUser.PABXUser.UserUuid + "/forwarding");
          }
      };

      $scope.onCancelPressed = function()
      {
          $location.url("/pabxUsers");
      };

      $scope.onSavePressed = function()
      {
        if($scope.basicConfig.IsEdit)
        {
          dvpHandler.updatePABXUser($scope.basicConfig).then(function(data1)
          {
            if(data1.IsSuccess)
            {
              dvpHandler.setAllowedNumbers($scope.basicConfig.UserUuid, $scope.allowedNumbers).then(function(data2)
              {
                if(data2.IsSuccess)
                {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Basic configuration saved successfully')
                      .textContent('')
                      .ariaLabel('Save PBX User Done')
                      .ok('Ok')
                  );

                }

              }, function(err)
              {
                console.log('Error occurred : ' + err);
              });

            }

          }, function(err)
          {
            console.log('Error occurred : ' + err);
          });
        }
        else
        {
          //Save
          dvpHandler.savePABXUser($scope.basicConfig).then(function(data1)
          {
            if(data1.IsSuccess)
            {
              dvpHandler.setAllowedNumbers($scope.basicConfig.UserUuid, $scope.allowedNumbers).then(function(data2)
              {
                if(data2.IsSuccess)
                {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Basic configuration saved successfully')
                      .textContent('')
                      .ariaLabel('Save PBX User Done')
                      .ok('Ok')
                  );

                }

              }, function(err)
              {
                console.log('Error occurred : ' + err);
              });

            }

          }, function(err)
          {
            console.log('Error occurred : ' + err);
          });
        }

      };

      $scope.reloadDivertNumbers = function()
      {
        var onGetPABXTemplListSuccess = function(data)
        {
            $scope.pabxTemplList = data.Result;
        };

        var onGetPABXTemplListError = function(err)
        {
            console.log('Error occurred : ' + err);
        };


        dvpHandler.getPABXUserTemplates(sharedResPABXUser.PABXUser.UserUuid).then(onGetPABXTemplListSuccess, onGetPABXTemplListError);

      };

      var onGetGreetingFileSuccess = function(data)
      {
          if(data.IsSuccess)
          {
              $scope.fileList = data.Result;
          }

      };

      var onGetGreetingFileError = function(err)
      {
          console.log('Error occurred : ' + err);
      };

      var onGetPABXUserSuccess = function(data)
      {
        if(data.Result)
        {
            if($scope.basicConfig.IsEdit)
            {
              $scope.allowedNumbers = data.Result.AllowedNumbers;
            }
            else
            {
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('User already added')
                  .textContent('please use the edit button to edit')
                  .ariaLabel('Not a new user')
                  .ok('Ok')
              );

              $location.url("/pabxUsers");
            }

        }

      };

      var onGetPABXUserError = function(err)
      {
          console.log('Error occurred : ' + err);
      };


      dvpHandler.getPABXUser(sharedResPABXUser.PABXUser.UserUuid).then(onGetPABXUserSuccess, onGetPABXUserError);
      dvpHandler.getGreetingFileMetadata(sharedResPABXUser.PABXUser.UserUuid).then(onGetGreetingFileSuccess, onGetGreetingFileError);
      dvpHandler.getSchedules().then(function(data)
      {
        if(data.IsSuccess)
        {
          $scope.scheduleList = data.Result;
        }

      }, function(err)
      {

      });

      $scope.reloadDivertNumbers();
  };

  app.controller("PABXBasicConfigController", PABXBasicConfigController);
}());
