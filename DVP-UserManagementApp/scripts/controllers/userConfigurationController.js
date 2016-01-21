/**
 * Created by dinusha on 1/14/2016.
 */
(function() {
  var app = angular.module("userManagementApp");


  var UserConfigurationController = function ($scope, dvpHandler, sharedData, $location, $mdDialog, $mdToast)
  {
    $scope.endUserList = [{id:9, Domain:"sssss"}];

    $scope.IsEdit = sharedData.User.IsEdit;

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


    $scope.onCancelPressed = function()
    {
      $location.url("/users");
    };

    $scope.onSavePressed = function()
    {
      if(sharedData.User.IsEdit)
      {
        dvpHandler.updatePABXUser($scope.basicConfig).then(function(data1)
        {
          if(data1.IsSuccess)
          {


          }

        }, function(err)
        {
          console.log('Error occurred : ' + err);
        });
      }
      else
      {
        //Save
        $scope.basicConfig.Enabled = true;
        dvpHandler.saveSIPUser($scope.basicConfig).then(function(data1)
        {
          if(data1.IsSuccess)
          {

            var extObj = {
              Extension: $scope.basicConfig.Extension,
              ExtensionName: $scope.basicConfig.SipUsername,
              ExtraData: "",
              AddUser: "",
              UpdateUser: "",
              Enabled: true,
              ExtRefId: $scope.basicConfig.SipUsername,
              ObjCategory: "USER"
            };

            dvpHandler.addNewExtension(extObj).then(function(data2)
            {
              if(data2.IsSuccess)
              {

                dvpHandler.assignExtensionToUser(extObj.Extension, data1.Result.id).then(function(data3)
                {
                  if(data3.IsSuccess)
                  {
                    clearFormOnSave();
                    mdAleartDialog("SUCCESS", "Sip User Saved Successfully", "Save Done");
                  }
                  else
                  {
                    var errMsg = data3.CustomMessage;

                    if(data3.Exception)
                    {
                      errMsg = 'Assign user to extension error : ' + data3.Exception.Message;
                    }
                    clearFormOnSave();

                    mdAleartDialog("SAVED WITH ERRORS", errMsg, "Save Done");
                  }
                }, function(err)
                {
                  clearFormOnSave();
                  mdAleartDialog("SAVED WITH ERRORS", "Communication error occurred - while assigning extension", "Save Done");
                })
              }
              else
              {
                var errMsg = data2.CustomMessage;

                if(data2.Exception)
                {
                  errMsg = 'Create extension error : ' + data2.Exception.Message;
                }

                clearFormOnSave();

                mdAleartDialog("SAVED WITH ERRORS", errMsg, "Save Done");
              }
            }, function(err)
            {
              clearFormOnSave();
              mdAleartDialog("SAVED WITH ERRORS", "Communication error occurred - while creating extension", "Save Done");
            })

          }
          else
          {
            var errMsg = data1.CustomMessage;

            if(data1.Exception)
            {
              errMsg = 'Get context Error : ' + data1.Exception.Message;
            }

            mdAleartDialog("ERROR", errMsg, "Save Error");
          }

        }, function(err)
        {
            mdAleartDialog("ERROR", "Communication error occurred - user not saved", "Save Error");
        });
      }

    };


    dvpHandler.getContexts().then(function(data)
    {
      if(data.IsSuccess)
      {
        $scope.contextList = data.Result;
      }
      else
      {
        var errMsg = data.CustomMessage;

        if(data.Exception)
        {
          errMsg = 'Get context Error : ' + data.Exception.Message;
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
      var errMsg = "Error occurred while getting context list";
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

    if(sharedData.User.IsEdit)
    {
      dvpHandler.getSIPUser(sharedData.User.SipUsername).then(function(data)
      {
        if(data.IsSuccess)
        {
          if(data.Result && data.Result.ExtensionId)
          {
            dvpHandler.getExtension(data.Result.ExtensionId).then(function(data1)
            {
              if(data1.IsSuccess)
              {
                if(data1.Result)
                {
                  $scope.basicConfig.Extension = data1.Result.Extension;
                }

              }
              else
              {
                var errMsg = data1.CustomMessage;

                if(data1.Exception)
                {
                  errMsg = 'Get sip user error : ' + data1.Exception.Message;
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
              var errMsg = "Error occurred while getting sip user";
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

          $scope.basicConfig = data.Result;

        }
        else
        {
          var errMsg = data.CustomMessage;

          if(data.Exception)
          {
            errMsg = 'Get sip user error : ' + data.Exception.Message;
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
        var errMsg = "Error occurred while getting sip user";
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

  };

  app.controller("UserConfigurationController", UserConfigurationController);


}())
