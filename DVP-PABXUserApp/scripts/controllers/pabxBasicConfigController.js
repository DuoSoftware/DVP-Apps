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

    var mdAleartDialog = function(title, content, ariaLabel)
    {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(title)
          .textContent(content)
          .ariaLabel(ariaLabel)
          .ok('Ok')
      );
    };

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
                  mdAleartDialog("SUCCESS", "Basic Configuration Updated Successfully", "SUCCESS");
                }
                else
                {
                  var errMsg = data2.CustomMessage;

                  if(data2.Exception)
                  {
                    errMsg = data2.Exception.Message;
                  }
                  mdAleartDialog("WARINING", "Basic Configuration Partially Updated - ERROR : " + errMsg, "WARINING");
                }

              }, function(err)
              {
                mdAleartDialog("WARINING", "Basic Configuration Partially Updated - Communication Error on Saving Allowed Numbers : ", "WARINING");
              });

            }
            else
            {
              var errMsg = data1.CustomMessage;

              if(data1.Exception)
              {
                errMsg = data1.Exception.Message;
              }
              mdAleartDialog("ERROR", errMsg, "ERROR");
            }

          }, function(err)
          {
            mdAleartDialog("ERROR", "Communication Error Occurred", "ERROR");
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
                  mdAleartDialog("SUCCESS", "Basic Configuration Saved Successfully", "SUCCESS");
                }
                else
                {
                  var errMsg = data2.CustomMessage;

                  if(data2.Exception)
                  {
                    errMsg = data2.Exception.Message;
                  }
                  mdAleartDialog("WARINING", "Basic Configuration Partially Saved - ERROR : " + errMsg, "WARINING");
                }

              }, function(err)
              {
                mdAleartDialog("WARINING", "Basic Configuration Partially Saved - Communication Error on Saving Allowed Numbers : ", "WARINING");
              });

            }
            else
            {
              var errMsg = data1.CustomMessage;

              if(data1.Exception)
              {
                errMsg = data1.Exception.Message;
              }
              mdAleartDialog("ERROR", errMsg, "ERROR");
            }

          }, function(err)
          {
            mdAleartDialog("ERROR", "Communication Error Occurred", "ERROR");
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
