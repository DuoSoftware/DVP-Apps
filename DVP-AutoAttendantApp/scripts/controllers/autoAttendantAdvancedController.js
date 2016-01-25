/**
 * Created by dinusha on 1/24/2016.
 */
(function() {
  var app = angular.module("autoAttendantApp");

  var AutoAttendantAdvancedController = function ($scope, dvpHandler, sharedData, $location, $mdDialog, $mdToast, $filter)
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

    $scope.onDeletePressed = function(ev, name)
    {
      var confirm = $mdDialog.confirm()
        .title('Delete auto attendant')
        .textContent('Warning - Are you sure you want to delete auto attendant record')
        .ariaLabel('Delete Auto Attendant')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function()
        {
          dvpHandler.deleteAutoAttendant(name)
            .then(function(data)
            {
              if(data.IsSuccess)
              {
                $scope.reloadAutoAttList();
              }
              else
              {
                var errMsg = data.CustomMessage;

                if(data.Exception)
                {
                  errMsg = 'Delete auto attendant error : ' + data.Exception.Message;
                }
                mdAleartDialog("ERROR", errMsg, "ERROR");
              }

            },
            function(err)
            {
              mdAleartDialog("ERROR", 'Delete auto attendant error', "ERROR");

            })
        },
        function() {
        });

    };

    $scope.onSavePressed = function()
    {
        var filterArr = $filter('filter')($scope.actionList, {OnEvent: $scope.actionConfig.OnEvent});

        if(filterArr.length == 0)
        {
          //save
          dvpHandler.setAction(sharedData.AutoAttendant.Name, $scope.actionConfig).then(function(data)
          {
            if(data.IsSuccess)
            {
              mdAleartDialog("SUCCESS", "Auto attendant saved successfully", "SUCCESS");
              $scope.actionConfig = {};
              $scope.reloadActionList();
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
      else
        {
          mdAleartDialog("ERROR", 'On Event cannot contain duplicate values, please enter a new value', "ERROR");
        }




    }

    $scope.reloadActionList = function()
    {
      if(sharedData.AutoAttendant && sharedData.AutoAttendant.Name)
      {
        dvpHandler.getAutoAttendant(sharedData.AutoAttendant.Name).then(function(data)
        {
          if(data.IsSuccess)
          {
            $scope.actionList = data.Result.Actions;
            $scope.total = data.Result.Actions.length;
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
          var errMsg = "Error occurred while getting action list";
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
      }

    };

    $scope.onCancelPressed = function()
    {
      $location.url("/autoAttendant/" + sharedData.AutoAttendant.Name);
    };

    $scope.reloadActionList();

  };

  app.controller("AutoAttendantAdvancedController", AutoAttendantAdvancedController);
}());

