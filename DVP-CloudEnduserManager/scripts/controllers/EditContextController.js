/**
 * Created by Pawan on 1/20/2016.
 */
(function () {

  var app =   angular.module("clduserapp");

  var EditContextController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia,$routeParams) {

    $scope.isDisabled = false;
    $scope.editObj={};


    var onLoadComplete = function (response) {
      console.log("Hitaaaa");

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        // console.log("ONLOAD   "+JSON.stringify(response));
        $scope.isDisabled = false;
        $scope.editObj =response.data.Result;
        // $location.path("/endusers");
        //$route.reload();
      }

    }

    var onError = function (reason)
    {
      $scope.isDisabled = false;
      $scope.error = reason;
      commonservice.showAlert("Error",reason);
      console.log(reason);
    }
    var onUpdateComplete = function(response)
    {
      console.log("HIT");
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        $scope.isDisabled = false;
        console.log("Updated......................");
        //$location.path("/attribute");
        //this.reload();
        $scope.isDisabled = true;
        $location.path("/contexts");
        //$route.reload();
      }
    }



    $scope.loadEditContext = function(context)
    {
      console.log("Hityty");
      dbservice.getContext(context).then(onLoadComplete,onError);
    };


    $scope.UpdateContext = function()
    {
      $scope.isDisabled = true;


      var title="Update Context details ";
      var content= "Do you want to Save changes ? ";
      console.log(content) ;
      commonservice.showConfirm(title,"Save","Save","Cancel",content,function(obj){

        dbservice.updateContext($scope.editObj).then(onUpdateComplete,onError);


      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },$scope.editObj);



    }


    $scope.loadEditContext($routeParams.context);

  }

  app.controller("EditContextController",EditContextController);
}());
