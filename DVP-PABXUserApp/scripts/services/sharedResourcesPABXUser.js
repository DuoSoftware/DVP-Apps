/**
 * Created by dinusha on 1/5/2016.
 */
(function()
{

  var sharedResPABXUser = function()
  {
      return {
        PABXUser : {}
      };

  };

  var module = angular.module("pabxUserApp");
  module.factory("sharedResPABXUser", sharedResPABXUser);

}());
