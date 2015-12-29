/**
 * Created by Pawan on 12/16/2015.
 */
/**
 * Created by Pawan on 12/14/2015.
 */
(function () {
    var app= angular.module("attributeapp");

    var EditgroupController = function ($scope,dbcontroller,$location,$mdDialog) {


        $scope.GDataObj=dbcontroller.GroupObj;

        var onUpdateComplete = function(data)
        {
            console.log(data);
            $location.path("/group");
        }

        var onError = function (resaon)
        {
            $scope.error = reason;
        }

        $scope.SaveUpdated = function(GroupName,GroupName,OtherData,Percentage)
        {

            dbcontroller.updateGroup($scope.GDataObj.GroupId,GroupName,OtherData,Percentage).then(onUpdateComplete,onError);

        }




    }
    app.controller("EditgroupController",EditgroupController
    );
}())
