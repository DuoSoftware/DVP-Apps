/**
 * Created by Pawan on 1/19/2016.
 */

(function () {

  var app =   angular.module("clduserapp");

  var ContextController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia) {

    $scope.query = {
      limit: 5,
      page: 1
    };


    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      commonservice.showAlert("ERROR",reason);
    };

    var onContextComplete = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        $scope.contextData=response.data.Result;
        $scope.total = response.data.Result.length;
      }

    };

    var onContextDeleteComplete = function (response) {


      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        commonservice.showAlert("Delete","Context removed successfully!");
        var val = 0;
        for (var i = 0, len = $scope.contextData.length; i < len; i++) {

          if($scope.contextData[i].Context == response.Context) {
            val = i;

            break;

          }
        }
        $scope.isDisabled = false;
        $scope.contextData.splice(val, 1);

      }
    };

    $scope.DeleteContext= function(context)
    {
      $scope.isDisabled = true;
      var title="Delete Context ";
      var content= "Do you want to delete "+ context.Context;
      console.log(content) ;
      commonservice.showConfirm(title,"Delete","Delete","Cancel",content,function(obj){


        dbservice.deleteContext(context).then(onContextDeleteComplete,onError);


      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },context)




    };




    $scope.EditContext = function (context) {
      $location.path("/editcontext/"+context);
    };


    $scope.loadContexts = function () {

      dbservice.getContextList().then(onContextComplete,onError);
    };

    $scope.loadContexts();
  };
  app.controller("ContextController",ContextController);
}());
