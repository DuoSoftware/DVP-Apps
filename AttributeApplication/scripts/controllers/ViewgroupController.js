/**
 * Created by Pawan on 12/15/2015.
 */
/**
 * Created by Pawan on 12/14/2015.
 */

(function () {

    var app= angular.module("attributeapp");

    var ViewgroupController= function ($scope,dbcontroller,$location) {


        console.log(dbcontroller.GroupObj);

        $scope.DataObj=dbcontroller.GroupObj;

        $scope.ShowEdit = function () {
            $location.path("/editgroup")
        }
        $scope.AssignAttributes = function () {
            $location.path("/map")
        }

    }

    app.controller("ViewgroupController",ViewgroupController);
}())