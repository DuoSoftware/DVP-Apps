/**
 * Created by Pawan on 12/15/2015.
 */
(function () {
    var app= angular.module("attributeapp");

    var NewController = function ($scope,dbcontroller,$location,$mdDialog) {

        var onError = function(reason)
        {

        }
        var onAttribAddingCompleted = function (data) {
            $scope.AddData= data.Result;
            $location.path("/attribute");
        }

        $scope.AddNew = function (Attribute,Otherdata) {
            dbcontroller.NewAttribute(Attribute,Otherdata).then(onAttribAddingCompleted,onError);
        }


    }
    app.controller("NewController",NewController);
}());