/**
 * Created by Pawan on 12/18/2015.
 */
/**
 * Created by Pawan on 12/15/2015.
 */
(function () {
    var app= angular.module("attributeapp");

    var NewgroupController = function ($scope,dbcontroller,$location,$mdDialog) {

        var onError = function(reason)
        {

        }
        var onGroupAddingCompleted = function (data) {
            $scope.AddData= data.Result;
            $location.path("/group");
        }

        $scope.AddNewGroup = function (GroupName,OtherData,Percentage) {
            dbcontroller.NewGroup(GroupName,OtherData,Percentage).then(onGroupAddingCompleted,onError);
        }


    }
    app.controller("NewgroupController",NewgroupController);
}());
