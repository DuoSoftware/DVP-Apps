/**
 * Created by Pawan on 12/11/2015.
 */
(function () {

    var app =   angular.module("attributeapp");

    var AttributeController= function ($scope,dbcontroller,$location) {

        var onAttribComplete = function (data) {
            dbcontroller.GIDst=false;
            console.log("Got as Attributes "+JSON.stringify(data.Result));
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


        if(dbcontroller.GIDst )
        {
            console.log("GID is in");
            console.log("GID "+dbcontroller.GID);
            console.log("GID status "+dbcontroller.GIDst);
            dbcontroller.GIDst=false;
            dbcontroller.GetAttributesOfGroup(dbcontroller.GID).then(onAttribComplete,onError);
        }
        else
        {
            console.log("NO GID");
            console.log("GID "+dbcontroller.GID);
            console.log("GID status "+dbcontroller.GIDst);
            dbcontroller.getAttributeList().then(onAttribComplete,onError);
        }




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
