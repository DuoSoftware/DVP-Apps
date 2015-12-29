/**
 * Created by Rajinda on 12/7/2015.
 */
var app = angular.module('CampaignApp');

app.controller('camOngoingController', function ($scope, $mdDialog, $mdMedia, $log, campaignService) {



    var onGetSuccess = function (data) {
        $log.debug("onGetSuccess" + data.Result);
        $log.debug(data.Result);
        $scope.OngoingCampaigns = data.Result;
    };

    var onStopCamSuccess = function (data) {
        $log.debug("onStopCamSuccess" + data.Result);
        $log.debug(data.Result);
        if(data.Result=="0")
        {
            $scope.status = "Operation Fail."
        }
        else{
        $scope.OngoingCampaigns = data.Result;
        }
    };

    var onError = function (data) {
        $log.debug("onError" + data);
    };

    $scope.stopCampaign = function (data) {
        campaignService.StopCampaign(data).then(onStopCamSuccess, onError);
    };

    $scope.getOngoingCampaign = function(){
        campaignService.getOngoingCampaigns().then(onGetSuccess, onError);
    };
    angular.element(document).ready(function () {
        campaignService.getOngoingCampaigns().then(onGetSuccess, onError);
    });
});


