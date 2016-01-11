/**
 * Created by Pawan on 12/11/2015.
 */

(function () {

    var app= angular.module("attributeapp");

    var MainController = function ($scope, $location,commoncontroller) {

        $scope.searchAttrib = function()
        {
            $location.path("/attribute");
        }
        $scope.addNewAttrib = function()
        {
          commoncontroller.showAdvanced("NewController","partials/new.html",true);
            //$location.path("/newattrib");
        }
        $scope.searchGroup = function()
        {
            $location.path("/group");
        }
        $scope.addNewGroup = function()
        {
          commoncontroller.showAdvanced("NewgroupController","partials/newgroup.html",true);

        }

    };

    app.controller("MainController",MainController)
}());
