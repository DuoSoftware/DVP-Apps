/**
 * Created by dinusha on 1/17/2016.
 */

(function()
{

  var sharedData = function()
  {
    return {
      AutoAttendant : {}
    };

  };

  var module = angular.module("autoAttendantApp");
  module.factory("sharedData", sharedData);

}());
