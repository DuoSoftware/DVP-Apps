/**
 * Created by a on 1/19/2016.
 */


var service = angular.module("campaignService", []);

service.factory("campaign", function($http){

  var createCampaign = function(campaign){

    return $http.post("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign",campaign).then(function(response){


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

    return $http.get("http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaigns/0").then(function(response){


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

