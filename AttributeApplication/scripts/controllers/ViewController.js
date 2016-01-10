/**
 * Created by Pawan on 12/14/2015.
 */

(function () {

    var app= angular.module("attributeapp");

    var ViewController= function ($scope,dbcontroller,commoncontroller,$location,$mdDialog,$mdMedia) {

      $scope.isDisabled = false;
        console.log(dbcontroller.Attribobj);

        $scope.DataObj=dbcontroller.Attribobj;

        $scope.ShowEdit = function () {
            //$location.path("/editattrib")
          $scope.isDisabled = true;
          commoncontroller.showAdvanced('EditController','partials/edit.html',true);
          //$scope.showAdvanced();
        }
      $scope.Erase = function () {
        $mdDialog.hide();
      }


     /* $scope.showAdvanced = function() {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: "EditController",
          templateUrl: 'partials/edit.html',
          //parent: angular.element(document.body),
          clickOutsideToClose:false,
          fullscreen: useFullScreen
        })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };*/



    }

    app.controller("ViewController",ViewController);
}())
