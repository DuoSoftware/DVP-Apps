/**
 * Created by Achintha on 12/29/2015.
 */
(function(){

    var app= angular.module("applicationDeveloperApp");

    var MainController = function ($scope, $location) {

      /*  $scope.search = function()
        {
            $location.path("/apps");
        }
*/
     /*   $scope.NewApplication = function()
        {
            $location.path("/new");
        }*/
        $location.path("/apps");

    };
    app.controller("MainController",MainController)
}());
