/**
 * Created by Achintha on 1/5/2016.
 */
(function () {

    var app = angular.module("applicationDeveloperApp");
    var ViewDeactivatedAppDetailsController = function($scope,backendcontroller,$location) {

       // $scope.appObj = backendcontroller.viewDeactAppObj;

        $scope.showAdvanced = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '../partials/viewDeactivatedAppDetails.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
       };
    };
    app.controller("ViewDeactivatedAppDetailsController",ViewDeactivatedAppDetailsController)
}())
