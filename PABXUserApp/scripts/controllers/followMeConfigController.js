/**
 * Created by user-pc on 1/3/2016.
 */
(function() {
  var app = angular.module("pabxUserApp");

  var FollowMeConfigController = function($scope, dvpHandler, sharedResPABXUser, $mdDialog, $location)
  {
    if(!sharedResPABXUser.PABXUser.UserUuid)
    {
      $location.url('/pabxUsers');
    }

    $scope.fmRingType = sharedResPABXUser.PABXUser.FollowMeMechanism;
    $scope.query = {
      limit: 5,
      page: 1
    };

    $scope.dataReady = false;

    $scope.onCancelPressed = function()
    {
      $location.url("/pabxUser/" + sharedResPABXUser.PABXUser.UserUuid);
    };

    $scope.deleteFM = function(ev, fmRecId)
    {
      var confirm = $mdDialog.confirm()
        .title('Delete Follow Me')
        .textContent('This operation will delete the selected follow me config')
        .ariaLabel('Delete Follow Me')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function()
        {
          dvpHandler.deleteFollowMe(fmRecId)
            .then(function(data)
            {
              if(data.IsSuccess)
              {
                $scope.reloadFMList();
              }

            },
            function(err)
            {

            })
        },
        function() {
        });

    };

    $scope.updateFMRingType = function()
    {
      sharedResPABXUser.PABXUser.FollowMeMechanism = $scope.fmRingType;
      dvpHandler.updatePABXUser(sharedResPABXUser.PABXUser)
        .then(function(data)
        {
          if(data.IsSuccess)
          {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Follow Me Ring Type Set Successfully')
                .textContent('')
                .ariaLabel('Follow Me Ring Type Set Successfully')
                .ok('Ok')
            );

            $scope.reloadFMList();

          }
          else
          {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Set Follow Me Ring Type Failed')
                .textContent(data.Exception.Message)
                .ariaLabel('Set Follow Me Ring Type Failed')
                .ok('Ok')
            );
          }

        },
        function(err)
        {

        })

      $scope.destinationNumber = null;
      $scope.numberType = null;
      $scope.priority = null;
      $scope.ringTimeout = null;
    };

    $scope.saveFM = function()
    {
      dvpHandler.saveFollowMeConfig(sharedResPABXUser.PABXUser.UserUuid, $scope.destinationNumber, $scope.numberType, $scope.priority, $scope.ringTimeout)
        .then(function(data)
        {
          if(data.IsSuccess)
          {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Add Follow Me Configuration Successful')
                .textContent('')
                .ariaLabel('Add ollow Me Configuration Done')
                .ok('Ok')
            );

            $scope.reloadFMList();

          }
          else
          {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Follow Me Add Failed')
                .textContent(data.Exception.Message)
                .ariaLabel('Follow Me Add Failed')
                .ok('Ok')
            );
          }

        },
        function(err)
        {

        })

      $scope.destinationNumber = null;
      $scope.numberType = null;
      $scope.priority = null;
      $scope.ringTimeout = null;
    };

    $scope.reloadFMList = function()
    {
      dvpHandler.getFollowMeConfigList(sharedResPABXUser.PABXUser.UserUuid).then(function(data)
      {
        $scope.fmList = data.Result;
        $scope.total = data.Result.length;
        $scope.dataReady = true;
      }, function(err)
      {
        $scope.dataReady = true;
      });
    };

    $scope.reloadFMList();


  };

  app.controller("FollowMeConfigController", FollowMeConfigController);
}());
