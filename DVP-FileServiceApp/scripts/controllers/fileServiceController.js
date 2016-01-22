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
      clusterService.DownloadFile(file.UniqueId,file.Filename);
  };

  $scope.loadFileService();

});

app.controller('FileEditController', ['$scope', 'FileUploader','clusterService', function($scope, FileUploader,clusterService) {


  var uploader = $scope.uploader = new FileUploader({
    url: clusterService.UploadUrl
  });

  // FILTERS

  uploader.filters.push({
    name: 'customFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      return this.queue.length < 10;
    }
  });

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
    console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
    console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
    console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
    console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
    console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
    console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
    console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
    console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
    console.info('onCompleteAll');
  };

  console.info('uploader', uploader);
}]);