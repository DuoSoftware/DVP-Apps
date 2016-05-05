/**
 * Created by Rajinda on 12/31/2015.
 */

var fileModule = angular.module("engagementServiceModule", []);

fileModule.factory("engagementService", function ($http,$filter,  AuthService, engagementUrl) {


  var getItemsBySessionId = function (engagementId) {

    return $http({
      url: engagementUrl + "Engagement/"+engagementId+"/attachments",
      method: "get",
      headers: {
        'Content-type': 'application/json',
        'authorization': AuthService.Token
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var getEngagementsBySessionId = function (engagementId) {

    return $http({
      url: engagementUrl +  "Engagement/"+engagementId+"/history/10/1",
      method: "get",
      headers: {
        'Content-type': 'application/json',
        'authorization': AuthService.Token
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var loadEngagements = function (size,page) {

    var date = $filter('date')(new Date(),'ddMMyyyy');
    return $http({
      url: engagementUrl + "Engagements/"+date+"/10/1/details",
      method: "get",
      headers: {
        'Content-type': 'application/json',
        'authorization': AuthService.Token
      }
    }).then(function (response) {
     return response.data.Result;
    });
  };

  var saveEngagement = function (engagement) {

    var data = {
      "engagementId": engagement.engagementId,
      "engagementType": "Engagement",
      "data": engagement.data
    };
    return $http({
      url: engagementUrl + "Engagement",
      method: "post",
      data: data,
      headers: {
        'Content-type': 'application/json',
        'authorization': AuthService.Token
      }
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var saveItem = function (item,engagement) {

    var data = {
      "attachmentType":"EngagementItem",
      "data":item
    };
    return $http({
      url: engagementUrl + "Engagement/"+engagement.engagementId+"/attachment/"+engagement._id,
      method: "post",
      data: data,
      headers: {
        'Content-type': 'application/json',
        'authorization': AuthService.Token
      }
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  return {
    GetItemsBySessionId:getItemsBySessionId,
    SaveItem:saveItem,
    GetEngagementsBySessionId:getEngagementsBySessionId,
    SaveEngagement: saveEngagement,
    LoadEngagements:loadEngagements,
    Engagement:{}

  }

});

