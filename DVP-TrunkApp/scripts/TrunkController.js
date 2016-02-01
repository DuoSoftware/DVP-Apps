/**
 * Created by Achintha on 1/19/2016.
 */
(function () {

  var app = angular.module("trunkApp");
  var TrunkController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia,commoncontroller){
    // var MainController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia){
    var data;
    $scope.ViewObj;

    var onResultComplete = function(data){
    //  console.log("wwwwwww");
     // console.log(data);
      $scope.trunkData=data.Result;
      console.log("onResultComplete --trunkData-- "+$scope.trunkData);
    }
    var onDeleteComplete = function(deactiveData){
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

    $scope.EditTrunkData= function(trunkData){
     // backendcontroller.EditTrunkObj = trunkData;
      console.log("EditTrunk");
      //console.log(backendcontroller.EditTrunkObj);
      $location.path("/trunk/"+trunkData.id+"/edit");

    }

    $scope.NewTrunk = function()
    {
      console.log("NewTrunk");
      $location.path("/new");
    }

    $scope.DeleteTrunk = function(trunkData)
    {
     // backendcontroller.Deletetrunk = trunkData.id;
     // console.log("DeleteMusicProfile__MAIN=="+backendcontroller.DeleteProfilename+"----"+Name);
      //$scope.musicData={};
      /*console.log("DeleteTrunk");
      $location.path("/delete");*/

      commoncontroller.showConfirm("Delete Trunk", "Do You Wnt to Delete this Trunk  ","YES", "NO", "Do You Wnt to Delete this Trunk.... ", function (okobj) {
        backendcontroller.deleteTrunk(trunkData.id).then(onDeleteComplete,onErrorDelete);
        //$scope.musicData={};
        // commoncontroller.showAlert("Delete..","Profile Deleted Sucessfully..");
        console.log("DeleteProfile");
        //$location.path("/app");
      }, function () {
        $location.path("/trunk");

      }, "okObj");
    }

    var onDeleteComplete = function(deactiveData){
      console.log("wwwwwwwCCCCC");
      console.log(deactiveData);
      $scope.deactiveAppData=deactiveData.Result;
      console.log($scope.deactiveAppData);
      $scope.loadData();
     // $location.path("/trunk");
      //return $scope.DataObj;
    }
    var onErrorDelete = function(reson){
      console.log(reson);
      $scope.loadData();
      //$location.path("/trunk");
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
      console.log("trunkController");
      backendcontroller.getTrunkList().then(onResultComplete,onError);
      // backendcontroller.getDeactiveAppList().then(onDeactiveAttribComplete,onError);
    };

    $scope.loadData();
  };
  app.controller("TrunkController",TrunkController)
}())
