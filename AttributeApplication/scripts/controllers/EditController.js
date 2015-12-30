/**
 * Created by Pawan on 12/14/2015.
 */
(function () {
    var app= angular.module("attributeapp");

    var EditController = function ($scope,dbcontroller,$location,$mdDialog) {

        console.log("now "+dbcontroller.Attribobj.AttributeId);

        var onUpdateComplete = function(data)
        {
            $location.path("/attribute");
        }

        var onError = function (resaon)
        {
            $scope.error = reason;
        }

        $scope.SaveUpdated = function(AttributeId,Attribute,OtherData)
        {
            dbcontroller.updateAttribute(AttributeId,Attribute,OtherData).then(onUpdateComplete,onError);

        }

        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Would you like to save these changes ?')
                .textContent('All the changes will be added to Database')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Done')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                $scope.SaveUpdated(DataObj.AttributeId,$scope.Attribute,$scope.OtherData);

            }, function() {
                alert("Error in updating");
            });
        };

        $scope.DataObj=dbcontroller.Attribobj;
    }
    app.controller("EditController",EditController);
}())
