/**
 * Created by dinusha on 1/21/2016.
 */
/**
 * Created by dinusha on 1/14/2016.
 */
(function() {
  var app = angular.module("userManagementApp");


  var AttendantTransferController = function ($scope, dvpHandler, sharedData, $location, $mdDialog, $mdToast)
  {
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

    $scope.onGroupPressed = function()
    {
      $location.url("/group");
    };

    $scope.onUserPressed = function()
    {
      $location.url("/users");
    };



    $scope.onSavePressed = function()
    {
      if($scope.IsEdit)
      {
        dvpHandler.updateTransferCodes($scope.transConfig).then(function(data1)
        {
          if(data1.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Transfer codes updated successfully", "SUCCESS");

          }
          else
          {
            var errMsg = data1.CustomMessage;

            if(data1.Exception)
            {
              errMsg = 'Assign user to extension error : ' + data1.Exception.Message;
              mdAleartDialog("ERROR", errMsg, "ERROR");
            }
          }

        }, function(err)
        {
            mdAleartDialog("ERROR", "Communication error occurred while updating transfer codes", "ERROR");
        });
      }
      else
      {
        //Save

        dvpHandler.saveTransferCodes($scope.transConfig).then(function(data1)
        {
          if(data1.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Transfer codes saved successfully", "SUCCESS");
          }
          else
          {
            var errMsg = data1.CustomMessage;

            if(data1.Exception)
            {
              errMsg = 'Get context Error : ' + data1.Exception.Message;
            }

            mdAleartDialog("ERROR", errMsg, "Save Error");
          }

        }, function(err)
        {
          mdAleartDialog("ERROR", "Communication error occurred while saving transfer codes", "Save Error");
        });
      }

    };

    var loadTransferCodes = function()
    {
      dvpHandler.getTransferCodes().then(function(data)
      {
        if(data.IsSuccess)
        {
          if(data.Result)
          {
            $scope.IsEdit = true;
          }
          else
          {
            $scope.IsEdit = false;
          }
          $scope.transConfig = data.Result;
        }
        else
        {
          var errMsg = data.CustomMessage;

          if(data.Exception)
          {
            errMsg = 'Get sip user error : ' + data.Exception.Message;
          }
          $mdToast.show(
            $mdToast.simple()
              .textContent(errMsg)
              .position($scope.getToastPosition())
              .hideDelay(5000)
          );

          $location.url("/users");
        }

      }, function(err)
      {
        var errMsg = "Error occurred while getting sip user";
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

        $location.url("/users");


      });
    }

    loadTransferCodes();

  };

  app.controller("AttendantTransferController", AttendantTransferController);


}());
