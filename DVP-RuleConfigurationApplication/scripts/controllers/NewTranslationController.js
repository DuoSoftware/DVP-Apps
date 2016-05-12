/**
 * Created by Pawan on 1/27/2016.
 */
(function () {

  var app =   angular.module("ruleapp");

  var NewTranslationController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia,$routeParams)
  {

    $scope.isDisabled=false;
    $scope.newObj={};
    $scope.newObj.RRemove=0;
    $scope.newObj.LRemove=0;


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
        commonservice.showAlert("Error : ","Connection failed");
      }
    };

    var onSaveComplete = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        $location.path("/translations");
      }
    };


    $scope.saveTranslation = function () {
      dbservice.newTranslation($scope.newObj).then(onSaveComplete,onError);
    }

  }
  app.controller("NewTranslationController",NewTranslationController);

}());
