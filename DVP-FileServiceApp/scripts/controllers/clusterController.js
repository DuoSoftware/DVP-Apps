var app = angular.module("FileManageApp");

app.controller("FileListController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, clusterService) {

  $scope.showConfirm = function (tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {


    var confirm = $mdDialog.confirm()
      .title(tittle)
      .textContent(content)
      .ok(okbutton)
      .cancel(cancelbutton);
    $mdDialog.show(confirm).then(function () {
      OkCallback(okObj);
    }, function () {
      CancelCallBack();
    });
  };

  $scope.showAlert = function (tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };

  $scope.query = {
    order: "Name",
    limit: 10,
    page: 1
  };
  $scope.dataReady = false;

  $scope.loadFileService = function () {

    clusterService.GetFiles().then(function (response) {

      $log.debug("GetFiles: response" + response);
      $scope.dataReady = true;
      $scope.files = response;
      $scope.total = response.length;

    }, function (error) {
      $log.debug("GetFiles err");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });

  };

  $scope.viewFileService = function (fileId) {

    $location.path('/file/' + fileId + '/edit');

  };

  $scope.deleteFile = function (file) {

    $scope.showConfirm("Delete File", "Delete", "ok", "cancel", "Do you want to delete " + file.Filename, function (obj) {

      clusterService.DeleteFile(file).then(function (response) {
        if (response) {
          $scope.loadFileService();
          $scope.showAlert("Deleted", "Deleted", "ok", "File " + obj.Filename + " Deleted successfully");
        }
        else
          $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }, function (error) {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });

    }, function () {

    }, file)
  };

  $scope.downloadFile = function (file) {

    clusterService.DownloadFile(file.UniqueId).then(function (response) {
      if (response) {
        $scope.loadFileService();
        $scope.showAlert("File Download", "File Download", "ok", "File " + file.Filename + " Download successfully");
      }
      else
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
    }, function (error) {
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });

  };

  $scope.loadFileService();

});

app.controller("FileEditController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log, $filter, clusterService) {




  $scope.downloadFile = function(downloadPath) {

    try{
      $log.debug("GetFileServices err");
      window.open(downloadPath, '_blank', '');
    }
    catch(e){
      $log.debug("GetFileServices errsfsfdsfzdfdfz");
    }
  };

  $scope.callServer = {};
  $scope.IpAddress = {};

  $scope.codes = [
    {Code: 1, name: 'Basic'},
    {Code: 2, name: 'Intermediate'},
    {Code: 3, name: 'Advanced'},
  ];

  $scope.showAlert = function (tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };


  $scope.uploadFile = function () {

    clusterService.CreateFile($scope.myFile).then(function (response) {
      if (response) {
        $scope.showAlert("File Upload", "File Upload", "ok", "File - ["+$scope.myFile.name+"] Uploaded." );
        $location.path('/callserver/list');
      } else {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }
    }, function (error) {
      $log.debug("onGetSuccess3");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };



});


