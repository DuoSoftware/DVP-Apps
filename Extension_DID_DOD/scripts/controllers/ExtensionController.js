/**
 * Created by Heshan.i on 12/30/2015.
 */
(function(){
  var app = angular.module("extension_DID_DOD");
  var ExtensionController = function($scope,sipUser,$mdDialog,$mdMedia){
    $scope.query = {
      limit: 5,
      page: 1
    };
    $scope.filterFn = function(item)
    {
      if(item.Enabled == true)
      {
        return true;
      }
      return false;
    };
    $scope.showAdvanced = function(ev, extension) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      if(extension) {
        sipUser.extension = extension;
      }else{
        sipUser.extension = null;
      }
      $mdDialog.show({
        controller: DialogBoxExtensionController,
        templateUrl: 'partials/dialogBoxExtension.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
        .then(function(answer) {
          //$scope.status = 'You said the information was "' + answer + '".';
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
    $scope.showConfirm = function(ev, extension) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Delete Extension')
        .textContent('Would you like to delete Extension?')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        sipUser.updateExtensionState("1#1", extension, false).then(onUpdateExtensionState,onError());
      }, function() {
        //$scope.status = 'You decided to keep your debt.';
      });
    };
    $scope.showAlert = function(ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(false)
          .title('This is an alert title')
          .textContent('You can specify some description text in here.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };
    var onUpdateExtensionState = function(data){
      if(data.IsSuccess){
        $scope.loadData();
      }else{
        $scope.error = data.Exception;
      }
    };
    var onGetExtensionComplete = function(data){
      if(data.IsSuccess){
        $scope.extensions = data.Result;
        $scope.total = $scope.extensions.length;
      }else{
        $scope.error = data.Exception;
      }
    };
    var onError = function(reason){
      $scope.error = "Could not fetch the extension data";
    };
    $scope.accessToken = 1;
    $scope.loadData = function(){
      sipUser.getExtensions($scope.accessToken).then(onGetExtensionComplete,onError);
    };
    $scope.loadData();
  };
  app.controller("ExtensionController",ExtensionController);
}());

function DialogBoxExtensionController($scope, sipUser, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  $scope.showConfirm = function(extension) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('Extension already exsit')
      .textContent('Would you like to update exsiting Extension?')
      .ariaLabel('Lucky day')
      .ok('Overwite')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      sipUser.updateExtension("1#1",extension).then(onUpdateExtensionComplete,onError("update exsisting extenstion"));
    }, function() {
      //$scope.status = 'You decided to keep your debt.';
    });
  };


  var onGetExtensionComplete = function(data){
    if(data.IsSuccess){
      if(data.Result == null){
        $scope.isExtensionExsist = false;
        sipUser.addExtension($scope.accessToken, $scope.extension).then(onAddExtensionComplete, onError("add Extension"));
      }else{
        $scope.isExtensionExsist = true;
        if($scope.isExtensionExsist== true && data.Result.Enabled == false) {
          $scope.showConfirm($scope.extension);
        }else{
          $scope.error = "Extension already exsit.";
          $scope.hide();
        }
      }
    }else{
      $scope.error = data.Exception;
    }
  };
  var onUpdateExtensionWithDodComplete = function(data){
    if(data.IsSuccess){
      $scope.answer();
    }else{
      $scope.error = data.Exception;
      $scope.hide();
    }
  };
  var onUpdateExtensionComplete = function(data){
    if(data.IsSuccess){
      sipUser.updateExtensionWithDod($scope.accessToken,$scope.extension.id, $scope.extension.DodNumber, $scope.extension.DodActive).then(onUpdateExtensionWithDodComplete,onError("update Dod"));
      $scope.answer();
    }else{
      $scope.error = data.Exception;
      $scope.hide();
    }
  };
  var onAddExtensionComplete = function(data){
    if(data.IsSuccess){
      if($scope.extension.DodNumber){
        sipUser.updateExtensionWithDod($scope.accessToken, data.Result.id, $scope.extension.DodNumber, $scope.extension.DodActive).then(onUpdateExtensionWithDodComplete,onError("add Dod"));
      }
    }else{
      $scope.error = data.Exception;
      $scope.hide();
    }
  };
  var onError = function(reason){
    $scope.error = "Could not "+reason+" data";
  };


  $scope.accessToken = "1#1";
  $scope.extension = sipUser.extension;
  if(sipUser.extension){
    $scope.enableEdit = true;
  }else{
    $scope.enableEdit = false;
  }

  $scope.addExtension = function(extensionInfo){
    $scope.extension = extensionInfo;
    $scope.extension.Enabled = true;
    $scope.extension.DodActive = true;
    sipUser.getExtension($scope.accessToken,$scope.extension.Extension).then(onGetExtensionComplete,onError("validate Extension"));
  };
  $scope.editExtension = function(extensionInfo){
    $scope.extension = extensionInfo;
    $scope.extension.Enabled = true;
    $scope.extension.DodActive = true;
    sipUser.updateExtension($scope.accessToken,$scope.extension).then(onUpdateExtensionComplete,onError("update Extension"));
  };
}

