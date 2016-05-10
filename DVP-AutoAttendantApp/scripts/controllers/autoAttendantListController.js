/**
 * Created by dinusha on 1/22/2016.
 */
(function() {
  var app = angular.module("autoAttendantApp");

  var AutoAttendantListController = function ($scope, dvpHandler, sharedData, $location, $mdDialog, $mdToast)
  {
    $scope.query = {
      limit: 5,
      page: 1
    };


    $scope.dataReady = false;

    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    var mdAleartDialog = function(title, content, ariaLabel)
    {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(title)
          .textContent(content)
          .ariaLabel(ariaLabel)
          .ok('Ok')
      );
    };

    $scope.onNewPressed = function()
    {
      sharedData.IsEdit = false;
      sharedData.AutoAttendant = {};
      $location.url("/autoAttendant/New");
    };

    $scope.onDeletePressed = function(ev, name)
    {
      var confirm = $mdDialog.confirm()
        .title('Delete auto attendant')
        .textContent('Warning - Are you sure you want to delete auto attendant record')
        .ariaLabel('Delete Auto Attendant')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function()
        {
          dvpHandler.deleteAutoAttendant(name)
            .then(function(data)
            {
              if(data.IsSuccess)
              {
                $scope.reloadAutoAttList();
              }
              else
              {
                var errMsg = data.CustomMessage;

                if(data.Exception)
                {
                  errMsg = 'Delete auto attendant error : ' + data.Exception.Message;
                }
                mdAleartDialog("ERROR", errMsg, "ERROR");
              }

            },
            function(err)
            {
              mdAleartDialog("ERROR", 'Delete auto attendant error', "ERROR");

            })
        },
        function() {
        });

    };

    $scope.onEditPressed = function(aaObj)
    {
      sharedData.IsEdit = true;
      sharedData.AutoAttendant = aaObj;
      $location.url("/autoAttendant/" + aaObj.Name);
    };

    $scope.reloadAutoAttList = function()
    {
      dvpHandler.getAutoAttendants().then(function(data)
      {
        if(data.IsSuccess)
        {
          $scope.autoAttList = data.Result;
          $scope.total = data.Result.length;
        }
        else
        {
          var errMsg = data.CustomMessage;

          if(data.Exception)
          {
            errMsg = data.Exception.Message;
          }
          $mdToast.show(
            $mdToast.simple()
              .textContent(errMsg)
              .position($scope.getToastPosition())
              .hideDelay(5000)
          );
        }

        $scope.dataReady = true;

      }, function(err)
      {
        var errMsg = "Error occurred while getting pabx user list";
        if(err.statusText)
        {
          errMsg = err.statusText;
        }
        $mdToast.show(
          $mdToast.simple()
            .textContent(errMsg)
            .position($scope.getToastPosition())
            .hideDelay(5000)
        );
        $scope.dataReady = true;
      });
    };

    $scope.reloadAutoAttList();

  };

  app.controller("AutoAttendantListController", AutoAttendantListController);
}());
