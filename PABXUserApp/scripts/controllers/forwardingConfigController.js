/**
 * Created by user-pc on 1/3/2016.
 */
(function() {
  var app = angular.module("pabxUserApp");

  var ForwardingConfigController = function($scope, dvpHandler, sharedResPABXUser, $mdDialog, $location)
  {
    $scope.dataReady = false;

    $scope.deleteFWD = function(ev, fwdRecId)
    {
      var confirm = $mdDialog.confirm()
        .title('Delete Forwarding')
        .textContent('This operation will delete the selected forwarding config')
        .ariaLabel('Delete Forwarding')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function()
        {
          dvpHandler.deleteForwarding(fwdRecId)
            .then(function(data)
            {
              if(data.IsSuccess)
              {
                $scope.reloadFWDList();
              }

            },
            function(err)
            {

            })
        },
        function() {
        });

    };

    $scope.saveFWD = function()
    {
      dvpHandler.saveForwardingConfig(sharedResPABXUser.PABXUser.UserUuid, $scope.destinationNumber, $scope.numberType, $scope.disconReason, $scope.ringTimeout)
        .then(function(data)
        {
          if(data.IsSuccess)
          {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Add Forwarding Configuration Successful')
                .textContent('')
                .ariaLabel('Add Forwarding Configuration Done')
                .ok('Ok')
            );

            $scope.reloadFWDList();

          }
          else
          {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Forwarding Add Failed')
                .textContent(data.Exception.Message)
                .ariaLabel('Forwarding Add Failed')
                .ok('Ok')
            );
          }

        },
        function(err)
        {

        })

      $scope.destinationNumber = null;
      $scope.numberType = null;
      $scope.disconReason = null;
      $scope.ringTimeout = null;
    };

    $scope.reloadFWDList = function()
    {
      dvpHandler.getForwardingConfigList(sharedResPABXUser.PABXUser.UserUuid).then(function(data)
      {
        $scope.fwdList = data.Result;
        $scope.dataReady = true;
      }, function(err)
      {
        $scope.dataReady = true;
      });
    };

    $scope.reloadFWDList();


  };

  app.controller("ForwardingConfigController", ForwardingConfigController);
}());
