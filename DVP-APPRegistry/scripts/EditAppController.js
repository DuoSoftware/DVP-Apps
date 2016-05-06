/**
 * Created by Achintha on 12/29/2015.
 */
(function(){

    var app= angular.module("applicationDeveloperApp");

    var EditAppController = function($scope,backendcontroller,$location,$mdDialog,$mdMedia,$mdToast, commoncontroller) {
        console.log("EditAppController");
        console.log(backendcontroller.EditAppObj);
        $scope.application=backendcontroller.Attribobj;
        $scope.editAppObj= backendcontroller.EditAppObj;
        console.log("editAppObj");
        console.log($scope.editAppObj);

        $scope.CancelEdit= function () {
            // dbcontroller.Attribobj = Attb;
            console.log("CancelEdit");
           // $scope.DataObj=backendcontroller.Attribobj;
            $location.path("/app");
        };

        $scope.SaveApp= function(){

          commoncontroller.showAlert("Edit Application","Application updated..");
          console.log("SAVE APP");
          console.log("App_ID-- "+$scope.editAppObj.id);
          console.log("AppDEV_ID-- "+$scope.editAppObj.AppDeveloperId);
          var editApplicationObj = $scope.editAppObj;

           // console.log(editApplicationObj);
           result = backendcontroller.updateApp(editApplicationObj);
            if(result){
                console.log("RESULT");
                console.log(result);
               // alert("Sucessfully Saved ..");
              //$location.path("/main");


            }
            else
            {
             // alert("Error...!!!");
                console.log("Error");
            }
            // dbcontroller.updateAttribute(dbcontroller.Attribobj);
           // backendcontroller.updateApp(editApplicationObj);
           // $location.path("/apps");
        };

      $scope.testApplication=function(appId){


        console.log ("testURL  "+appId);
        backendcontroller.testApplication(appId).then(onTestResult,onError);

      };

      var onTestResult = function(response){

       // console.log("sdaasda "+ JSON.stringify(response));
        if(response=="200")
        {
          console.log(response);
         // commoncontroller.showAlert("Sucss","Application Url Is working properly");
          showSimpleToast();
          $location.path("/main");
        }
        else
        {
         commoncontroller.showAlert("Error","Application Url Not working ");
          $location.path("/edit");
          console.log("test APP --"+JSON.stringify(response) );
          //console.log(response.data.Exception.Message);
        }

      };

      /////////TOST/////
      var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
      $scope.toastPosition = angular.extend({},last);
      var getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
      };
      function sanitizePosition() {
        var current = $scope.toastPosition;
        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;
        last = angular.extend({},current);
      }

      var showCustomToast = function() {
        $mdToast.show({
          controller: 'ToastCtrl',
          templateUrl: 'toast-template.html',
          parent : $document[0].querySelector('#toastBounds'),
          hideDelay: 6000,
          position: getToastPosition()
        });
      };
      var showSimpleToast = function() {
        console.log("showSimpleToast");
        $mdToast.show(
          $mdToast.simple()
            .content('Application Url Is working properly')
            .position(getToastPosition())
            .hideDelay(2000)
        );
      };
      var showActionToast = function() {
        var toast = $mdToast.simple()
          .textContent('Action Toast!')
          .action('OK')
          .highlightAction(false)
          .position(getToastPosition());
        $mdToast.show(toast).then(function(response) {
          if ( response == 'ok' ) {
            alert('You clicked \'OK\'.');
          }
        });
      };


      ////////////



        $scope.alert = function (Url) {
            console.log("Mouse Over");
            alert(Url);
        };

        $scope.warnChangDevId = function (devID) {
           // console.log("Mouse Over");
            alert("Do You want to change Developer");
        };

       /* $scope.showConfirm = function(ev,name) {
            // Appending dialog to document.body to cover sidenav in docs app
            console.log(ev);
            var confirm = $mdDialog.confirm()
               // .title('Would you like to change '+name+'  '+ev + '   ?')
                .textContent('Would you like to change '+name+' " '+ev + ' "  ?')
                .ariaLabel('Lucky day')
               // .targetEvent(ev)
                .ok('Yes')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                $scope.status = 'You decided to get rid of your debt.';
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };
*/


      var onError=function(ex){
        console.log(ex);
      }

      $scope.showFileDialog = function(ev, appId) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: fileDialogController,
          templateUrl: 'partials/assignFiles.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: useFullScreen,
          locals: {
            appId: appId
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


    };
    app.controller("EditAppController",EditAppController);


}());

function fileDialogController($scope, backendcontroller, $mdDialog, appId){
  var onGetFilesByAppIdComplete = function(data){
    if(data.IsSuccess){
      $scope.FilesAssignedToApp = data.Result;
      $scope.FileList = [];
      if(data.Result.length>0) {
        for(var i=0; i< data.Result.length; i++) {
          var item = data.Result[i];
          if(item != null) {
            var tmpFile = {
              UniqueId: item.UniqueId,
              Filename: item.Filename,
              Version: item.Version,
              IsChecked: true
            };
            $scope.FileList.push(tmpFile);
          }
        }
      }
      if($scope.AllFiles.length>0){
        for(var i=0; i< $scope.AllFiles.length; i++) {
          var item = $scope.AllFiles[i];
          if (item.Application == null) {
            var tmpFile = {UniqueId: item.UniqueId, Filename: item.Filename, Version: item.Version, IsChecked: false};
            $scope.FileList.push(tmpFile);
          }
        }
      }
      $scope.InitialFileList = angular.copy($scope.FileList);
    }else{
      $scope.showAlert("Error", "OK", data.CustomMessage);
    }
  };
  var onGetAllFilesComplete = function(data){
    if(data.IsSuccess){
      $scope.AllFiles = data.Result;
      backendcontroller.getFilesByAppId(appId).then(onGetFilesByAppIdComplete, function(){onError("Could not fetch the file data")});
    }else{
      $scope.showAlert("Error", "OK", data.CustomMessage);
    }
  };
  var onAssignFileToAppComplete = function(data){
    if(!data.IsSuccess) {
      $scope.showAlert("Error", "OK", data.CustomMessage);
    }
  };
  var onError = function(reason){
    $scope.showAlert("Error", "OK", reason);
  };
  var onAssignFileToAppError = function () {
    $scope.showAlert("Error", "OK", "Updating files failed");
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
  $scope.loadData = function(){
    backendcontroller.getAllFiles().then(onGetAllFilesComplete, function(){onError("Could not fetch the file data")});
  };
  $scope.loadData();
  $scope.updateFiles = function(){
    var recordToInsert = [];
    var recordToDelete = [];

    for(var i=0; i<$scope.InitialFileList.length; i++){
      var iitem = $scope.InitialFileList[i];
      var item = $scope.FileList[i];

      if(iitem.IsChecked != item.IsChecked){
        if(item.IsChecked){
          recordToInsert.push(item);
        }else{
          recordToDelete.push(item);
        }
      }
    }

    for(var i=0; i<recordToInsert.length; i++) {
      var file = recordToInsert[i];
      backendcontroller.assignFileToApp(file.UniqueId,appId).then(onAssignFileToAppComplete, onAssignFileToAppError);
    }
    for(var i=0; i<recordToDelete.length; i++) {
      var file = recordToDelete[i];
      backendcontroller.deleteFiles(file.UniqueId).then(onAssignFileToAppComplete, onAssignFileToAppError);
    }
    $scope.showAlert("Succee", "OK", "Update files success");
  }
}
