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
        }

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
        }

      $scope.testApplication=function(appId){


        console.log ("testURL  "+appId);
        backendcontroller.testApplication(appId).then(onTestResult,onError);

      }

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

      }

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

    };
    app.controller("EditAppController",EditAppController);


}());
