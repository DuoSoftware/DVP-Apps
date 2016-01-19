/**
 * Created by a on 1/19/2016.
 */


var service = angular.module("campaignService", []);

service.factory("campaign", function($http){

  var createCampaign = function(campaign){

    return $http.post("http://127.0.0.1:8827/DVP/API/6.0/CampaignManager/Campaign",campaign).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };



  var updateCampaign = function(id, campaign){

    return $http.put("http://127.0.0.1:8827/DVP/API/6.0/CampaignManager/Campaign/"+id,campaign).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };


  var getCampaign = function(id){

    return $http.get("http://127.0.0.1:8827/DVP/API/6.0/CampaignManager/Campaign/"+id).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };


  var deleteCampaign = function(id){

    return $http.del("http://127.0.0.1:8827/DVP/API/6.0/CampaignManager/Campaign/"+id).then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return undefined;
      }


    });
  };





  var getCampaigns = function(){

    return $http.get("http://127.0.0.1:8827/DVP/API/6.0/CampaignManager/Campaigns/100").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return [];
      }


    });
  };





  return{

    CreateCampaign : createCampaign,
    UpdateCampaign : updateCampaign,
    GetCampaigns: getCampaigns,
    DeleteCampaign: deleteCampaign,
    GetCampaign: getCampaign,
    Campaign: {}


  }


});

