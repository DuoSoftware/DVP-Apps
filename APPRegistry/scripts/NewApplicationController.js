/**
 * Created by Achintha on 1/4/2016.
 */
(function () {

  var app= angular.module("applicationDeveloperApp");


  var NewApplicationController = function ($scope,backendcontroller,$location, $mdToast, $document, commoncontroller) {
    // $scope.message2=true;


    $scope.color="#ac2925";
    $scope.msg="";
    $scope.isDisabled = true;
    $scope.isState=true;
    //$scope.sucess.state = "true";
    // $scope.testStatus = true;
    // $scope.testStatusErr = true;

    $scope.newApplication ={};

    $scope.CreateNewApp= function(){
      ////


      ////
      var newApplication = $scope.newApplication;
      newApplication["Availability"]=true;
      console.log("New APP");
      console.log("Availability  "+ JSON.stringify(newApplication.Availability));
      // newApplication.Availability=$scope.Availability;
      console.log("NEW APP OBJ   " + JSON.stringify(newApplication));
      commoncontroller.showConfirm("Create Application", "Do You Wnt to create this application  ","YES", "NO", "Do You Wnt to create this application..  ", function (okobj) {
        backendcontroller.createNewApplication(newApplication).then(onNewAppResult,onNewAppError);
      }, function () {
        $location.path("/main");

      }, "okObj");
     // backendcontroller.createNewApplication(newApplication).then(onNewAppResult,onNewAppError);
    }

    /*var SaveApplication = function(newApplication){
      backendcontroller.createNewApplication(newApplication).then(onNewAppResult,onNewAppError);
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
        console.log("Updated......................"+response.id );

       // title, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj
      //  alert(response.AppName+" Created Properly");
        $location.path("/main");
      }
      else
      {
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
      $location.path("/app");
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






    this.userState = '';
    this.states = ('HTTAPI SOCKET EXTENDED').split(' ').map(function (state) { return { abbrev: state }; });

  };
  app.controller("NewApplicationController",NewApplicationController);
}())
