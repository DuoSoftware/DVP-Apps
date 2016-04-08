/**
 * Created by a on 1/19/2016.
 */


var service = angular.module("campaignService", []);

service.factory("campaign", function($http){

  var createCampaign = function(campaign){

    return $http.post("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign",
      {
        headers: {'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3YXJ1bmFAZHVvc29mdHdhcmUuY29tIiwianRpIjoiNmVmZmE5Y2EtMjk5ZS00N2QxLWE1ZGMtZDEzMmUwMzFlZDA2Iiwic3ViIjoiYWY1MzY0YmQtYTM3Yy00MzU4LWEwMDktMjBmZDY4MWMzYWU4IiwiZXhwIjoxNDYwNTQ5NTk2LCJ0ZW5hbnQiOiI1IiwiY29tcGFueSI6IjEwIiwic2NvcGUiOlt7InJlc291cmNlIjoiY2FtcGFpZ24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTQ1OTk0NDc5Nn0.KSdn9NXHyUr4GlJcKK-E9nQVBebTheOQy0swDQLEy5o'}
      },campaign).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };



  var updateCampaign = function(id, campaign){

    return $http.put("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/"+id,campaign).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };


  var getCampaign = function(id){

    return $http.get("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/"+id).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };


  var deleteCampaign = function(id){

    return $http.delete("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/"+id).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };


  var getCampaigns = function(){

    return $http.get("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaigns/0",
      {
        headers: {'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3YXJ1bmFAZHVvc29mdHdhcmUuY29tIiwianRpIjoiNmVmZmE5Y2EtMjk5ZS00N2QxLWE1ZGMtZDEzMmUwMzFlZDA2Iiwic3ViIjoiYWY1MzY0YmQtYTM3Yy00MzU4LWEwMDktMjBmZDY4MWMzYWU4IiwiZXhwIjoxNDYwNTQ5NTk2LCJ0ZW5hbnQiOiI1IiwiY29tcGFueSI6IjEwIiwic2NvcGUiOlt7InJlc291cmNlIjoiY2FtcGFpZ24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTQ1OTk0NDc5Nn0.KSdn9NXHyUr4GlJcKK-E9nQVBebTheOQy0swDQLEy5o'}
      }).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return [];
      }


    });
  };


  var getReasons = function(){

    return $http.get("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/Configuration/Reasons").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return [];
      }


    });
  };
  ///{version}/CampaignManager/Campaign/{CampaignId}/Configuration

  var getCallBacks = function(id){

    ///{version}/CampaignManager/Campaign/Configuration/{ConfigureId}/Callback

    return $http.get("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/Configuration/"+id+"/Callbacks").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };

  var deleteCallBacks = function(campId, cbId){

    ///{version}/CampaignManager/Campaign/Configuration/{ConfigureId}/Callback

    ///CampaignManager/Campaign/:CampaignId/Callback/:CallBackId

    return $http.delete("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/Configuration/Callback/"+cbId).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };

  var updateCallBack = function(id, callback){

    ///{version}/CampaignManager/Campaign/Configuration/{ConfigureId}/Callback

    return $http.post("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/Configuration/"+id+"/Callback",callback).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };

  var getCampaignConfig = function(id){

    return $http.get("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/"+id+"/Configurations").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };

  var createCampaignConfig = function(id, config){

    return $http.post("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/"+id+"/Configuration", config).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };

  var updateCampaignConfig = function(id, configId, config){

    return $http.put("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/"+id+"/Configuration/"+configId, config).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };

  var getCategories= function(){

    return $http.get("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/CampaignCategorys").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return [];
      }

    });

  }

  var createCategories= function(category){

    return $http.post("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/CampaignCategory", category).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return [];
      }

    });

  }

  var uploadNumbers= function(data){

    return $http.post("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/CampaignNumbers", data).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }

    });

  }


  return{

    CreateCampaign : createCampaign,
    UpdateCampaign : updateCampaign,
    GetCampaigns: getCampaigns,
    DeleteCampaign: deleteCampaign,
    GetCampaign: getCampaign,
    CreateCampaignConfig: createCampaignConfig,
    UpdateCampaignConfig: updateCampaignConfig,
    GetCampaignConfig: getCampaignConfig,
    GetCallBacks: getCallBacks,
    UpdateCallBack: updateCallBack,
    GetReasons:getReasons,
    DeleteCallBacks:deleteCallBacks,
    GetCategories: getCategories,
    CreateCategories: createCategories,
    UploadNumbers: uploadNumbers,
    Campaign: {}


  }


});

