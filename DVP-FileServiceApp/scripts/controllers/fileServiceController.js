var app = angular.module("FileManageApp");

app.controller('FileEditController', ['$scope', '$filter', 'FileUploader', 'clusterService', function ($scope, $filter, FileUploader, clusterService) {

  var uploader = $scope.uploader = new FileUploader({
    url: clusterService.UploadUrl,
    headers: clusterService.Headers
  });

  // FILTERS

  uploader.filters.push({
    name: 'customFilter',
    fn: function (item /*{File|FileLikeObject}*/, options) {
      return this.queue.length < 10;
    }
  });

  //uploader.formData.push({'DuoType' : 'fax'});

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
    console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function (fileItem) {
    console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function (addedFileItems) {
    console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function (item) {
    item.formData.push({'fileCategory': $scope.file.category});
    console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function (fileItem, progress) {
    console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function (progress) {
    console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function (fileItem, response, status, headers) {
    console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function (fileItem, response, status, headers) {
    console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function (fileItem, response, status, headers) {
    console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function (fileItem, response, status, headers) {
    console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function () {
    console.info('onCompleteAll');
  };

  console.info('uploader', uploader);

  $scope.file = {};
  $scope.loadFileService = function () {
    clusterService.GetCatagories().then(function (response) {

      $scope.Categorys = $filter('filter')(response, {Owner: "user"});

    }, function (error) {
      console.info("GetCatagories err" + error);

    });
  };

  $scope.loadFileService();


}]);

app.controller("FileListController", function ($scope, $route, $routeParams, $mdDialog, $mdMedia, $location, $log, $filter, $http, NgTableParams, clusterService) {


  this.tableParams = new NgTableParams({group: 'FileCategory.Category'}, {
    getData: function (params) {


      return clusterService.GetFiles().then(function (response) {

        // Filtering
        var orderedData = params.filter() ?  $filter('filter')(response, params.filter()) :  response;
        // Sorting
        orderedData = params.sorting() ?   $filter('orderBy')(orderedData, params.orderBy()) :     orderedData;
        //$defer.resolve(orderedData.slice((params.page() - 1) * params.count(),  params.page() * params.count()));


        params.total(orderedData.length);
        return orderedData;

      }, function (err) {
      });


    }
  });

  $scope.tableParams = this.tableParams;

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

  $scope.deleteFile = function (file) {

    $scope.showConfirm("Delete File", "Delete", "ok", "cancel", "Do you want to delete " + file.Filename, function (obj) {

      clusterService.DeleteFile(file, $scope.Headers).then(function (response) {
        if (response) {
          $scope.tableParams.reload();
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
    clusterService.DownloadFile(file.UniqueId, file.Filename);
  };


  $scope.GetToken = function () {
    clusterService.Headers = {'Authorization': clusterService.GetToken};
  };
  $scope.GetToken();

});

