/**
 * Created by dinusha on 12/30/2015.
 */
(function() {

  var dvpHandler = function($http)
  {
    var getPABXUsers = function()
    {
      return $http({
        method: 'GET',
        url: 'http://pbxservice.104.131.67.21.xip.io/DVP/API/:version/PBXService/PbxUsers',
        headers: {
          'authorization': 'hhhh'
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    return {
      getPABXUsers: getPABXUsers
    };
  };

  var module = angular.module("pabxUserApp");
  module.factory("dvpHandler", dvpHandler);

}());
