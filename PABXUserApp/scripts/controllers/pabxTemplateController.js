/**
 * Created by dinusha on 1/8/2016.
 */

(function() {
  var app = angular.module("pabxUserApp");

  function PABXTemplateController($scope, $mdDialog, dvpHandler, sharedResPABXUser, $location)
  {

    if(!sharedResPABXUser.PABXUser.UserUuid)
    {
      $location.url('/pabxUsers');
    }


    $scope.query = {
      limit: 5,
      page: 1
    };

    $scope.dataReady = false;

    $scope.onCancelPressed = function()
    {
      $location.url("/pabxUser/" + sharedResPABXUser.PABXUser.UserUuid);
    };

    $scope.deleteTemplate = function(ev, templId)
    {
      var confirm = $mdDialog.confirm()
        .title('Delete template')
        .textContent('This operation will delete the selected template')
        .ariaLabel('Delete Template')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function()
      {
        dvpHandler.deletePABXTemplate(templId)
          .then(function(data)
          {
            if(data.IsSuccess)
            {
                $scope.reloadTemplateList();
            }

          },
          function(err)
          {

          })
      },
        function() {
      });

    };

    $scope.saveTemplate = function()
    {
      dvpHandler.postPABXUserTemplate(sharedResPABXUser.PABXUser.UserUuid, $scope.destinationNumber, $scope.numberType)
        .then(function(data)
        {
          if(data.IsSuccess)
          {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Add Template Successful')
                .textContent('')
                .ariaLabel('Add Template Done')
                .ok('Ok')
            );

            $scope.reloadTemplateList();

          }
          else
          {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Template Add Failed')
                .textContent(data.Exception.Message)
                .ariaLabel('Add Template Done')
                .ok('Ok')
            );
          }

        },
        function(err)
        {

        })

      $scope.destinationNumber = null;
      $scope.numberType = null;
    };

    $scope.reloadTemplateList = function()
    {
      var onGetPABXTemplListSuccess = function(data)
      {
        $scope.pabxTemplList = data.Result;
        $scope.total = data.Result.length;
        $scope.dataReady = true;
      };

      var onGetPABXTemplListError = function(err)
      {
        console.log('Error occurred : ' + err);
        $scope.serviceErr = "Could not load pabx users";
      };

      dvpHandler.getPABXUserTemplates(sharedResPABXUser.PABXUser.UserUuid).then(onGetPABXTemplListSuccess, onGetPABXTemplListError);
    };

    $scope.reloadTemplateList();
  }



  app.controller("PABXTemplateController", PABXTemplateController);
}());


