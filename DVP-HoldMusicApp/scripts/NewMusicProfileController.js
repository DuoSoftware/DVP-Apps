/**
 * Created by Achintha on 1/4/2016.
 */
(function () {

  var app= angular.module("holdMusicApp");


  var NewMusicProfileController = function ($scope,backendcontroller,$location, $mdToast, $document, commoncontroller) {
    // $scope.message2=true;


    $scope.color="#ac2925";
    $scope.msg="";
    $scope.isDisabled = true;
    $scope.isState=true;
    //$scope.sucess.state = "true";
    // $scope.testStatus = true;
    // $scope.testStatusErr = true;
   // $scope.musicFileList=data.Result;
    $scope.newMusicProfile ={};

    $scope.CreateNewMusicProfile= function(){
      ////


      ////
      var newMusicProfile = $scope.newMusicProfile;
     // newMusicProfile["Availability"]=true;
      console.log("New APP");
     //console.log("Availability  "+ JSON.stringify(newMusicProfile.Availability));
      // newMusicProfile.Availability=$scope.Availability;
      console.log("NEW APP OBJ   " + JSON.stringify(newMusicProfile));
    /*  commoncontroller.showConfirm("Create New Profile", "Do You Want to create this Profile  ","YES", "NO", "Do You Want to create this Profile..  ", function (okobj) {
        backendcontroller.createNewMusicProfile(newMusicProfile).then(onNewAppResult,onNewAppError);
      }, function () {
        $location.path("/main");

      }, "okObj");*/
      backendcontroller.createNewMusicProfile(newMusicProfile).then(onNewAppResult,onNewAppError);
     // backendcontroller.createnewMusicProfile(newMusicProfile).then(onNewAppResult,onNewAppError);
    }

    /*var SaveApplication = function(newMusicProfile){
      backendcontroller.createnewMusicProfile(newMusicProfile).then(onNewAppResult,onNewAppError);
    }*/
   /* var CancelSaveApplication = function(){
      console.log("CancelSaveApplication");
      $location.path("/main");
    }*/

    var onNewAppResult=function(response){

      console.log("FFFFFFFFFFFF   "+ JSON.stringify(response));
      if(response.id)
      {
        $scope.isDisabled = false;
        $scope.newAppId = response.id;
        commoncontroller.showAlert("Sucess.....", "New Profile Created Sucessfully.....");
        console.log("Updated......................"+response.id );

       // title, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj
      //  alert(response.AppName+" Created Properly");
        $location.path("/main");
      }
      else
      {
        commoncontroller.showAlert("Error..","Can't Create New Profile.....");
        console.log("ERRRORRR");
       // alert(response.Message);

      }
    }

    var onNewAppError = function(response){

      console.log("NEW APP ERROR  "+JSON.stringify(response));
    }

  /*  $scope.testApplication=function(appId){

      console.log ("testURL  "+appId);
      backendcontroller.testApplication(appId).then(onTestResult,onError);

    }

    var onTestResult = function(response){

      console.log("sdaasda "+ JSON.stringify(response));
      if(response=="200")
      {
        console.log(response);
        commoncontroller.showAlert("Sucss","Application Url Is working properly");
        //showAlert($event)
        $location.path("/main");
      }
      else
      {
        commoncontroller.showAlert("Error","Application Url Not working ");
        $location.path("/edit/");
        console.log(response.data.Exception.Message);
      }

    }*/

    $scope.CancelEdit= function () {
      // dbcontroller.Attribobj = Attb;

      console.log("CancelEdit");
      // $scope.DataObj=backendcontroller.Attribobj;
      $location.path("/main");
    }

    $scope.onChange = function(cbState ) {
      console.log(cbState);
      $scope.message = cbState;
      // $scope.message2 = true;
      if($scope.message == true)
      {
        message2= false;
        console.log("IFIFIFIFIFIIF " +message2);
      }
      console.log($scope.message);
      console.log( $scope.message2);
    };

    var onError=function(ex){
      console.log(ex);
    }

   /* $scope.showAlert = function(msg) {
       $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('a')
          .textContent(msg)
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };*/

    var onResultComplete = function(data){
      console.log("NewMusicProfile-OnResultComplete");
      console.log(data);
      $scope.musicFileList=data.Result;
      console.log("onResultComplete   "+$scope.musicFileList);
    }

    var onError = function(reson){
      console.log(reson);
    }



    this.userState = '';
    this.states = ('HTTAPI SOCKET EXTENDED').split(' ').map(function (state) { return { abbrev: state }; });

    $scope.loadData = function(){
      // onResultComplete();
      backendcontroller.getMusicFileList().then(onResultComplete,onError);
      // backendcontroller.getDeactiveAppList().then(onDeactiveAttribComplete,onError);
    };

    $scope.loadData();

  };
  app.controller("NewMusicProfileController",NewMusicProfileController);
}())
