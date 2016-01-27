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





    return {
      getSchedules: getSchedules
    };
  };



  var module = angular.module("scheduleApp");
  module.factory("dvpHandler", dvpHandler);

}());
