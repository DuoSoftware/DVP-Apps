/**
 * Created by Pawan on 12/11/2015.
 */
(function () {

  var app =   angular.module("attributeapp");

  var AttributeController= function ($scope,dbcontroller,commoncontroller,$location,$mdDialog,$mdMedia) {

    $scope.isDisabled = false;

    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    var onAttribComplete = function (response) {
      console.log(JSON.stringify(response.data.Result));
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        dbcontroller.GIDst=false;
        console.log("Got as Attributes "+JSON.stringify(response.data.Result));
        $scope.attribData=response.data.Result;
      }

    }

    var onGrpAttribComplete = function (response) {
      console.log(JSON.stringify(response.data.Result));
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        dbcontroller.GIDst=false;
        console.log("Got as Attributes "+JSON.stringify(response.data.Result));
        $scope.attribData=response.data.Result;
        var tempArr=[];
        for( var i= 0,len=response.data.Result.ResAttributeGroups.length;i<len;i++)
        {
          tempArr.push(response.data.Result.ResAttributeGroups[i].ResAttribute);

          if(i==len-1 )
          {
            $scope.attribData=tempArr;
          }
        }

      }

    }

    var onError = function(reason)
    {
      $scope.isDisabled = false;
      $scope.error=reason;
      commoncontroller.showAlert("ERROR",reason);
    }

    var onAttributeDeleteComplete = function (response) {

      console.log(JSON.stringify(response));
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        commoncontroller.showAlert("Delete","Attribute removed successfully!");
        var val = 0;
        for (var i = 0, len = $scope.attribData.length; i < len; i++) {

          if($scope.attribData[i].AttributeId == response.AttributeId) {
            val = i;

            break;

          }
        }
        $scope.isDisabled = false;
        $scope.attribData.splice(val, 1);

      }
    }

    $scope.loadAttc=function(){
   if(dbcontroller.GIDst )
   {
     console.log("GID is in");
     console.log("GID "+dbcontroller.GID);
     console.log("GID status "+dbcontroller.GIDst);
     dbcontroller.GIDst=false;
     dbcontroller.GetAttributesOfGroup(dbcontroller.GID).then(onGrpAttribComplete,onError);
     $scope.gTopic="Attributes assigned to Group "+dbcontroller.GID;
   }
   else
   {
     $scope.gTopic="Attribute Viewer";
     console.log("NO GID");
     console.log("GID "+dbcontroller.GID);
     console.log("GID status "+dbcontroller.GIDst);
     dbcontroller.getAttributeList().then(onAttribComplete,onError);
   }
 };





    $scope.DeleteAttribute = function(Attb)
    {
      $scope.isDisabled = true;
      var title="Delete attribute ";
      var content= "Do you want to delete "+ Attb.Attribute;
      console.log(content) ;
      commoncontroller.showConfirm(title,"Delete","Delete","Cancel",content,function(obj){

        dbcontroller.attribDelete(Attb).then(onAttributeDeleteComplete,onError);


      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },Attb)




    }
    $scope.addNewAttrib = function()
    {
      //commoncontroller.showAdvanced("NewController","partials/new.html",true);
      $location.path("/newattrib");
    }
    $scope.ViewAttribute = function(Attb)
    {
      dbcontroller.Attribobj=Attb;
      console.log(dbcontroller.Attribobj);

      //commoncontroller.showAdvanced('EditController','partials/edit.html',false);
      $location.path("/editattrib");
      //$location.path("/viewattrib");
    }




    $scope.loadAttc();
  };

  app.controller("AttributeController",AttributeController);
}());
