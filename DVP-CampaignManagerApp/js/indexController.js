var app = angular.module('CampaignApp', ["ngMaterial"]);

app.controller('IndexController', function ($scope, $mdDialog, $mdMedia, $log, campaignService) {

    $scope.customFullscreen = $mdMedia('sm');

    $scope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };

    $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your debt?')
            .textContent('All of the banks have agreed to forgive you your debts.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('Sounds like a scam');

        $mdDialog.show(confirm).then(function () {
            $scope.status = 'You decided to get rid of your debt.';
        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };

    $scope.showAdvanced = function (ev, action) {

        var url;

        if (action == "create") {
            url = 'UI/camCreate.html';
        }
        else if (action == "editView") {
            url = 'editView.html';
        }
        else if (action == "edit") {
            url = 'camEdit.html';
        }
        else {
            url = 'camView.html';
        }
        $mdDialog.show({
            controller: IndexCallbackController,
            templateUrl: url,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm') && $scope.customFullscreen
        })
            .then(function (data) {
                $scope.status = 'Campaign "' + data.CampaignName + '[' + data.CampaignId + '] was successfully saved.';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });


        $scope.$watch(function () {
            return $mdMedia('sm');
        }, function (sm) {
            $scope.customFullscreen = (sm === true);
        });

    };

    $scope.showTabDialog = function (ev) {
        $mdDialog.show({
            controller: IndexCallbackController,
            templateUrl: 'tabDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    $scope.hide = function () {
        $mdDialog.hide();
    };

});

function IndexCallbackController($scope, $mdDialog, $log, campaignService) {

    $scope.campaignData = campaignService.campaignData;
    $scope.status = campaignService.status;
    $log.debug("IndexCallbackController" + $scope.campaignData.CampaignId);
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    var onSaveSuccess = function (data) {
        $log.debug("onSaveSuccess" + data);
        $mdDialog.hide(data.Result);
    };

    var onUpdateSuccess = function(data){
        $log.debug("onUpdateSuccess" + data);
        if(data=="1")
        {
            $scope.status="Update Successfully";
        }
        else{
            $scope.status=data;
        }
    };

    var onGetSuccess = function (data) {
        $log.debug("onGetSuccess" + data);


    };


    var onError = function (reason) {
        $log.debug("onError");
        $log.debug(reason);
        $mdDialog.hide(reason);
        $scope.status=reason;
    };

    $scope.amDone = function (data, action) {

        if (action == "create") {
            var pData = {
                CampaignName: data.CampaignName,
                CampaignMode: data.CampaignMode,
                CampaignChannel: data.CampaignChannel,
                DialoutMechanism: data.DialoutMechanism,
                Class: data.Class,
                Type: data.Type,
                Category: data.Category,
                Extension: data.Extension
            };
            $log.debug(pData);
            campaignService.saveCampaign(pData).then(onSaveSuccess, onError);
        }
        else if (action == "edit") {
            campaignService.updateCampaign(data).then(onUpdateSuccess, onError);
        }
        else if (action == "view") {

        }
        else {
            $mdDialog.cancel();
        }
    };

    $scope.getCampaign = function (campaignId) {
        campaignService.getCampaign(campaignId).then(onGetSuccess, onError);
    }
}
