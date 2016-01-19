/**
 * Created by Achintha on 12/29/2015.
 */
(function () {

    var app = angular.module("applicationDeveloperApp");
    var AppsController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia,commoncontroller){
var data;
$scope.ViewObj;

        var onAttribComplete = function(data){
            console.log("wwwwwww");
            console.log(data);
            $scope.appData=data.Result;
            console.log("EEEEEEEEEEEEEE   "+$scope.appData);
            //return $scope.DataObj;
        }
        var onDeactiveAttribComplete = function(deactiveData){
            console.log("wwwwwww");
            console.log(deactiveData);
            $scope.deactiveAppData=deactiveData.Result;
            console.log($scope.deactiveAppData);
            //return $scope.DataObj;
        }
        var onError = function(reson){
            console.log(reson);
        }
        var onFunctionComplete = function(data){
             console.log(data);
         }

        $scope.LoadApplications = function(Apps)
        {
            backendcontroller.Appobj=Apps;
            console.log(backendcontroller.Appobj);
            $location.path("/view");
        }

        $scope.EditApp= function(application){
            backendcontroller.EditAppObj = application;
            console.log("EditAPP");
            console.log(backendcontroller.EditAppObj);
            $location.path("/edit");

        }

        $scope.NewApplication = function()
        {
            console.log("NewApplication");
            $location.path("/new");
        }

        $scope.DeleteApplication = function(appId)
        {
          commoncontroller.showConfirm("Delete Application", "Do You Wnt to Delete this application  ","YES", "NO", "Do You Wnt to Delete this application..  ", function (okobj) {
            backendcontroller.deleteApplication(appId).then(onFunctionComplete,onError);
            commoncontroller.showAlert("Application Deleted..","Application Deleted..");
            console.log("DeleteApplication");
            $location.path("/main");
          }, function () {
            $location.path("/main");

          }, "okObj");

            //backendcontroller.deleteApplication(appId).then(onFunctionComplete,onError);

        }

        $scope.ActivateApplication = function(appId)
        {
            backendcontroller.activateApplication(appId).then(onFunctionComplete,onError);
            console.log("ActivateApplication");
            $location.path("/main");
        }


//////////////

        $scope.showAdvanced = function(deactAppObj) {
            console.log("showAdvanced");
            console.log(deactAppObj);

            backendcontroller.viewDeactAppObj = deactAppObj;

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
               // controller: DialogController,
                controller: DialogController,
                templateUrl: '../partials/viewDeactivatedAppDetails.html',
                parent: angular.element(document.body),
               // targetEvent: ev,
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

        function DialogController($scope, $mdDialog) {

            $scope.xobj=backendcontroller.viewDeactAppObj;
            console.log(backendcontroller.viewDeactAppObj);
          // alert(JSON.stringify(backendcontroller.viewDeactAppObj));
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
            $scope.onLoadPopup = function()
            {
                console.log("ppppp");

            }
        }
//////////////////////
        $scope.loadData = function(){
            backendcontroller.getAppList().then(onAttribComplete,onError);
            backendcontroller.getDeactiveAppList().then(onDeactiveAttribComplete,onError);
        };

        $scope.loadData();
    };
    app.controller("AppsController",AppsController)
}())
