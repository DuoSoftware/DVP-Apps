/**
 * Created by Pawan on 1/20/2016.
 */

(function () {

  var app =   angular.module("ruleapp");

  var RuleController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia)
  {

    $scope.inQuery = {
      limit: 5,
      page: 1
    };
    $scope.outQuery = {
      limit: 5,
      page: 1
    };
    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      commonservice.showAlert("ERROR",reason);
    };
    var onInLoadComplete = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        $scope.inRuleData=response.data.Result;
        $scope.inTotal = response.data.Result.length;
      }

    };
    var onOutLoadComplete = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        $scope.outRuleData=response.data.Result;
        $scope.outTotal = response.data.Result.length;
      }

    };
    var onINRuleDeleteComplete = function (response) {


      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        commonservice.showAlert("Delete","Rule removed successfully!");
        var val = 0;
        for (var i = 0, len = $scope.inRuleData.length; i < len; i++) {

          if($scope.inRuleData[i].id == response.id) {
            val = i;

            break;

          }
        }
        $scope.isDisabled = false;
        $scope.inRuleData.splice(val, 1);

      }
    };
    var onOUTRuleDeleteComplete = function (response) {


      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        commonservice.showAlert("Delete","Rule removed successfully!");
        var val = 0;
        for (var i = 0, len = $scope.outRuleData.length; i < len; i++) {

          if($scope.outRuleData[i].id == response.id) {
            val = i;

            break;

          }
        }
        $scope.isDisabled = false;
        $scope.outRuleData.splice(val, 1);

      }
    };

    $scope.loadInboundRules = function()
    {
      dbservice.getInRuleList().then(onInLoadComplete,onError);
    };
    $scope.loadOutboundRules = function()
    {
      dbservice.getOutRuleList().then(onOutLoadComplete,onError);
    };

    $scope.addRule= function(direction)
    {
      $location.path("/newrule/"+direction);
    };
    $scope.editRule= function (ruleObj) {
      console.log("hit url");
      $location.path("/editrule/"+ruleObj.id);
    };

    $scope.DeleteRule= function(rule)
    {
      $scope.isDisabled = true;
      var title="Delete Context ";
      var content= "Do you want to delete "+ rule.id;
      console.log(content) ;
      commonservice.showConfirm(title,"Delete","Delete","Cancel",content,function(obj){

        if(rule.Direction=="INBOUND")
        {
          dbservice.deleteRule(rule).then(onINRuleDeleteComplete,onError);
        }
        else
        {
          dbservice.deleteRule(rule).then(onOUTRuleDeleteComplete,onError);
        }



      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },rule)

    };

    $scope.loadInboundRules();
    $scope.loadOutboundRules();

  };
  app.controller("RuleController",RuleController);
}());
