/**
 * Created by dinusha on 1/14/2016.
 */
(function() {
  var app = angular.module("userManagementApp");

  var GroupConfigurationController = function ($scope, $location, $mdDialog, $mdToast, $filter, dvpHandler)
  {
    $scope.endUserList = [{id:9, Domain:"45.55.205.92"}];
    $scope.currentGroupUsers = [];
    $scope.searchText = null;
    $scope.selectedItem = null;
    $scope.IsEdit = false;
    $scope.dataLoaded = false;
    var emptyArr = [];

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

    var clearFormOnSave = function()
    {
      $scope.basicConfig = {};
      $scope.currentGroupUsers = [];
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

    $scope.querySearch = function(query)
    {
      if(query === "*" || query === "")
      {
        if($scope.sipUsrList)
        {
          return $scope.sipUsrList;
        }
        else
        {
          return emptyArr;
        }

      }
      else
      {
        if($scope.sipUsrList)
        {
          var filteredArr = $scope.sipUsrList.filter(function (item)
          {
            var regEx = "^(" + query + ")";

            if(item.SipUsername)
            {
              return item.SipUsername.match(regEx);
            }
            else
            {
              return false;
            }

          });

          return filteredArr;
        }
        else
        {
          return emptyArr;
        }
      }

    };

    $scope.reloadUserList = function()
    {
      dvpHandler.getSIPUsers().then(function(data)
      {
        if(data.IsSuccess)
        {
          $scope.sipUsrList = data.Result.map(function(item)
          {
            var tempUsr =
            {
              SipUsername: item.SipUsername,
              id: item.id
            };

            return tempUsr;
          });
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

    $scope.reloadGroupList = function()
    {
      dvpHandler.getGroups().then(function(data)
      {
        if(data.IsSuccess)
        {
          $scope.groupList = data.Result;
        }
        else
        {
          var errMsg = data.CustomMessage;

          if(data.Exception)
          {
            errMsg = data.Exception.Message;
          }

          mdAleartDialog("ERROR", errMsg, "ERROR");
        }

        $scope.dataReady = true;

      }, function(err)
      {
        var errMsg = "Error occurred while getting group list";
        if(err.statusText)
        {
          errMsg = err.statusText;
        }
        mdAleartDialog("ERROR", errMsg, "ERROR");
        $scope.dataReady = true;
      });
    };

    $scope.onChipAdd = function(chip)
    {
      $scope.dataLoaded = false;
      dvpHandler.addUserToGroup(chip.id, $scope.basicConfig.id).then(function(data)
      {
        if(data.IsSuccess)
        {
          reloadUsersInGroup($scope.basicConfig.id);
        }
        else
        {
          var errMsg = data.CustomMessage;

          if(data.Exception)
          {
            errMsg = data.Exception.Message;
          }
          mdAleartDialog("ERROR", errMsg, "ERROR");
        }

      }, function(err)
      {
        var errMsg = "Error occurred while getting users for group";
        if(err.statusText)
        {
          errMsg = err.statusText;
        }
        mdAleartDialog("ERROR", errMsg, "ERROR");
      });
      return chip;
    };

    $scope.onChipDelete = function(chip)
    {
      var ss = chip;
      return null;
    };

    $scope.onUserListPressed = function()
    {
      $location.url("/users");
    };

    $scope.onNewPressed = function()
    {
      $scope.IsEdit = false;
      $scope.dataLoaded = false;
      clearFormOnSave();
    };

    $scope.onSavePressed = function()
    {
      if($scope.IsEdit)
      {
        //update

        dvpHandler.updateGroup($scope.basicConfig).then(function(data)
        {
          if(data.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Group updated successfully", "SUCCESS");
          }
          else
          {
            var errMsg = data.CustomMessage;

            if(data.Exception)
            {
              errMsg = data.Exception.Message;
            }
            mdAleartDialog("ERROR", errMsg, "ERROR");
          }

          $scope.dataReady = true;

        }, function(err)
        {
          var errMsg = "Error occurred while updating group";
          if(err.statusText)
          {
            errMsg = err.statusText;
          }

          mdAleartDialog("ERROR", errMsg, "ERROR");
        });
      }
      else
      {
        //save
        dvpHandler.saveGroup($scope.basicConfig).then(function(data)
        {
          if(data.IsSuccess)
          {
            mdAleartDialog("SUCCESS", "Group saved successfully", "SUCCESS");
            clearFormOnSave();
            $scope.reloadGroupList();
          }
          else
          {
            var errMsg = data.CustomMessage;

            if(data.Exception)
            {
              errMsg = data.Exception.Message;
            }
            mdAleartDialog("ERROR", errMsg, "ERROR");
          }

          $scope.dataReady = true;

        }, function(err)
        {
          var errMsg = "Error occurred while saving group";
          if(err.statusText)
          {
            errMsg = err.statusText;
          }

          mdAleartDialog("ERROR", errMsg, "ERROR");
        });

      }
    }

    var reloadUsersInGroup = function(grpId)
    {
      $scope.dataLoaded = false;
      dvpHandler.getUsersForGroup(grpId).then(function(data)
      {
        $scope.dataLoaded = true;
        if(data.IsSuccess)
        {
          if(data.Result && data.Result.SipUACEndpoint)
          {
            $scope.currentGroupUsers = data.Result.SipUACEndpoint.map(function(item)
            {
              var tempUsr =
              {
                SipUsername: item.SipUsername,
                id: item.id
              };

              return tempUsr;
            });

          }

        }
        else
        {
          $scope.dataLoaded = true;
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

      }, function(err)
      {
        $scope.dataLoaded = true;
        var errMsg = "Error occurred while getting users for group";
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
      });
    }

    $scope.onGroupChange = function()
    {
      reloadUsersInGroup($scope.basicConfig.id);


      dvpHandler.getGroup($scope.basicConfig.id).then(function(data)
      {
        if(data.IsSuccess)
        {
          $scope.IsEdit = true;
          $scope.basicConfig = data.Result;
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

      }, function(err)
      {
        var errMsg = "Error occurred while getting group list";
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
      });
    };

    $scope.reloadUserList();
    $scope.reloadGroupList();

  };

  app.controller("GroupConfigurationController", GroupConfigurationController);
}());
