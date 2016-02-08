/**
 * Created by Pawan on 1/14/2016.
 */
(function () {

  var Userobj;

  var dbservice = function ($http,$mdDialog,$mdMedia){



    // Rule app funcs

    var getInRuleList = function () {

      return $http({
        method: 'GET',
        url: 'http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRules/Direction/INBOUND',
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });


    };
    var getOutRuleList = function () {

      return $http({
        method: 'GET',
        url: 'http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRules/Direction/OUTBOUND',
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });


    };
    var getContextList = function () {

      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Contexts',
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });


    };
    var addNewRule = function (inRuleObj,direction) {

      if(!inRuleObj.Context || inRuleObj.Context=="" )
      {
        inRuleObj.Context="ANY"
      }




      return $http({
        method: 'POST',
        url: 'http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule',
        headers: {
          'authorization': '1#1'
        },
        data:inRuleObj
      }).then(function(response)
      {
        return response;
      });


    };
    var loadTrunks = function () {

      return $http({
        method: 'GET',
        url: 'http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumbers',
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });


    };
    var loadRule = function (rID) {

      return $http({
        method: 'GET',
        url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });



    };
var loadApps = function () {

  return $http({
    method: 'GET',
    url: "http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications",
    headers: {
      'authorization': '1#1'
    }
  }).then(function(response)
  {
    return response;
  });

};

    var attchAppWithRule = function (rID,aID) {

      return $http({
        method: 'POST',
        url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetApplication/"+aID,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });

    };

    var attchScheduleToRule = function (rID,sID) {

      return $http({
        method: 'POST',
        url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetSchedule/"+sID,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });

    };
    var attchDNISTransToRule = function (rID,dtID) {

      return $http({
        method: 'POST',
        url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetDNISTranslation/"+dtID,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });


    };
    var attchANITransToRule = function (rID,atID) {

      return $http({
        method: 'POST',
        url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetANITranslation/"+atID,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });

    };

    var loadTranslations = function () {

      return $http({
        method: 'GET',
        url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translations",
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });

    };

    var loadSchedules = function () {

      return $http({
        method: 'GET',
        url: "http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Schedules",
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });

    };

    var deleteRule= function (rule) {

      return $http({
        method: 'DELETE',
        url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rule.id,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });
      

    };

    var updateRules = function (translation) {

      return $http({
        method: 'PUT',
        url: 'http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/'+translation.id,
        headers: {
          'authorization': '1#1'
        },
        data:translation
      }).then(function(response)
      {
        return response;
      });



    };

    var deleteTranslation= function (translation) {

      return $http({
        method: 'DELETE',
        url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translation/"+translation.id,
        headers: {
          'authorization': '1#1'
        }
      }).then(function(response)
      {
        return response;
      });


    };

    var newTranslation = function (newObj) {

      return $http({
        method: 'POST',
        url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translation",
        headers: {
          'authorization': '1#1'
        },
        data:newObj
      }).then(function(response)
      {
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
