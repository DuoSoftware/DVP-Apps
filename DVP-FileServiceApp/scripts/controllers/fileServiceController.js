var app = angular.module("FileManageApp");

app.controller("FileListController", function ($scope, $routeParams, $mdDialog, $mdMedia, $location, $log,$filter, clusterService) {

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
    order: ["Category","Filename"],
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

app.controller('FileEditController', ['$scope','$filter', 'FileUploader','clusterService', function($scope,$filter, FileUploader,clusterService) {


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

  //uploader.formData.push({'DuoType' : 'fax'});

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
    item.formData.push({'fileCategory' : $scope.file.category});
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

  $scope.file = {};
  $scope.loadFileService = function () {
    clusterService.GetCatagories().then(function (response) {

      $scope.Categorys = $filter('filter')(response, {Owner: "user"});

    }, function (error) {
      $log.debug("GetCatagories err");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };

  $scope.loadFileService();
}]);


app.filter('groupBy', ['$parse', function ($parse) {
  return function (list, group_by) {

    var filtered = [];
    var prev_item = null;
    var group_changed = false;
    // this is a new field which is added to each item where we append "_CHANGED"
    // to indicate a field change in the list
    //was var new_field = group_by + '_CHANGED'; - JB 12/17/2013
    var new_field = 'group_by_CHANGED';

    // loop through each item in the list
    angular.forEach(list, function (item) {

      group_changed = false;

      // if not the first item
      if (prev_item !== null) {

        // check if any of the group by field changed

        //force group_by into Array
        group_by = angular.isArray(group_by) ? group_by : [group_by];

        //check each group by parameter
        for (var i = 0, len = group_by.length; i < len; i++) {
          if ($parse(group_by[i])(prev_item) !== $parse(group_by[i])(item)) {
            group_changed = true;
          }
        }


      }// otherwise we have the first item in the list which is new
      else {
        group_changed = true;
      }

      // if the group changed, then add a new field to the item
      // to indicate this
      if (group_changed) {
        item[new_field] = true;
      } else {
        item[new_field] = false;
      }

      filtered.push(item);
      prev_item = item;

    });

    return filtered;
  };
}]);
