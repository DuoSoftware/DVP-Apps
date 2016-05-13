/**
 * Created by Pawan on 1/25/2016.
 */
(function () {

  var app =   angular.module("ruleapp");
  var EditRuleController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia,$routeParams) {

    $scope.isInRule=true;
    $scope.Dtrans=true;
    $scope.Atrans=true;
    $scope.isScheduleDisabled=true;
    $scope.isAppDisabled=true;
    $scope.isTransDisabled=true;

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      if (reason.data)
      {
        commonservice.showAlert("Error",reason.data.message);
      }
      else
      {
        commonservice.showAlert("Error : ","Connection Failed");
      }
    };


    var onRuleLoadCompleted = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {


        $scope.editObj= response.data.Result;
        console.log("Edit Object "+JSON.stringify($scope.editObj));

        if(response.data.Result.Direction=="INBOUND")
        {
          $scope.isInRule=true;
        }
        else
        {
          $scope.isInRule=false;
        }
        $scope.isDisabled =false;
      }

    };

    var onContextComplete = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        $scope.isDisabled=false;
        $scope.contextData=response.data.Result;

      }

    };

    var onAppLoadCompleted = function (response) {

      if(response.data.Exception)
      {
        //onError(response.data.Exception.Message);

        $scope.isAppDisabled=true;
      }
      else {


        $scope.Apps = response.data.Result;
        $scope.isAppDisabled=false;

      }

    };

    var onAttachCompleted = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else {

        //commonservice.showAlert("Rule "+$scope.editObj.id +" assigned to Application "+$scope.editObj.AppId,[])

      }

    };

    var onTransLoadCompleted = function (response) {

      if(response.data.Exception)
      {
        $scope.isTransDisabled=true;
        onError(response.data.Exception.Message);
      }
      else {
        $scope.isTransDisabled=false;

        $scope.TransObj = response.data.Result;

      }

    };

    var onScheduleLoadCompleted = function (response) {

      if(response.data.Exception)
      {
        $scope.isScheduleDisabled=true;
        // onError(response.data.Exception.Message);
      }
      else {


        $scope.scheduleObj = response.data.Result;
        $scope.isScheduleDisabled=false;

      }

    };

    var onRuleUpdateCompleted = function (response) {

      if(response.data.Exception)
      {

        onError(response.data.Exception.Message);
      }
      else {


        commonservice.showAlert("Rule update successfully",[]);

      }

    };

    var onTrunkComplete = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        $scope.isDisabled=false;
        $scope.trunkObj=response.data.Result;

      }

    };


    $scope.loadRule = function () {

      dbservice.loadRule($routeParams.id).then(onRuleLoadCompleted,onError);
    };
    $scope.loadContexts = function () {

      dbservice.getContextList().then(onContextComplete,onError);
    };
    $scope.loadApplications = function () {
      dbservice.loadApps().then(onAppLoadCompleted,onError);
    };
    $scope.loadTranslations = function () {
      dbservice.loadTranslations().then(onTransLoadCompleted,onError);
    };
    $scope.loadSchedules = function () {
      dbservice.loadSchedules().then(onScheduleLoadCompleted,onError);
    };

    $scope.AttachApplication= function () {
      console.log("HITTT");

      console.log("Rule ID "+$scope.editObj.id);
      console.log("APP ID "+$scope.editObj.AppId);
      if($scope.editObj.id && $scope.editObj.AppId && !$scope.editObj.id==""&& !$scope.editObj.AppId=="")
      {
        dbservice.attchAppWithRule($scope.editObj.id,$scope.editObj.AppId).then(onAttachCompleted,onError);
      }
      else
      {
        onError("Invalid Rule or Application ID");
      }

    };

    $scope.AttachSchedule = function () {

      console.log("HITTT");

      console.log("Rule ID "+$scope.editObj.id);
      console.log("Schedule ID "+$scope.editObj.ScheduleId);
      if($scope.editObj.id && $scope.editObj.ScheduleId && !$scope.editObj.id==""&& !$scope.editObj.ScheduleId=="")
      {
        dbservice.attchScheduleToRule($scope.editObj.id,$scope.editObj.ScheduleId).then(onAttachCompleted,onError);
      }
      else
      {
        onError("Invalid Rule or Schedule ID");
      }

    };

    $scope.AttachDNISTrans = function () {

      console.log("HITTT");

      console.log("Rule ID "+$scope.editObj.id);
      console.log("Translation ID "+$scope.editObj.TranslationId);
      if($scope.editObj.id && $scope.editObj.TranslationId && !$scope.editObj.id==""&& !$scope.editObj.TranslationId=="")
      {
        dbservice.attchDNISTransToRule($scope.editObj.id,$scope.editObj.TranslationId).then(onAttachCompleted,onError);
      }
      else
      {
        onError("Invalid Rule or DINIS Translation ID");
      }


    }
    $scope.AttachANITrans = function () {

      console.log("HITTT");

      console.log("Rule ID "+$scope.editObj.id);
      console.log("Translation ID "+$scope.editObj.ANITranslationId);
      if($scope.editObj.id && $scope.editObj.ANITranslationId && !$scope.editObj.id==""&& !$scope.editObj.ANITranslationId=="")
      {
        dbservice.attchANITransToRule($scope.editObj.id,$scope.editObj.ANITranslationId).then(onAttachCompleted,onError);
      }
      else
      {
        onError("Invalid Rule or ANI Translation ID");
      }


    };
    $scope.updateRule = function (editObj) {
      dbservice.updateRules(editObj).then(onRuleUpdateCompleted,onError);
    };

    $scope.HideView = function () {

      $location.path("/rules");
    };

    $scope.loadTrunkNumbers = function () {

      dbservice.loadTrunks().then(onTrunkComplete,onError);
    };

    $scope.AttachTrunk= function () {
      console.log("HITTT");

      console.log("Rule ID "+$scope.editObj.id);
      console.log("APP ID "+$scope.editObj.TrunkNumber);
      if($scope.editObj.id && $scope.editObj.TrunkNumber && !$scope.editObj.id==""&& !$scope.editObj.TrunkNumber=="")
      {
        dbservice.attchTrunkWithRule($scope.editObj.id,$scope.editObj.TrunkNumber).then(onAttachCompleted,onError);
      }
      else
      {
        onError("Invalid Rule or Application ID");
      }

    };



    $scope.loadRule();
    $scope.loadContexts();
    $scope.loadApplications();
    $scope.loadTranslations();
    $scope.loadSchedules();
    $scope.loadTrunkNumbers();

  };

  app.controller("EditRuleController",EditRuleController);
}());
