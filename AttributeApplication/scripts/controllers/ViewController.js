/**
 * Created by Pawan on 12/14/2015.
 */

(function () {

    var app= angular.module("attributeapp");

    var ViewController= function ($scope,dbcontroller,$location) {


        console.log(dbcontroller.Attribobj);

        $scope.DataObj=dbcontroller.Attribobj;

        $scope.ShowEdit = function () {
            $location.path("/editattrib")
        }

    }

    app.controller("ViewController",ViewController);
}())