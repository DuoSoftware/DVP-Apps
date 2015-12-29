/**
 * Created by Pawan on 12/11/2015.
 */
(function () {

    var app =   angular.module("attributeapp");

    var AttributeController= function ($scope,dbcontroller,$location) {

        var onAttribComplete = function (data) {

            $scope.attribData=data.Result;

        }
        var onError = function(data)
        {
            $scope.error=data.Exception;
        }

        var onAttributeDeleteComplete = function (response) {

            var val = 0;
            for (var i = 0, len = $scope.attribData.length; i < len; i++) {

                if($scope.attribData[i].AttributeId == response) {
                    val = i;
                    break;

                }
            }

            $scope.attribData.splice(val, 1);
        }

        dbcontroller.getAttributeList().then(onAttribComplete,onError);

        $scope.DeleteAttribute = function(Attb)
        {
            dbcontroller.attribDelete(Attb).then(onAttributeDeleteComplete,onError);
        }
        $scope.ViewAttribute = function(Attb)
        {
            dbcontroller.Attribobj=Attb;
            console.log(dbcontroller.Attribobj);
            $location.path("/viewattrib");
        }


    };

    app.controller("AttributeController",AttributeController);
}());
