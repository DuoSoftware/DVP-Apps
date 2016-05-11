/**
 * Created by Pawan on 1/22/2016.
 */
(function () {

  var app =   angular.module("ruleapp");


  var NewRuleController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia,$routeParams) {

    $scope.isDisabled=false;
    $scope.isInRule=true;
    $scope.ruleTopic ="Add new Rule";
    $scope.Direction=$routeParams.direction;
    $scope.newObj={};
    $scope.isANIRequired=true;
    $scope.isDNISRequired=true;

    var RuleType=$routeParams.rType;
    $scope.ruleTopic = RuleType;

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      if (reason.data.message)
      {
        commonservice.showAlert("Error",reason.data.message);
      }
      else
      {
        commonservice.showAlert("Error",reason);
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

    }

    var onSaveComplete = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        //$scope.contextData=response.data.Result;
        //console.log("Gottah "+JSON.stringify(response));
        alert("Sucessfully Created Rule");
        $location.path("/rules");
      }
    }

    var onTrunkLoad = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        //$scope.contextData=response.data.Result;
        //console.log("Gottah "+JSON.stringify(response));
        //if($scope.newObj.Direction=="OUTBOUND")

        $scope.trunkObj= response.data.Result;
        $scope.loadContexts();
        $scope.isDisabled =false;
      }

    };


    $scope.loadContexts = function () {

      dbservice.getContextList().then(onContextComplete,onError);
    };

    $scope.SaveRule = function () {

      $scope.isDisabled=true;
      alert($scope.newObj.TrunkNumber);
      dbservice.addNewRule($scope.newObj,$routeParams.rType).then(onSaveComplete,onError);

    };

    $scope.loadTrunks = function () {
      dbservice.loadTrunks().then(onTrunkLoad,onError);
    };

    $scope.hideView= function () {
      $location.path("/rules");

    };


    $scope.loadNewRule= function () {
      if($scope.Direction =="INBOUND")
      {
        $scope.newObj.Direction="INBOUND";
        $scope.isInRule=true;
        $scope.frmTopic="New Inbound Rule";
        $scope.loadContexts();

      }
      else
      {
        $scope.newObj.Direction="OUTBOUND";
        $scope.isInRule=false;
        $scope.frmTopic="New Outbound Rule";
        $scope.loadTrunks();
      }

    }

    $scope.onANISChange = function () {

      if($scope.newObj.ANIRegExPattern =="ANY")
      {
        $scope.isANIRequired=false;

      }
      else
      {
        $scope.isANIRequired=true;

      }
    };

    $scope.onDINISChange = function () {

      if($scope.newObj.RegExPattern =="ANY")
      {

        $scope.isDNISRequired=false;

      }
      else
      {
        $scope.isDNISRequired=true;

      }
    };


    $scope.loadNewRule();

  }
  app.controller("NewRuleController",NewRuleController);
}());
