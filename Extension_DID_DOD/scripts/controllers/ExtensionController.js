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
    $scope.filterFn = function(item){
      if(item.Enabled == true)
      {
        return true;
      }
      return false;
    };

    $scope.showAlert = function(tittle, button, content) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(tittle)
          .textContent(content)
          .ok(button)
      );
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
          if(answer.type == "confirm"){
            $scope.showConfirmOverwrite(answer.extension);
          }else if(answer.type == "alert") {
            $scope.showAlert(answer.tittle, answer.button, answer.content);
            if (answer.isSuccess) {
              $scope.loadData();
            }
          }
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };
    $scope.showConfirmOverwrite = function(extension) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Extension already exsit')
        .textContent('Would you like to update exsiting Extension?')
        .ariaLabel('Lucky day')
        .ok('Overwite')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        extension.Enabled = true;
        extension.DodActive = true;
        $scope.showAdvanced(null,extension);
        //sipUser.updateExtension("1#1",extension).then(onUpdateExtensionComplete,function(){onError("update exsisting extenstion")});
      }, function() {
        //$scope.status = 'You decided to keep your debt.';
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
        sipUser.updateExtensionState("1#1", extension, false).then(onUpdateExtensionState,onError);
      }, function() {
        //$scope.status = 'You decided to keep your debt.';
      });
    };
    var onUpdateExtensionState = function(data){
      if(data.IsSuccess){
        $scope.loadData();
        $scope.showAlert("Deleted","OK","Extension " + data.Result.Extension+ " Deleted successfully");
      }else{
        $scope.showAlert("Error","OK","There is an error ");
        $scope.error = data.Exception;
      }
    };
    var onGetExtensionComplete = function(data){
      if(data.IsSuccess){
        $scope.extensions = data.Result;
        $scope.total = $scope.extensions.length;
      }else{
        $scope.showAlert("Error","OK","There is an error ");
        $scope.error = data.Exception;
      }
    };
    var onError = function(reason){
      $scope.error = "Could not fetch the extension data";
      $scope.showAlert("Error","OK","There is an error ");
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
  $scope.answer = function(type,isSuccess,tittle,button,content) {
    var ans = "";
    if(type == "alert") {
      ans = {type: type, isSuccess: isSuccess, tittle: tittle, button: button, content: content};
    }else{
      ans = {type:type,extension:content};
    }
    $mdDialog.hide(ans);
  };

  var onGetExtensionComplete = function(data){
    if(data.IsSuccess){
      if(data.Result == null){
        $scope.isExtensionExsist = false;
        sipUser.addExtension($scope.accessToken, $scope.extension).then(onAddExtensionComplete, function(){onError("add Extension")});
      }else{
        $scope.isExtensionExsist = true;
        if($scope.isExtensionExsist== true && data.Result.Enabled == false) {
          //$scope.showConfirm($scope.extension);
          $scope.answer("confirm","","","",$scope.extension);
        }else{
          $scope.answer("alert",false, "Add New Extension", "OK", "Extension Already Exsit");
          $scope.error = "Extension already exsit.";
          //$scope.hide();
        }
      }
    }else{
      $scope.error = data.Exception;
    }
  };
  var onUpdateExtensionWithDodComplete = function(data){
    if(data.IsSuccess){
      $scope.answer("alert",true, "Update Extension", "OK", "Update Extension Success");
    }else{
      $scope.error = data.Exception;
      $scope.answer("alert",false, "Error", "OK", "Update Extension With Dod Failed");
    }
  };
  var onUpdateExtensionComplete = function(data){
    if(data.IsSuccess){
      sipUser.updateExtensionWithDod($scope.accessToken,data.Result.id, $scope.extension.DodNumber, $scope.extension.DodActive).then(onUpdateExtensionWithDodComplete,function(){onError("update Dod")});
    }else{
      $scope.error = data.Exception;
      $scope.answer("alert",false, "Error", "OK", "Update Extension Failed");
    }
  };
  var onAddExtensionComplete = function(data){
    if(data.IsSuccess){
      if($scope.extension.DodNumber){
        sipUser.updateExtensionWithDod($scope.accessToken, data.Result.id, $scope.extension.DodNumber, $scope.extension.DodActive).then(onUpdateExtensionWithDodComplete,function(){onError("add Dod")});
      }else{
        $scope.answer("alert",true, "Add Extension", "OK", "Add Extension Success");
      }
    }else{
      $scope.error = data.Exception;
      $scope.answer("alert",false, "Error", "OK", "Update Extension Failed");
    }
  };
  var onError = function(reason){
    $scope.error = "Could not "+reason+" data";
    $scope.answer("alert",false,"Error","OK",$scope.error);
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
    sipUser.getExtension($scope.accessToken,$scope.extension.Extension).then(onGetExtensionComplete,function(){onError("validate Extension")});
  };
  $scope.editExtension = function(extensionInfo){
    $scope.extension = extensionInfo;
    $scope.extension.Enabled = true;
    $scope.extension.DodActive = true;
    sipUser.updateExtension($scope.accessToken,$scope.extension).then(onUpdateExtensionComplete,function(){onError("update Extension")});
  };
}

