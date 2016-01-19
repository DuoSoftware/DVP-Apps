/**
 * Created by dinusha on 1/17/2016.
 */

(function()
{

  var sharedData = function()
  {
    return {
      User : {}
    };

  };

  var module = angular.module("userManagementApp");
  module.factory("sharedData", sharedData);

}());
