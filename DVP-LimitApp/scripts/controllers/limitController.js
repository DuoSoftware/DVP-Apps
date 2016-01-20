/**
 * Created by Heshan.i on 1/18/2016.
 */
(function(){
  var app = angular.module("dvp-limitApp");
  var limitController = function($scope, limitHandler, $mdDialog, $mdMedia){
    $scope.query = {
      limit: 5,
      page: 1
    };

    var onChangeLimitStatusComplete = function(data){
      if(data.IsSuccess){
        $scope.showAlert("Disable Limit", "OK", "Disable Limit data success");
        $scope.loadData();
      }else{
        $scope.showAlert("Error", "OK", data.CustomMessage);
      }
    };
    var onGetAllLimitsComplete = function(data){
      if(data.IsSuccess){
        $scope.limitDetails = data.Result;
        $scope.total = $scope.limitDetails.length;
      }else{
        $scope.error = data.Exception;
      }
    };
    var onError = function(reason){
      $scope.showAlert("Error", "OK", "There is an error");
    };

    $scope.copyToClipboard = function(limitId){

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
    $scope.showLimitDialog = function(ev, limitDetail) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: limitDialogController,
        templateUrl: 'partials/updateLimit.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: useFullScreen,
        locals: {
          limitDetail: limitDetail
        }
      })
        .then(function(answer) {
          if(answer && answer != "") {
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
    $scope.showConfirm = function(ev, limitId) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Disable Limit')
        .textContent('Would you like to disable limit?')
        .ariaLabel('')
        .targetEvent(ev)
        .ok('Disable')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        limitHandler.ChangeLimitStatus(limitId, false).then(onChangeLimitStatusComplete, onError);
      }, function() {
      });
    };
    $scope.loadData = function(){
      limitHandler.GetAllLimits().then(onGetAllLimitsComplete, function(){onError("Could not fetch the Limit data")});
    };
    $scope.loadData();
  };
  app.controller("limitController", limitController);
}());


function limitDialogController($scope, limitHandler, $mdDialog, limitDetail){
  var onChangeLimitStatusComplete = function(data){
    if(data.IsSuccess){
      $scope.answer(true, $scope.hLable+" Limit", "OK", "Save Limit data success");
    }else{
      $scope.answer(true, "Error", "OK", data.CustomMessage);
    }
  };
  var onUpdateMaxLimitComplete = function(data){
    if(data.IsSuccess){
      if($scope.isStatusChanged){
        limitHandler.ChangeLimitStatus($scope.limitInfo.LimitId, $scope.limitInfo.Enable).then(onChangeLimitStatusComplete, onError);
      }else{
        $scope.answer(true, $scope.hLable+" Limit", "OK", "Save Limit data success");
      }
    }else{
      $scope.answer(true, "Error", "OK", data.CustomMessage);
    }
  };
  var onAddNewLimitComplete = function(data){
    if(data.IsSuccess){
      $scope.answer(true, $scope.hLable+" Limit", "OK", "Save Limit data success");
    }else{
      $scope.answer(true, "Error", "OK", data.CustomMessage);
    }
  };
  var onError = function(){
    $scope.answer(false,"Error","OK", "Error occurred on Save Limit");
  };
  var addLimit = function(){
    limitHandler.AddNewLimit($scope.limitInfo).then(onAddNewLimitComplete, onError);
  };
  var editLimit = function(){
    limitHandler.UpdateMaxLimit($scope.limitInfo.LimitId, $scope.limitInfo.MaxCount).then(onUpdateMaxLimitComplete, onError);
  };
  $scope.limitInfo = {};
  angular.copy(limitDetail, $scope.limitInfo);
  if(limitDetail){
    $scope.edit = true;
    $scope.hLable = "EDIT";
  }else{
    $scope.edit = false;
    $scope.hLable = "ADD NEW";
    $scope.limitInfo = {Enable: true};
  }
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(isSuccess,tittle,button,content) {
    var ans = {isSuccess: isSuccess, tittle: tittle, button: button, content: content};
    $mdDialog.hide(ans);
  };
  $scope.checkStatusChanged = function(){
    $scope.isStatusChanged = true;
  };
  $scope.saveLimit = function(){
    if($scope.edit){
      editLimit();
    }else{
      addLimit();
    }
  };
};
