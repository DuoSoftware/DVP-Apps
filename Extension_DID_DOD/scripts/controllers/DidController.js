/**
 * Created by Heshan.i on 12/30/2015.
 */
(function(){
  var app = angular.module("extension_DID_DOD");
  var DidController = function($scope,sipUser,$mdDialog,$mdMedia){
    $scope.showAdvanced = function(ev, didNumber) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      if(didNumber) {
        var extension = null;
        if(didNumber.Extension){
          extension = didNumber.Extension.Extension
        }
        sipUser.didNumber = {
          DidNumber: didNumber.DidNumber,
          DidActive: didNumber.DidActive,
          Extension: extension
        };
      }else{
        sipUser.didNumber = null;
      }
      $mdDialog.show({
        controller: DialogBoxDidController,
        templateUrl: 'partials/dialogBoxDid.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
          $scope.loadData();
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };
    $scope.showConfirm = function(ev, id) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Delete DID Number')
        .textContent('Would you like to delete DID Number?')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        sipUser.deleteDidNumber($scope.accessToken,id).then(onDidNumberDeleteComplete,onError);
      }, function() {
        //$scope.status = 'You decided to keep your debt.';
      });
    };
    var onDidNumbersComplete = function(data){
      if(data.IsSuccess){
        $scope.didNumbers = data.Result;
      }else{
        $scope.error = data.Exception;
      }
    };
    var onDidNumberDeleteComplete = function(data){
      if(data.IsSuccess){
        $scope.loadData();
      }else{
        $scope.error = data.Exception;
      }
    };
    var onError = function(reason){
      $scope.error = "Could not fetch the did_number data";
    };

    $scope.accessToken = "1#1";
    $scope.loadData = function(){
      sipUser.getDidNumbers($scope.accessToken).then(onDidNumbersComplete,onError);
    };
    $scope.loadData();
  };
  app.controller("DidController",DidController);
}());


function DialogBoxDidController($scope, sipUser, $mdDialog) {
  var onDidActiveUpdateComplete = function(data){
    if(data.IsSuccess){
    }else{
      $scope.error = data.Exception;
    }
  };
  var onGetExtensionComplete = function(data){
    if(data.IsSuccess){
      $scope.extensions = data.Result;
    }else{
      $scope.error = data.Exception;
    }
  };
  var onAssignExtComplete = function(data){
    if(data.IsSuccess){

    }else{
      $scope.error = data.Exception;
    }
    $scope.answer();
  };
  var onAddDidComplete = function(data){
    if(data.IsSuccess){
      sipUser.updateDidWithExtension("1#1",$scope.didNumber.DidNumber,$scope.didNumber.Extension).then(onAssignExtComplete,onError("edit DID"));
    }else{
      $scope.error = data.Exception;
      $scope.hide();
    }
  };
  var onError = function(reason){
    $scope.error = "Could not "+reason+" data";
  };

  $scope.didNumber = sipUser.didNumber;
  if(sipUser.didNumber){
    $scope.enableEdit = true;
  }else{
    $scope.enableEdit = false;
  }
  $scope.accessToken = 1;
  sipUser.getExtensions($scope.accessToken).then(onGetExtensionComplete,onError("fetch the extension"));
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

  $scope.addDidNumber = function(didInfo){
    $scope.didNumber = didInfo;
    if($scope.didNumber.DidActive == null){
      $scope.didNumber.DidActive = false;
    }
    sipUser.addDidNumber("1#1",$scope.didNumber).then(onAddDidComplete,onError("add the DID"));
  };
  $scope.editDidNumber = function(didInfo){
    $scope.didNumber = didInfo;
    if(isDidActiveUpdate){
      sipUser.updateDidState("1#1",$scope.didNumber.DidNumber,$scope.didNumber.DidActive).then(onDidActiveUpdateComplete,onError("Update DID"));
    }
    if(isExtensionUpdate){
      sipUser.updateDidWithExtension("1#1",$scope.didNumber.DidNumber,$scope.didNumber.Extension).then(onAssignExtComplete,onError("edit DID"));
    }
    $scope.answer();
  };
  var isExtensionUpdate = false;
  var isDidActiveUpdate = false;
  $scope.updateExtensionEnable = function(){
    isExtensionUpdate = true;
  };
  $scope.updateDidEnable = function(){
    isDidActiveUpdate = true;
  };
}
