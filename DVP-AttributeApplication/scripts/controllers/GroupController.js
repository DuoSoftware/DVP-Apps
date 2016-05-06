/**
 * Created by Pawan on 12/15/2015.
 */
/**
 * Created by Pawan on 12/11/2015.
 */
(function () {

    var app =   angular.module("attributeapp");

    var GroupController= function ($scope,dbcontroller,$location,commoncontroller) {


      $scope.query = {
        limit: 5,
        page: 1
      };
        var onGroupComplete = function (response) {

          if(response.data.Exception)
          {
            onError(response.data.Exception.Message);
          }
          else
          {
            $scope.grps=response.data.Result;
            $scope.total = response.data.Result.length;

          }


        }
        var onError = function(reason)
        {
            $scope.error=reason;
          commoncontroller.showAlert("ERROR",reason);
        }

        var onGroupDeleteComplete = function (response) {


          if(response.data.Exception)
          {
            onError(response.data.Exception.Message);
          }
          else
          {
            commoncontroller.showAlert("SUCCESS","Group Deleted successfully!");
            var val = 0;
            for (var i = 0, len = $scope.grps.length; i < len; i++) {

              if($scope.grps[i].GroupId == response.GroupId) {
                val = i;
                break;

              }
            }

            $scope.grps.splice(val, 1);
          }



        }

        dbcontroller.getGroupList().then(onGroupComplete,onError);

        $scope.DeleteAttribute = function(GRP)
        {
          var title="Delete Group ";
          var content= "Do you want to delete "+ GRP.GroupName;
          commoncontroller.showConfirm(title,"Delete","Delete","Cancel",content,function(obj){

            dbcontroller.groupDelete(GRP).then(onGroupDeleteComplete,onError);


          }, function(){

            //$scope.showAlert("title","lable","ok","content");
            $scope.isDisabled = false;

          },GRP)


        }

      $scope.addNewGroup = function()
      {
        //commoncontroller.showAdvanced("NewgroupController","partials/newgroup.html",true);
        $location.path("/newgroup");

      }

        $scope.ViewAttribute = function(grpObj)
        {
            dbcontroller.GroupObj=grpObj;

            console.log(dbcontroller.GroupObj);
          //commoncontroller.showAdvanced("MapController","partials/assignattributestogroup.html",true);
            $location.path("/editgroup");
        }


    };

    app.controller("GroupController",GroupController);
}());
