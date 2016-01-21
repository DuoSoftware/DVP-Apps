/**
 * Created by a on 1/19/2016.
 */
var app = angular.module("CampaignApp", ["ngMaterial","ngMessages", "ngRoute","campaignService", "sipUserService"]);

app.config(function($routeProvider){

  $routeProvider.when("/campaign/list",{


    templateUrl: 'partials/campaignList.html',
    controller: 'CampaignListController'


  }).when("/campaign/create",{


    templateUrl: 'partials/campaignCreate.html',
    controller: 'CampaignCreateController'


  }).when("/campaign/:id/edit",{


    templateUrl: 'partials/campaignEdit.html',
    controller: 'CampaignEditController'



  }).when("/campaign/:id/view",{


    templateUrl: 'partials/campaignView.html',
    controller: 'CampaignViewController'



  }).otherwise({


    templateUrl: 'partials/campaignList.html',
    controller: 'CampaignListController'


  });

});


