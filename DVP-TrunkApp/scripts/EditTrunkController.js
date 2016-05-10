/**
 * Created by Achintha on 1/22/2016.
 */
(function(){

  var app= angular.module("trunkApp");
  var EditTrunkController = function($scope,$routeParams,backendcontroller,$location,$mdDialog,$mdMedia,commoncontroller) {
    $scope.editTrunk={};
    $scope.ExtProfDissable=true;
    $scope.updateExtTrueDissable=true;
    $scope.updateLBTrueDissable=true;
    $scope.updateLBErrorDissable=true;
    $scope.updateExtTrueDissable=true;
    $scope.updateExtErrorDissable=true;
    $scope.updateTrnsTrueDissable=true;
    $scope.updateTrnsErrorDissable=true;


    var onLoadData = function(data)
    {
      $scope.editTrunkObj = data.Result;
      console.log("++++____++++"+JSON.stringify($scope.editTrunkObj));
    }
    var onLoadError = function (data)
    {
      console.log("EditTrunkController-Error--"+ data);
    }
    $scope.UpdateTrunk= function(){

      var updateTrunk = $scope.editTrunkObj;
      console.log("Update Trunk");
      console.log("Edit Trunk OBJ   " + JSON.stringify(updateTrunk));
      /*  commoncontroller.showConfirm("Create New Profile", "Do You Want to create this Profile  ","YES", "NO", "Do You Want to create this Profile..  ", function (okobj) {
       backendcontroller.createNewMusicProfile(newMusicProfile).then(onNewAppResult,onNewAppError);
       }, function () {
       $location.path("/main");

       }, "okObj");*/
      backendcontroller.updateTrunk(updateTrunk).then(onUpdateTrunkResult,onUpdateTrunkResultError);
    }

    var onUpdateTrunkResult=function(response){

      console.log("onUpdateTrunkResult--EditTrunkController   "+ JSON.stringify(response));
      if(response)
      {
        $scope.isDisabled = false;
        commoncontroller.showAlert("Sucess.....", "Profile Updated Sucessfully.....");
        console.log("Updated......................"+response );
        $scope.newTunkId = response;
        // backendcontroller.newTunkId = $scope.newTunkId;

        $scope.trunkSaveStatus =true;
        $scope.isDisabled = false;
        // LoadProfileData();
        //LoadCloudeData();
        //LoadNumberTranslationData();
      }
      else
      {
        commoncontroller.showAlert("Error..","Can't Create New Profile.....");
        console.log("ERRRORRR");
        // alert(response.Message);
      }
    }

    var onUpdateTrunkResultError = function(response){

      console.log("UPDATE TRUNK Error  "+JSON.stringify(response));
    }


    $scope.setCloude= function () {

      var cloudeId = $scope.editTrunkObj.LoadBalancerId;

      console.log("setCloude=="+cloudeId);
      backendcontroller.setCloudeOnTrunk($scope.editTrunkObj.id,cloudeId).then(onSetCloudeOnTrunkResult,onSetCloudeOnTrunkError);
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
    var onSetCloudeOnTrunkError = function(){
      $scope.updateLBErrorDissable=false;
    }


    $scope.setExternalProfile= function () {

      var profileId = $scope.editTrunkObj.ProfileId;

      console.log("setCloude=="+profileId);
      backendcontroller.setExternalProfileOnTrunk($scope.editTrunkObj.id,profileId).then(onSetExternalProfileOnTrunkResult,onSetExternalProfileOnTrunkkError);
      // onSetLoadBalancerOnTrunkError();
      //onSetLoadBalancerOnTrunkResult();
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
    var onSetExternalProfileOnTrunkkError = function(){
      $scope.updateExtErrorDissable=false;
    }


    var LoadProfileData = function(){

      console.log("EditTrunkController -- getProfileName");

      backendcontroller.getProfileData().then(onGetProfileNameResult,onError);
    }

    var onGetProfileNameResult=function(response){
      console.log("onGetProfileNameResult"+ JSON.stringify(response));
      $scope.editProfile =response;
      $scope.editTrunk.exProfile=response.ProfileName;

    }

    var LoadCloudeData = function(){

      console.log("EditTrunkController -- LoadCloudeData");

      backendcontroller.getCloudeData().then(onGetCloudeNameResult,onError);
    }

    var onGetCloudeNameResult=function(response){
      console.log("onGetCloudeNameResult"+ JSON.stringify(response));
      console.log("onGetCloudeNameResult++++++++++++++++++++++++++++++++++++++++++");
      $scope.editCloude =response;
      $scope.editTrunk.exProfile=response.Name;

    }

    var LoadTranslationData = function(){

      console.log("EditTrunkController -- LoadTranslationData");

      backendcontroller.getNumberTranslationData().then(onGetNumberTranslationNameResult,onError);
    }

    var onGetNumberTranslationNameResult=function(response){
      console.log("onGetNumberTranslationNameResult "+ JSON.stringify(response));
      $scope.editTranslation =response;
      $scope.editTrunk.exProfile=response.Name;

    }

    $scope.setNumberTranslation= function () {

      console.log("setNumberTranslation");
      var transId = $scope.editTrunkObj.TranslationId;
      backendcontroller.setNumberTranslationOnTrunk($scope.editTrunkObj.id,transId).then(onSetNumberTranslationOnTrunkResult,onSetNumberTranslationOnTrunkError);
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

    var onError = function(response){
      console.log("Error---"+response);

    }

    var activateExtProfButton = function(ss)
    {
      var ss = ss;
    }
    $scope.ViewTrunkNumbers=function(TrunkId)
    {
      console.log("EditTrunkController--ViewTrunkNumbers");
      backendcontroller.editTrunkId = TrunkId;
      commoncontroller.showAdvanced("ViewNumbersOfTrunkController","partials/viewNumbersOfTrunk.html",true);


    }
    /*    $scope.activateExtProfButton= function () {
     if(val){

     $scope.ExtProfDissable = false;
     $scope.ExtProfStatus = false;
     // }
     }*/

    $scope.CancelEdit = function () {
      console.log("CancelEdit");
      $location.path("/trunk");
    }


    //$scope.editTrunkObj = backendcontroller.EditTrunkObj;
    //console.log("EditTrunkController--" +  $scope.editTrunkObj.data.Result);
    console.log("EditTrunkController---p----" );
    if($routeParams.id)
    {
      backendcontroller.getTrunkDataById($routeParams.id).then(onLoadData,onLoadError);
      //console.log("Ex data   "+$scope.editTrunkObj.id );
      LoadProfileData();
      LoadCloudeData();
      LoadTranslationData();

    }
  };

  app.controller("EditTrunkController",EditTrunkController)
}())
