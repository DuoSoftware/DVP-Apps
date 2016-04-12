/**
 * Created by dinusha on 1/26/2016.
 */

(function() {

  var dvpHandler = function($http)
  {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
    var getSchedules = function()
    {
      return $http({
        method: 'GET',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedules',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getAppointments = function(scheduleId)
    {
      return $http({
        method: 'GET',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedule/' + scheduleId + '/Appointments',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveSchedule = function(scheduleInfo)
    {
      return $http({
        method: 'POST',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedule',
        headers: {
          'authorization': authToken
        },
        data: scheduleInfo
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveAppointment = function(appInfo)
    {
      return $http({
        method: 'POST',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedule/Appointment',
        headers: {
          'authorization': authToken
        },
        data: appInfo
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateAppointment = function(appInfo)
    {
      return $http({
        method: 'POST',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedule/Appointment/' + appInfo.id,
        headers: {
          'authorization': authToken
        },
        data: appInfo
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateSchedule = function(scheduleInfo)
    {
      return $http({
        method: 'POST',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedule/' + scheduleInfo.id,
        headers: {
          'authorization': authToken
        },
        data: scheduleInfo
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deleteSchedule = function(scheduleId)
    {
      return $http({
        method: 'DELETE',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedule/' + scheduleId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deleteAppointment = function(appointmentId)
    {
      return $http({
        method: 'DELETE',
        url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Appointment/' + appointmentId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };


    return {
      getSchedules: getSchedules,
      saveSchedule: saveSchedule,
      updateSchedule: updateSchedule,
      deleteSchedule: deleteSchedule,
      getAppointments: getAppointments,
      saveAppointment: saveAppointment,
      updateAppointment: updateAppointment,
      deleteAppointment: deleteAppointment
    };
  };



  var module = angular.module("scheduleApp");
  module.factory("dvpHandler", dvpHandler);

}());
