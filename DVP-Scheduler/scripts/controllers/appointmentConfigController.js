/**
 * Created by dinusha on 1/27/2016.
 */

(function() {
  var app = angular.module("scheduleApp");

  var AppointmentConfigController = function ($scope, dvpHandler, $location, $mdDialog, $mdToast, $routeParams, $anchorScroll)
  {
    $scope.query = {
      limit: 5,
      page: 1
    };

    $scope.appConfig = {
      ScheduleId : $routeParams.scheduleId
    };

    $scope.appointmentStatus = 'New Appointment';

    $scope.IsHide = false;

    $scope.appConfig.RecurrencePattern = 'NONE';


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
      $scope.appointmentStatus = 'New Appointment';
      $scope.appConfig = {
        ScheduleId : $routeParams.scheduleId
      };

      var old = $location.hash();
      $location.hash('edit');
      $anchorScroll();
      $location.hash(old);
    };

    $scope.validateDays = function()
    {
      if($scope.IsHide)
      {
        return true;
      }
      else
      {
        return ($scope.appConfig.RecurrencePattern === 'NONE' || $scope.appConfig.RecurrencePattern == 'DAILY');
      }
    };


    $scope.onSavePressed = function()
    {
      if($scope.IsEdit)
      {
        //update
        dvpHandler.updateAppointment($scope.appConfig).then(function(data)
        {
          if(data.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Appointment updated successfully", "SUCCESS");
            $scope.reloadAppointmentList();
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
          var errMsg = "Error occurred while updating appointment";
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
        dvpHandler.saveAppointment($scope.appConfig).then(function(data)
        {
          if(data.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Appointment saved successfully", "SUCCESS");
            $scope.appConfig = {
              ScheduleId : $routeParams.scheduleId
            };
            $scope.reloadAppointmentList();
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
          var errMsg = "Error occurred while saving appointment";
          if(err.statusText)
          {
            errMsg = err.statusText;
          }

          mdAleartDialog("ERROR", errMsg, "ERROR");
        });

      }
    };

    $scope.onDeletePressed = function(ev, appointmentId)
    {
      var confirm = $mdDialog.confirm()
        .title('Delete appointment')
        .textContent('Warning - Are you sure you want to delete appointment')
        .ariaLabel('Delete Appointment')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function()
        {
          dvpHandler.deleteAppointment(appointmentId)
            .then(function(data)
            {
              if(data.IsSuccess)
              {
                $scope.reloadAppointmentList();
              }
              else
              {
                var errMsg = data.CustomMessage;

                if(data.Exception)
                {
                  errMsg = 'Delete appointment error : ' + data.Exception.Message;
                }
                mdAleartDialog("ERROR", errMsg, "ERROR");
              }

            },
            function(err)
            {
              mdAleartDialog("ERROR", 'Delete appointment error', "ERROR");
            })
        },
        function() {
        });

    };

    var DaysOfWeekConverter = function(daysOfWeek)
    {
      var arr = daysOfWeek.split(',');

      var daysObj = {
        Monday : false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
      };

      if(daysOfWeek.indexOf('Monday') !== -1)
      {
        daysObj.Monday = true;
      }
      if(daysOfWeek.indexOf('Tuesday') !== -1)
      {
        daysObj.Tuesday = true;
      }
      if(daysOfWeek.indexOf('Wednesday') !== -1)
      {
        daysObj.Wednesday = true;
      }
      if(daysOfWeek.indexOf('Thursday') !== -1)
      {
        daysObj.Thursday = true;
      }
      if(daysOfWeek.indexOf('Friday') !== -1)
      {
        daysObj.Friday = true;
      }
      if(daysOfWeek.indexOf('Saturday') !== -1)
      {
        daysObj.Saturday = true;
      }
      if(daysOfWeek.indexOf('Sunday') !== -1)
      {
        daysObj.Sunday = true;
      }

      return daysObj;
    };

    $scope.onEditPressed = function(appointmentObj)
    {
      $scope.IsEdit = true;
      $scope.IsHide = false;
      $scope.appointmentStatus = 'Edit Appointment : ' + appointmentObj.AppointmentName;
      $scope.tempApp = {};
      if(appointmentObj.StartDate)
      {
        appointmentObj.StartDate = new Date(appointmentObj.StartDate);
      }
      if(appointmentObj.EndDate)
      {
        appointmentObj.EndDate = new Date(appointmentObj.EndDate);
      }
      if(appointmentObj.StartTime)
      {
        appointmentObj.StartTime = new Date(appointmentObj.StartTime);
      }
      if(appointmentObj.EndTime)
      {
        appointmentObj.EndTime = new Date(appointmentObj.EndTime);
      }


      appointmentObj.DaysOfWeek = DaysOfWeekConverter(appointmentObj.DaysOfWeek);

      angular.copy(appointmentObj, $scope.tempApp);
      $scope.appConfig = $scope.tempApp;
      var old = $location.hash();

      $location.hash('edit');
      $anchorScroll();
      $location.hash(old);
    };

    $scope.reloadAppointmentList = function()
    {
      dvpHandler.getAppointments($routeParams.scheduleId).then(function(data)
      {
        if(data.IsSuccess)
        {
          $scope.appointmentList = data.Result;
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
        var errMsg = "Error occurred while getting appointment list";
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

    $scope.reloadAppointmentList();

    $scope.onCancelPressed = function()
    {
      $location.url("/schedules");
    };

  };

  app.controller("AppointmentConfigController", AppointmentConfigController);
}());
