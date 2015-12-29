/**
 * Created by Rajinda on 12/3/2015.
 */

(function () {

    var campaignService = function ($http, $log) {

        var campaignData = {};
        var status = {};

        var saveCampaign = function (newObj) {

            return $http({
                method: 'POST',
                url: 'http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign',
                headers: {
                    'authorization': '1#1'
                },
                data: newObj

            }).then(function (response) {
                $log.debug("saveCampaign response" + response);
                return response.data;
            });

        };

        var updateCampaign = function (camp) {
            return $http({
                method: 'put',
                url: 'http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/' + camp.CampaignId,
                headers: {
                    'authorization': '1#1'
                },
                data: camp
            }).then(function (response) {
                $log.debug("updateCampaign response" + response.data + "----" + camp.CampaignId);
                campaignData = camp;
                return response.data;
            });
        };

        var getOngoingCampaigns = function () {
            return $http({
                method: 'GET',
                url: 'http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaigns/Operations/State/Ongoing',
                headers: {
                    'authorization': '1#1'
                }

            }).then(function (response) {

                $log.debug("getOngoingCampaign-response");
                $log.debug(response);
                return response.data;
            });
        };

        var getCampaign = function (campaignId) {

            return $http({
                method: 'GET',
                url: 'http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/' + campaignId,
                headers: {
                    'authorization': '1#1'
                }
            }).then(function (response) {
                $log.debug("getCampaign response" + response);
                return response.data;
            });

        };

        var StopCampaign = function (camp) {
            return $http({
                method: 'put',
                url: 'http://campaignmanager.104.131.67.21.xip.io/DVP/API/1.0.0.0/CampaignManager/Campaign/' + camp.CampaignId + '/Operations/stop',
                headers: {
                    'authorization': '1#1'
                },
                data: camp
            }).then(function (response) {
                $log.debug("StopCampaign response" + response.data + "----" + camp.CampaignId);
                if (response.data.Result == "1") {
                    return getOngoingCampaigns(50);
                } else {
                    return response.data;
                }

            });
        };

        return {
            status: status,
            campaignData: campaignData,
            saveCampaign: saveCampaign,
            getCampaign: getCampaign,
            getOngoingCampaigns: getOngoingCampaigns,
            updateCampaign: updateCampaign,
            StopCampaign: StopCampaign
        };

    };

    var module = angular.module("CampaignApp");
    module.factory("campaignService", campaignService);

}());
