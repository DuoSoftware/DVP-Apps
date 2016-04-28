var app = angular.module("EngagementApp");

app.controller('AddEngagementController', ['$scope', '$filter', 'FileUploader', 'clusterService', function ($scope, $filter, FileUploader, clusterService) {


}]);

app.controller("FileListController", function ($scope, $route, $routeParams, $mdDialog, $mdMedia, $location, $log, $filter, $http, NgTableParams, clusterService) {


  this.tableParams = new NgTableParams({group: 'Category'}, {
    getData: function (params) {


      return clusterService.GetFiles().then(function (response) {

        // Filtering
        var orderedData = params.filter() ?
          $filter('filter')(response, params.filter()) :
          response;
        // Sorting
        orderedData = params.sorting() ?
          $filter('orderBy')(orderedData, params.orderBy()) :
          orderedData;
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
