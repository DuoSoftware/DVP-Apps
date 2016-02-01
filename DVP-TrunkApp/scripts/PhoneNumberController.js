/**
 * Created by Achintha on 1/19/2016.
 */

(function () {

  var app = angular.module("trunkApp");
  var PhoneNumberController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia,commoncontroller){
    // var MainController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia){
    var data;
    $scope.ViewObj;

    var onResultComplete = function(data){
      //  console.log("wwwwwww");
      // console.log(data);
      $scope.numberData=data.Result;
      console.log("onResultComplete --trunkData-- "+$scope.numberData);
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
      backendcontroller.EditTrunkObj = trunkData;
      console.log("EditTrunk");
      console.log(backendcontroller.EditTrunkObj);
      $location.path("/edit");

    }

    $scope.NewNumber = function()
    {
      console.log("NewNumber");
      $location.path("/newNumber");
    }

    $scope.EditNumber=function(NumberData)
    {
      console.log("EditNumber");
     // $location.path("/EditNumber");
      $location.path("/phoneNumber/"+NumberData.PhoneNumber+"/edit");

      //NumberListData.PhoneNumber
    }
    $scope.DeleteNumber = function(numberData)
    {
      // backendcontroller.Deletetrunk = trunkData.id;
      // console.log("DeleteMusicProfile__MAIN=="+backendcontroller.DeleteProfilename+"----"+Name);
      //$scope.musicData={};
      /*console.log("DeleteTrunk");
       $location.path("/delete");*/

      commoncontroller.showConfirm("Delete Number", "Do You Wnt to Delete this Number  ","YES", "NO", "Do You Wnt to Delete this Number.... ", function (okobj) {
        backendcontroller.deleteNumber(numberData.PhoneNumber).then(onDeleteComplete,onErrorDelete);
        //$scope.musicData={};
        // commoncontroller.showAlert("Delete..","Profile Deleted Sucessfully..");
        console.log("DeleteProfile");
        //$location.path("/app");
      }, function () {
        $location.path("/PhoneNumber");

      }, "okObj");
    }


    var onDeleteComplete = function(deactiveData){
      console.log("wwwwwwwCCCCC");
      console.log(deactiveData);
      $scope.deactiveData=deactiveData.Result;
      console.log($scope.deactiveData);
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
      console.log("PhoneNumberController");
      backendcontroller.getPhoneNumberList().then(onResultComplete,onError);
      // backendcontroller.getDeactiveAppList().then(onDeactiveAttribComplete,onError);
    };

    $scope.loadData();
  };
  app.controller("PhoneNumberController",PhoneNumberController)
}())

