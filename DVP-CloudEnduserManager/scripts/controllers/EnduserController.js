/**
 * Created by Pawan on 1/14/2016.
 */
(function () {

  var app =   angular.module("clduserapp");

  var EnduserController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia) {

    $scope.isDisabled = false;
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');


    $scope.addNewAttrib = function()
    {
      //commonservice.showAdvanced("NewController","partials/new.html",true);
      $location.path("/newattrib");
    }

    $scope.EditUser = function(usrObj)
    {
      //dbservice.Userobj=usrObj;

      //commonservice.showAdvanced('EditController','partials/edit.html',false);
      $location.path("/edituser/"+usrObj);

    }

    $scope.DeleteUser = function(DelObj)
    {
      $scope.isDisabled = true;
      var title="Delete Cloud User ";
      var content= "Do you want to delete "+ DelObj;
      console.log(content) ;
      commonservice.showConfirm(title,"Delete","Delete","Cancel",content,function(obj){

        dbservice.userDelete(DelObj).then(onUserDeleteComplete,onError);


      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },DelObj)




    }

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      commonservice.showAlert("ERROR",reason);
    }

    var onUserDeleteComplete = function (response) {


      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        commonservice.showAlert("Delete","User removed successfully!");
        var val = 0;
        for (var i = 0, len = $scope.userData.length; i < len; i++) {

          if($scope.userData[i].id == response.id) {
            val = i;

            break;

          }
        }
        $scope.isDisabled = false;
        $scope.userData.splice(val, 1);

      }
    }

    var onUserComplete = function (response) {
      console.log("GOT RESULT   "+JSON.stringify(response.data.Result));
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        console.log("Got as Attributes "+JSON.stringify(response.data.Result));
        $scope.userData=response.data.Result;
      }

    }


    $scope.loadUsers = function () {

      dbservice.getUserList().then(onUserComplete,onError);
    }

    $scope.addNewUser = function () {
      $location.path("/newuser");
    }

    $scope.loadUsers();

  }

  app.controller("EnduserController",EnduserController);
}())
