/**
 * Created by dinusha on 1/26/2016.
 */

(function() {

  var dvpHandler = function($http)
  {
    var getSchedules = function()
    {
      return $http({
        method: 'GET',
        url: 'http://localhost:8084/DVP/API/6.0/LimitAPI/Schedules',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://localhost:8084/DVP/API/6.0/LimitAPI/Schedule/' + scheduleId + '/Appointments',
        headers: {
          'authorization': 'hhhh'
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
        url: 'http://localhost:8084/DVP/API/6.0/LimitAPI/Schedule',
        headers: {
          'authorization': 'hhhh'
        },
        data: scheduleInfo
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateSchedule = function(scheduleInfo)
    {
      return $http({
        method: 'POST',
        url: 'http://localhost:8084/DVP/API/6.0/LimitAPI/Schedule/' + scheduleInfo.id,
        headers: {
          'authorization': '1#1'
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
        url: 'http://localhost:8084/DVP/API/6.0/LimitAPI/Schedule/' + scheduleId,
        headers: {
          'authorization': '1#1'
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
      getAppointments: getAppointments
    };
  };



  var module = angular.module("scheduleApp");
  module.factory("dvpHandler", dvpHandler);

}());
