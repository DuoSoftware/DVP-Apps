/**
 * Created by Achintha on 1/27/2016.
 */

(function () {

  var app= angular.module("trunkApp");


  var NewPhoneNumberController = function ($scope,$routeParams,backendcontroller,$location, $mdToast, $document, commoncontroller) {
    // $scope.message2=true;


    $scope.color="#ac2925";
    $scope.msg="";
    $scope.isDisabled = true;
    $scope.isState=true;
    $scope.TranslationDissable = true;
    $scope.ExtProfDissable = true;
    $scope.LBDissable = true;
    $scope.LBStatus = true;
    $scope.ExtProfStatus = true;
    $scope.TranslationStatus = true;
    $scope.onCloudeResultStr="";
    $scope.profObj;
    $scope.newTunkId;
    $scope.updateinLmtTrueDissable=true;
    $scope.updateinLmtErrorDissable=true;
    $scope.updateOutLmtTrueDissable=true;
    $scope.updateOutLmtErrorDissable=true;
    $scope.updateBothLmtTrueDissable=true;
    $scope.updateBothLmtErrorDissable=true;
    $scope.trunkSaveStatus=false;


    $scope.LoadData = function(){
      console.log("LoadData -- ");
      backendcontroller.getTrunkList().then(onTrunkListResult,onTrunkListError);
      backendcontroller.getLimits().then(onLimitResult,onLimitError);
    };
    var onTrunkListResult=function(response){
      $scope.TrunkObj = response.Result;
    };

    var onTrunkListError=function(response){
      console.log("Error on load Trunk--"+ response);
    };

    var onLimitResult=function(response){
      $scope.limitObj = response.Result;
    };

    var onLimitError=function(response){
      console.log("Error on load Limits--"+ response);
    };

    $scope.createNewNumber= function(){
      //$scope.newNumber.Enable='TRUE';
      var newNumber = $scope.newNumber;
      console.log("New Trunk");
      console.log("NEW Trunk OBJ   " + JSON.stringify(newNumber));
      /*  commoncontroller.showConfirm("Create New Profile", "Do You Want to create this Profile  ","YES", "NO", "Do You Want to create this Profile..  ", function (okobj) {
       backendcontroller.createNewMusicProfile(newMusicProfile).then(onNewAppResult,onNewAppError);
       }, function () {
       $location.path("/main");

       }, "okObj");*/
      backendcontroller.createNewNumber(newNumber).then(onNewNumberResult,onNewNumberError);
    }

    var onNewNumberResult=function(response){

      console.log("onNewNumberResult--NewNumberController   "+ JSON.stringify(response));
      if(JSON.stringify(response) != '{}' )
      {

        //updateNumTrueDissable
        $scope.isDisabled = false;
        commoncontroller.showAlert("Sucess.....", "New Number Created Sucessfully.....");
        console.log("Updated......................"+response );
        $scope.newTunkId = response;
        // backendcontroller.newTunkId = $scope.newTunkId;

        $scope.trunkSaveStatus =true;
        $scope.isDisabled = false;

      }
      else
      {
        commoncontroller.showAlert("Error..","Can't Create New Number.....");
        console.log("ERRRORRR");
        // alert(response.Message);
      }
    }

    /* $scope.testLoadData=function(){
     $scope.newTunkId = '12';
     $scope.isDisabled = false;

     $scope.trunkSaveStatus =true;
     LoadProfileData();
     LoadCloudeData();
     LoadNumberTranslationData();
     }*/

    var onNewNumberError = function(response){

      console.log("NEW Number ERROR  "+JSON.stringify(response));
    }

    $scope.activateBothLmtButton= function (val) {
      if(val){
        $scope.TranslationDissable = false;
        $scope.TranslationStatus = false;
      }
    }

    $scope.activatInLmtButton= function (val) {
      if(val){

        console.log("dadadada----"+JSON.stringify(val));
        console.log("ID-----  "+ val.id);
        console.log("ID-----  "+ val.ProfileName);
        console.log("IDSSS  "+$scope.newTunkId);
        $scope.LBDissable = false;
        $scope.LBStatus = false;
      }
    }

    $scope.activateOutLmtButton= function (val) {
      if(val){
        $scope.ExtProfDissable = false;
        $scope.ExtProfStatus = false;
      }
    }

    $scope.setInboundLimit= function () {

      console.log("setInboundLimit");
      var limitId = $scope.newNumber.InboundLimitId;
      var number = $scope.newNumber.PhoneNumber;
      backendcontroller.setInboundLimitOnNumber(number,limitId).then(onSetInboundLimitOnNumberResult,onSetInboundLimitOnNumberError);
      //onSetNumberTranslationrOnTrunkError();
      //onSetNumberTranslationOnTrunkResult();
    }

    var onSetInboundLimitOnNumberResult = function(response){
      if(response==true)
      {
        $scope.updateinLmtTrueDissable=false;
      }
      else
      {
        $scope.updateinLmtErrorDissable=false;
      }


    }
    var onSetInboundLimitOnNumberError = function(){
      $scope.updateinLmtErrorDissable=false;
    }


    $scope.setOutboundLimit= function () {

      console.log("setOutboundLimit");
      var limitId = $scope.newNumber.OutboundLimitId;
      var number = $scope.newNumber.PhoneNumber;
      backendcontroller.setOutboundLimitOnNumber(number,limitId).then(onSetOutboundLimitOnNumberResult,onSetOutboundLimitOnNumberError);
      //onSetNumberTranslationrOnTrunkError();
      //onSetNumberTranslationOnTrunkResult();
    }

    var onSetOutboundLimitOnNumberResult = function(response){
      if(response==true)
      {
        $scope.updateOutLmtTrueDissable=false;
      }
      else
      {
        $scope.updateOutLmtErrorDissable=false;
      }


    }
    var onSetOutboundLimitOnNumberError = function(){
      $scope.updateOutLmtErrorDissable=false;
    }

    $scope.setBothLimit= function () {

      console.log("setBothLimit");
      var limitId = $scope.newNumber.BothLimitId;
      var number = $scope.newNumber.PhoneNumber;
      backendcontroller.setBothLimitOnNumber(number,limitId).then(onSetBothLimitOnNumberResult,onSetBothLimitOnNumberError);
      //onSetNumberTranslationrOnTrunkError();
      //onSetNumberTranslationOnTrunkResult();
    }

    var onSetBothLimitOnNumberResult = function(response){
      if(response==true)
      {
        $scope.updateBothLmtTrueDissable=false;
      }
      else
      {
        $scope.updateBothLmtErrorDissable=false;
      }


    }
    var onSetBothLimitOnNumberError = function(){
      $scope.updateBothLmtErrorDissable=false;
    }

    $scope.CancelEdit= function () {
      // dbcontroller.Attribobj = Attb;

      console.log("CancelEdit");
      // $scope.DataObj=backendcontroller.Attribobj;
      $location.path("/phoneNumber");
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





    // $scope.onLoadBalancerResultStrData = $scope.onLoadBalancerResultStr;
    //console.log("AAAA----"+$scope.onLoadBalancerResultStrData);
    // this.userState = '';
    // this.exProf = ($scope.onLoadBalancerResultStrData).split(' ').map(function (exProf) { return { abbrev: exProf }; });
    //this.numTrans = ('HTTAPI SOCKET EXTENDED').split(' ').map(function (numTrans) { return { abbrev: numTrans }; });
    $scope.numberType = ('CALL FAX').split(' ').map(function (numberType) { return { abbrev: numberType }; });
    $scope.direction = ('BOTH INBOUND OUTBOUND').split(' ').map(function (direction) { return { abbrev: direction }; });

    $scope.LoadData();

  };
  app.controller("NewPhoneNumberController",NewPhoneNumberController);
}())
