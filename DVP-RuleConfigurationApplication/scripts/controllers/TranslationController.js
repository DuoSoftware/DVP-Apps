/**
 * Created by Pawan on 1/27/2016.
 */
(function () {

  var app =   angular.module("ruleapp");

  var TranslationController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia)
  {
    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      commonservice.showAlert("ERROR",reason);
    }
    var onTransLoadComplete = function (response) {

      console.log("on Complete "+JSON.stringify(response));

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        console.log("Got trans "+JSON.stringify(response.data.Result));
        $scope.transObj=response.data.Result;
      }

    }

    var onTranslationDelCompleted = function (response) {


      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        commonservice.showAlert("Delete","Translation removed successfully!");
        var val = 0;
        for (var i = 0, len = $scope.transObj.length; i < len; i++) {

          if($scope.transObj[i].id == response.id) {
            val = i;

            break;

          }
        }
        $scope.isDisabled = false;
        $scope.transObj.splice(val, 1);

      }
    }

    $scope.loadTranslations = function () {

      console.log("Trans hit");
      dbservice.loadTranslations().then(onTransLoadComplete,onError);
    }

    $scope.editTranslation = function (translation) {

      $location.path("/edittranslation/"+translation.id);
    }

    $scope.deleteTranslation = function (translation) {
      dbservice.deleteTranslation(translation).then(onTranslationDelCompleted,onError);
    }

    $scope.loadTranslations();

  }
  app.controller("TranslationController",TranslationController);
}());
