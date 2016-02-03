/**
 * Created by Pawan on 1/4/2016.
 */
/**
 * Created by Pawan on 12/11/2015.
 */
(function () {

  var commoncontroller = function ($http,$mdDialog,$mdMedia) {



    var showConfirm = function(title, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

      var confirm = $mdDialog.confirm()
        .title(title)
        .content(content)
        .ok(okbutton)
        .cancel(cancelbutton);
      $mdDialog.show(confirm).then(function() {
        OkCallback();
      }, function() {
        CancelCallBack();
      });
    };

    var showAdvanced = function(controller,template,clickOutSt) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: controller,
        templateUrl: template,
        //parent: angular.element(document.body),
        clickOutsideToClose:clickOutSt,
        fullscreen: useFullScreen
      })
        .then(function(answer) {
          //$scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          //$scope.status = 'You cancelled the dialog.';
        });
      /*$scope.$watch(function() {
       return $mdMedia('xs') || $mdMedia('sm');
       }, function(wantsFullScreen) {
       $scope.customFullscreen = (wantsFullScreen === true);
       });*/
    };

    var showAlert = function(title,content)
    {
      $mdDialog.show(
        $mdDialog.alert()
          //.parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(false)
          .title(title)
          .content(content)
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
         // .targetEvent(ev)
      );
    }


    return{

      showConfirm:showConfirm,
      showAdvanced:showAdvanced,
      showAlert:showAlert

    };
  };

  var module = angular.module("trunkApp");
  module.factory("commoncontroller",commoncontroller);
}());


