/**
 * Created by Pawan on 1/19/2016.
 */

(function () {

  var app =   angular.module("clduserapp");

  var ContextController = function ($scope,dbservice,commoncontroller,$location,$mdDialog,$mdMedia) {

    console.log("hitaa");
    var onContextComplete = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        $scope.contextData=response.data.Result;
      }

    }

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      commoncontroller.showAlert("ERROR",reason);
    }




    $scope.loadContexts = function () {

      dbservice.getContextList().then(onContextComplete,onError);
    }

    $scope.loadContexts();
  }
  app.controller("ContextController",ContextController);
}());
