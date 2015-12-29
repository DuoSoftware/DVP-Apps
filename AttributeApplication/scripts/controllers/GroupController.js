/**
 * Created by Pawan on 12/15/2015.
 */
/**
 * Created by Pawan on 12/11/2015.
 */
(function () {

    var app =   angular.module("attributeapp");

    var GroupController= function ($scope,dbcontroller,$location) {

        var onGroupComplete = function (data) {

            $scope.grps=data.Result;

        }
        var onError = function(data)
        {
            $scope.error=data.Exception;
        }

        var onGroupDeleteComplete = function (response) {

            var val = 0;
            for (var i = 0, len = $scope.grps.length; i < len; i++) {

                if($scope.grps[i].GroupId == response) {
                    val = i;
                    break;

                }
            }

            $scope.grps.splice(val, 1);
        }

        dbcontroller.getGroupList().then(onGroupComplete,onError);

        $scope.DeleteAttribute = function(GRP)
        {
            dbcontroller.groupDelete(GRP).then(onGroupDeleteComplete,onError);
        }
        $scope.ViewAttribute = function(grpObj)
        {
            dbcontroller.GroupObj=grpObj;
            console.log(dbcontroller.GroupObj);
            $location.path("/viewgroup");
        }


    };

    app.controller("GroupController",GroupController);
}());
