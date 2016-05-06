/**
 * Created by Achintha on 12/29/2015.
 */
(function () {

  var app = angular.module("holdMusicApp");
  var MainController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia,commoncontroller){
    // var MainController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia){
    var data;
    $scope.ViewObj;

    var onResultComplete = function(data){
      console.log("wwwwwww");
      console.log(data);
      $scope.musicData=data.Result;
      console.log("onResultComplete   "+$scope.musicData);
    }
    var onDeletenComplete = function(deactiveData){
      console.log("wwwwwwwCCCCC");
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

    $scope.EditHoldMusicProfile= function(application){
      backendcontroller.EditProfileObj = application;
      console.log("EditAPP");
      console.log(backendcontroller.EditProfileObj);
      $location.path("/edit");

    }

    $scope.NewApplication = function()
    {
      console.log("NewApplication");
      $location.path("/new");
    }

    $scope.DeleteMusicProfile = function(Name)
    {
      backendcontroller.DeleteProfilename = Name;
      console.log("DeleteMusicProfile__MAIN=="+backendcontroller.DeleteProfilename+"----"+Name);
      //$scope.musicData={};
      $location.path("/delete");

     /* commoncontroller.showConfirm("Delete Profile", "Do You Wnt to Delete this Profile  ","YES", "NO", "Do You Wnt to Delete this Profile.... ", function (okobj) {
        backendcontroller.deleteMusicProfile(Name).then(onDeletenComplete,onError);
        $scope.musicData={};
        // commoncontroller.showAlert("Delete..","Profile Deleted Sucessfully..");
        console.log("DeleteProfile");
        //$scope.loadData();
        console.log("loadData()");

        $location.path("/app");
      }, function () {
        $location.path("/app");

      }, "okObj");*/

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
      // onResultComplete();
      backendcontroller.getHoldMusicList().then(onResultComplete,onError);
      // backendcontroller.getDeactiveAppList().then(onDeactiveAttribComplete,onError);
    };

    $scope.loadData();
  };
  app.controller("MainController",MainController)
}())
