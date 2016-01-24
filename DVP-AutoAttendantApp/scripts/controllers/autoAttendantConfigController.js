/**
 * Created by dinusha on 1/22/2016.
 */

(function() {
  var app = angular.module("autoAttendantApp");


  var AutoAttendantConfigController = function ($scope, dvpHandler, sharedData, $location, $mdDialog, $mdToast)
  {
    $scope.IsEdit = sharedData.IsEdit;

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

    var clearFormOnSave = function()
    {
      $scope.basicConfig = {};
    };

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

    $scope.onActionPressed = function()
    {
      if(sharedData.IsEdit)
      {
        $location.url("/autoAttendant/" + sharedData.AutoAttendant.Name + "/actions");
      }

    };

    dvpHandler.getExtensions().then(function(data)
    {
      if(data.IsSuccess)
      {
        $scope.extList = data.Result;
      }
      else
      {
        var errMsg = data.CustomMessage;

        if(data.Exception)
        {
          errMsg = 'Get extension Error : ' + data.Exception.Message;
        }
        $mdToast.show(
          $mdToast.simple()
            .textContent(errMsg)
            .position($scope.getToastPosition())
            .hideDelay(5000)
        );
      }

    }, function(err)
    {
      var errMsg = "Error occurred while getting extension list";
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


    });

    dvpHandler.getGreetingFileMetadata('123').then(function(data)
    {
      if(data.IsSuccess)
      {
        $scope.fileList = data.Result;
      }
      else
      {
        var errMsg = data.CustomMessage;

        if(data.Exception)
        {
          errMsg = 'Get files Error : ' + data.Exception.Message;
        }
        $mdToast.show(
          $mdToast.simple()
            .textContent(errMsg)
            .position($scope.getToastPosition())
            .hideDelay(5000)
        );
      }

    }, function(err)
    {
      var errMsg = "Error occurred while getting file list";
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


    });

    $scope.onSavePressed = function()
    {
      if($scope.IsEdit)
      {
        //update

        dvpHandler.updateAutoAttendants($scope.basicConfig).then(function(data)
        {
          if(data.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Auto attendant updated successfully", "SUCCESS");
          }
          else
          {
            var errMsg = data.CustomMessage;

            if(data.Exception)
            {
              errMsg = data.Exception.Message;
            }
            mdAleartDialog("ERROR", errMsg, "ERROR");
          }

          $scope.dataReady = true;

        }, function(err)
        {
          var errMsg = "Error occurred while updating auto attendant";
          if(err.statusText)
          {
            errMsg = err.statusText;
          }

          mdAleartDialog("ERROR", errMsg, "ERROR");
        });
      }
      else
      {
        //save
        dvpHandler.saveAutoAttendants($scope.basicConfig).then(function(data)
        {
          if(data.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Auto attendant saved successfully", "SUCCESS");
            clearFormOnSave();
            $scope.reloadGroupList();
          }
          else
          {
            var errMsg = data.CustomMessage;

            if(data.Exception)
            {
              errMsg = data.Exception.Message;
            }
            mdAleartDialog("ERROR", errMsg, "ERROR");
          }

          $scope.dataReady = true;

        }, function(err)
        {
          var errMsg = "Error occurred while saving auto attendant";
          if(err.statusText)
          {
            errMsg = err.statusText;
          }

          mdAleartDialog("ERROR", errMsg, "ERROR");
        });

      }
    }

    $scope.onCancelPressed = function()
    {
      $location.url("/autoAttendants");
    };

    if($scope.IsEdit)
    {
      dvpHandler.getAutoAttendant(sharedData.AutoAttendant.Name).then(function(data)
      {
        if(data.IsSuccess)
        {
          $scope.basicConfig = data.Result;
        }
        else
        {
          var errMsg = data.CustomMessage;

          if(data.Exception)
          {
            errMsg = 'Get auto attendant error : ' + data.Exception.Message;
          }
          $mdToast.show(
            $mdToast.simple()
              .textContent(errMsg)
              .position($scope.getToastPosition())
              .hideDelay(5000)
          );
        }

      }, function(err)
      {
        var errMsg = "Error occurred while getting auto attendant";
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


      });
    }

  };

  app.controller("AutoAttendantConfigController", AutoAttendantConfigController);


}())
