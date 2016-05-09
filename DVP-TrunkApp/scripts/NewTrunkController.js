/**
 * Created by Achintha on 1/19/2016.
 */
(function () {

  var app= angular.module("trunkApp");


  var NewTrunkController = function ($scope,backendcontroller,$location, $mdToast, $document, commoncontroller) {
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
    $scope.updateLBTrueDissable=true;
    $scope.updateLBErrorDissable=true;
    $scope.updateExtTrueDissable=true;
    $scope.updateExtErrorDissable=true;
    $scope.updateTrnsTrueDissable=true;
    $scope.updateTrnsErrorDissable=true;
    $scope.trunkSaveStatus=false;


    $scope.CreateNewTrunk= function(){
      $scope.newTrunk.Enable='TRUE';
      var newTrunk = $scope.newTrunk;
      console.log("New Trunk");
      console.log("NEW Trunk OBJ   " + JSON.stringify(newTrunk));
      /*  commoncontroller.showConfirm("Create New Profile", "Do You Want to create this Profile  ","YES", "NO", "Do You Want to create this Profile..  ", function (okobj) {
       backendcontroller.createNewMusicProfile(newMusicProfile).then(onNewAppResult,onNewAppError);
       }, function () {
       $location.path("/main");

       }, "okObj");*/
      backendcontroller.createNewTrunk(newTrunk).then(onNewTrunkResult,onNewTrunkError);
    }

    var onNewTrunkResult=function(response){

      console.log("onNewTrunkResult--NewTrunkController   "+ JSON.stringify(response));
      if(response)
      {
        $scope.isDisabled = false;
        commoncontroller.showAlert("Sucess.....", "New Trunk Created Sucessfully.....");
        console.log("Updated......................"+response );
        $scope.newTunkId = response;
       // backendcontroller.newTunkId = $scope.newTunkId;

        $scope.trunkSaveStatus =true;
        $scope.isDisabled = false;
        LoadProfileData();
        LoadCloudeData();
        LoadNumberTranslationData();
      }
      else
      {
        commoncontroller.showAlert("Error..","Can't Create New Trunk.....");
        console.log("ERRRORRR");
        // alert(response.Message);
      }
    }

    $scope.testLoadData=function(){
      $scope.newTunkId = '12';
      $scope.isDisabled = false;

      $scope.trunkSaveStatus =true;
      LoadProfileData();
      LoadCloudeData();
      LoadNumberTranslationData();
    }

    var onNewTrunkError = function(response){

      console.log("NEW APP ERROR  "+JSON.stringify(response));
    }

    $scope.activateTranslationButton= function (val) {
      if(val){
        $scope.TranslationDissable = false;
        $scope.TranslationStatus = false;
      }
    }

    $scope.activatLBButton= function (val) {
      if(val){

        console.log("dadadada----"+JSON.stringify(val));
        console.log("ID-----  "+ val.id);
        console.log("ID-----  "+ val.ProfileName);
        console.log("IDSSS  "+$scope.newTunkId);
        $scope.LBDissable = false;
        $scope.LBStatus = false;
      }
    }

    $scope.activateExtProfButton= function (val) {
      if(val){
        $scope.ExtProfDissable = false;
        $scope.ExtProfStatus = false;
      }
    }



    var LoadProfileData = function(){
      console.log("LoadProfileData");
      backendcontroller.getProfileData().then(ongetProfileResult,onNewTrunkError);
    }
    var ongetProfileResult = function(response){
      console.log("ongetProfileResult--"+response);
      $scope.profObj =response;
      // $scope.profObj = $filter('filter')(response, {ObjType : 'EXTERNAL'});
      //backendcontroller.getProfileData().then(ongetProfileResult,onNewTrunkError);
    }

    $scope.setExternalProfile= function () {

      console.log("setExternalProfile");
      var extProfId = $scope.newTrunk.exProfile;
      backendcontroller.setExternalProfileOnTrunk($scope.newTunkId,extProfId).then(onSetExternalProfileOnTrunkResult,onSetExternalProfileOnTrunkError);
      //onSetExternalProfileOnTrunkError();
      //onSetExternalProfileOnTrunkResult();
    }

    var onSetExternalProfileOnTrunkResult = function(response){
      if(response==true)
      {
        $scope.updateExtTrueDissable=false;
      }
      else
      {
        $scope.updateExtErrorDissable=false;
      }

    }
    var onSetExternalProfileOnTrunkError = function(response){
      $scope.updateExtErrorDissable=false;
    }


    var LoadCloudeData = function(){
      console.log("LoadCloudeData");
      backendcontroller.getCloudeData().then(onCloudeResult,onNewTrunkError);
    }

    var onCloudeResult = function(response){
      console.log("onLoadCloudeResult");
      $scope.CloudeObj = response;

      console.log("Prof Obj   "+JSON.stringify($scope.profObj));

    }

    $scope.setCloude= function () {

      var cloudeId = $scope.newTrunk.cloude;

      console.log("setCloude=="+cloudeId);
      backendcontroller.setCloudeOnTrunk($scope.newTunkId,cloudeId).then(onSetCloudeOnTrunkResult,onSetCloudeOnTrunkError);
     // onSetLoadBalancerOnTrunkError();
      //onSetLoadBalancerOnTrunkResult();
    }

    var onSetCloudeOnTrunkResult = function(response){
      if(response==true)
      {
        $scope.updateLBTrueDissable=false;
      }
      else
      {
        $scope.updateLBErrorDissable=false;
      }
    }
    var onSetCloudeOnTrunkError = function(response){
      $scope.updateLBErrorDissable=false;
    }

    var LoadNumberTranslationData = function(){
      console.log("LoadNumberTranslationData");
      backendcontroller.getNumberTranslationData().then(onNumberTranslationResult,onNewTrunkError);
    }

    var onNumberTranslationResult = function(response){
      console.log("onNumberTranslationResult");
      $scope.numTransObj = response;
      //backendcontroller.getProfileData().then(ongetProfileResult,onNewTrunkError);
    }

    $scope.setNumberTranslation= function () {

      console.log("setNumberTranslation");
      var transId = $scope.newTrunk.translation;
      backendcontroller.setNumberTranslationOnTrunk($scope.newTunkId,transId).then(onSetNumberTranslationOnTrunkResult,onSetNumberTranslationOnTrunkError);
      //onSetNumberTranslationrOnTrunkError();
      //onSetNumberTranslationOnTrunkResult();
    }

    var onSetNumberTranslationOnTrunkResult = function(response){
      if(response==true)
      {
        $scope.updateTrnsTrueDissable=false;
      }
      else
      {
        $scope.updateTrnsErrorDissable=false;
      }


    }
    var onSetNumberTranslationOnTrunkError = function(response){
      $scope.updateTrnsErrorDissable=false;
    }

    $scope.CancelEdit= function () {
      // dbcontroller.Attribobj = Attb;

      console.log("CancelEdit");
      // $scope.DataObj=backendcontroller.Attribobj;
      $location.path("/trunk");
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





   // $scope.onLoadBalancerResultStrData = $scope.onLoadBalancerResultStr;
   //console.log("AAAA----"+$scope.onLoadBalancerResultStrData);
   // this.userState = '';
   // this.exProf = ($scope.onLoadBalancerResultStrData).split(' ').map(function (exProf) { return { abbrev: exProf }; });
    //this.numTrans = ('HTTAPI SOCKET EXTENDED').split(' ').map(function (numTrans) { return { abbrev: numTrans }; });
    // this.loadBalancer = ($scope.onLoadBalancerResultStrData).split(' ').map(function (loadBalancer) { return { abbrev: loadBalancer }; });


  };
  app.controller("NewTrunkController",NewTrunkController);
}())
