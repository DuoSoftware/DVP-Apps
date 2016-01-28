/**
 * Created by dinusha on 1/26/2016.
 */
(function() {
  var app = angular.module("scheduleApp");

  var ScheduleListController = function ($scope, dvpHandler, $location, $mdDialog, $mdToast)
  {
    $scope.query = {
      limit: 5,
      page: 1
    };

    $scope.IsHide = true;


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

    $scope.onNewPressed = function()
    {
      $scope.IsEdit = false;
      $scope.IsHide = false;
      $scope.scheduleConfig = {};
    };

    $scope.onAppointmentPressed = function(scheduleObj)
    {
      $scope.IsEdit = false;
      $scope.IsHide = true;
      $location.url("/schedule/" + scheduleObj.id + "/appointments");
      $scope.scheduleConfig = {};
    };

    $scope.onSavePressed = function()
    {
      if($scope.IsEdit)
      {
        //update
        dvpHandler.updateSchedule($scope.scheduleConfig).then(function(data)
        {
          if(data.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Schedule updated successfully", "SUCCESS");
            $scope.reloadScheduleList();
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
          var errMsg = "Error occurred while updating schedule";
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
        dvpHandler.saveSchedule($scope.scheduleConfig).then(function(data)
        {
          if(data.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Schedule saved successfully", "SUCCESS");
            $scope.scheduleConfig = {};
            $scope.reloadScheduleList();
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
          var errMsg = "Error occurred while saving schedule";
          if(err.statusText)
          {
            errMsg = err.statusText;
          }

          mdAleartDialog("ERROR", errMsg, "ERROR");
        });

      }
    }

    $scope.onDeletePressed = function(ev, scheduleId)
    {
      var confirm = $mdDialog.confirm()
        .title('Delete schedule')
        .textContent('Warning - Are you sure you want to delete schedule record')
        .ariaLabel('Delete Schedule')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function()
        {
          dvpHandler.deleteSchedule(scheduleId)
            .then(function(data)
            {
              if(data.IsSuccess)
              {
                $scope.reloadScheduleList();
              }
              else
              {
                var errMsg = data.CustomMessage;

                if(data.Exception)
                {
                  errMsg = 'Delete schedule error : ' + data.Exception.Message;
                }
                mdAleartDialog("ERROR", errMsg, "ERROR");
              }

            },
            function(err)
            {
              mdAleartDialog("ERROR", 'Delete schedule error', "ERROR");
            })
        },
        function() {
        });

    };

    $scope.onEditPressed = function(scheduleObj)
    {
      $scope.IsEdit = true;
      $scope.IsHide = false;
      $scope.tempSchedule = {};
      angular.copy(scheduleObj, $scope.tempSchedule);
      $scope.scheduleConfig = $scope.tempSchedule;
    };

    $scope.reloadScheduleList = function()
    {
      dvpHandler.getSchedules().then(function(data)
      {
        if(data.IsSuccess)
        {
          $scope.scheduleList = data.Result;
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
        var errMsg = "Error occurred while getting schedule list";
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

    $scope.reloadScheduleList();

  };

  app.controller("ScheduleListController", ScheduleListController);
}());
