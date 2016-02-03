/**
 * Created by Pawan on 1/14/2016.
 */
(function () {

  var Userobj;

  var dbservice = function ($http,$mdDialog,$mdMedia){



    // Rule app funcs

    var getInRuleList = function () {

      return $http.get("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRules/Direction/INBOUND")
        .then(function (response) {

          return response;
        });

    };
    var getOutRuleList = function () {

      return $http.get("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRules/Direction/OUTBOUND")
        .then(function (response) {

          return response;
        });

    };
    var getContextList = function () {

      return $http.get("http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Contexts")
        .then(function (response) {
          console.log("Contexts  "+JSON.stringify(response));
          return response;
        });

    };
    var addNewRule = function (inRuleObj,direction) {

      if(!inRuleObj.Context || inRuleObj.Context=="" )
      {
        inRuleObj.Context="ANY"
      }


      return $http.post("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule",inRuleObj)
        .then(function (response) {
          console.log("resp  "+JSON.stringify(response));
          return response;
        });


    }
    var loadTrunks = function () {

      return $http.get("http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumbers")
        .then(function (response) {
          console.log("resp  "+JSON.stringify(response));
          return response;
        });

    };
    var loadRule = function (rID) {

      return $http.get("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID)
        .then(function (response) {
          console.log("resp  "+JSON.stringify(response));
          return response;
        });


    };
var loadApps = function () {
  return $http.get("http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications")
    .then(function (response) {
      console.log("Apps  " + JSON.stringify(response));
      return response;
    });
};

    var attchAppWithRule = function (rID,aID) {
      return $http.post("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetApplication/"+aID)
        .then(function (response) {
          console.log("Apps  "+JSON.stringify(response));
          return response;
        });
    };

    var attchScheduleToRule = function (rID,sID) {
      return $http.post("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetSchedule/"+sID)
        .then(function (response) {
          console.log("Attached Schedule  "+JSON.stringify(response));
          return response;
        });
    };
    var attchDNISTransToRule = function (rID,dtID) {
      return $http.post("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetDNISTranslation/"+dtID)
        .then(function (response) {
          console.log("Attached DINS Trans  "+JSON.stringify(response));
          return response;
        });
    };
    var attchANITransToRule = function (rID,atID) {
      return $http.post("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetANITranslation/"+atID)
        .then(function (response) {
          console.log("Attached ANI Trans  "+JSON.stringify(response));
          return response;
        });
    };

    var loadTranslations = function () {
      return $http.get("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translations")
        .then(function (response) {
          console.log("Translations  " + JSON.stringify(response));
          return response;
        });
    };

    var loadSchedules = function () {
      return $http.get("http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedules")
        .then(function (response) {
          console.log("Schedules  " + JSON.stringify(response));
          return response;
        });
    };

    var deleteRule= function (rule) {

      return $http.delete("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rule.id)
        .then(function (response) {
          console.log("Del Translations  " + JSON.stringify(response));
          return response;
        });

    };

    var updateRules = function (translation) {

      return $http.put("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+translation.id,translation)
        .then(function (response) {
          console.log(" updateRules  " + JSON.stringify(response));
          return response;
        });

    };

    var deleteTranslation= function (translation) {

      return $http.delete("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translation/"+translation.id)
        .then(function (response) {
          console.log("Del Translation  " + JSON.stringify(response));
          return response;
        });

    };

    var newTranslation = function (newObj) {

      return $http.post("http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translation",newObj)
        .then(function (response) {
          console.log("new Translation  " + JSON.stringify(response));
          return response;
        });

    };



    return{

      // Rule App funcs
      getInRuleList:getInRuleList,
      getOutRuleList:getOutRuleList,
      addNewRule:addNewRule,
      loadTrunks:loadTrunks,
      loadRule:loadRule,
      loadApps:loadApps,
      loadTranslations:loadTranslations,
      loadSchedules:loadSchedules,
      attchAppWithRule:attchAppWithRule,
      attchScheduleToRule:attchScheduleToRule,
      attchDNISTransToRule:attchDNISTransToRule,
      attchANITransToRule:attchANITransToRule,
      deleteRule:deleteRule,
      loadTranslations:loadTranslations,
      deleteTranslation:deleteTranslation,
      newTranslation:newTranslation,
      getContextList:getContextList,
      updateRules:updateRules


    };

  };


  var module = angular.module("ruleapp");
  module.factory("dbservice",dbservice);
}());
