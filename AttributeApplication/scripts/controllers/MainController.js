/**
 * Created by Pawan on 12/11/2015.
 */

(function () {

    var app= angular.module("attributeapp");

    var MainController = function ($scope, $location) {

        $scope.searchAttrib = function()
        {
            $location.path("/attribute");
        }
        $scope.addNewAttrib = function()
        {
            $location.path("/newattrib");
        }
        $scope.searchGroup = function()
        {
            $location.path("/group");
        }
        $scope.addNewGroup = function()
        {
            $location.path("/newgroup");
        }

    };

    app.controller("MainController",MainController)
}());
