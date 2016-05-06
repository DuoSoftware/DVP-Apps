var app = angular.module("EngagementApp");

app.run(function (socketAuth) {
  socketAuth.getAuthenticatedAsPromise();
});

app.controller('FileEditController', function ($scope, $filter, $mdDialog, $location, Notification, engagementService, socket) {

  $scope.$on('profile-updated', function(event, profileObj) {
    // profileObj contains; name, country and email from emitted event
    $scope.showAlert("Save Engagement", "Successfully Saved");
  });

  console.info("FileEditController" + socket.message);
  $scope.engagement = {};
  $scope.engagement.engagementType = "Engagement";
  if (socket.message) {
    $scope.engagement.engagementId = socket.message[1];
    $scope.engagement.data = {};
    $scope.engagement.data.contactId = socket.message[5];
    $scope.engagement.data.comments = socket.message[6];
    $scope.engagement.data.CompanyNo = socket.message[3];
  }

  $scope.saveEngagement = function (engagement) {

    engagementService.SaveEngagement(engagement).then(function (response) {
      if (response) {
        $scope.showAlert("Save Engagement", "Successfully Saved");
        $location.path('/engagement/list');
      }
      else
        $scope.showAlert("Save Engagement", "Fail to Save.");


    }, function (error) {
      console.info("GetCatagories err" + error);

    });
  };

  $scope.showAlert = function (title, textContent, ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(textContent)
        .ariaLabel('Alert Dialog')
        .ok('Ok')
    );
  };
});

app.controller("FileListController", function ($scope, $mdDialog, $mdMedia, $route, $routeParams, $mdDialog, $mdMedia, $location, $log, $filter, $http, NgTableParams, engagementService) {

  $scope.engagements = {};
  $scope.engagementsHistory = {};
  $scope.items = {};

  $scope.LoadEngagementHistory = function (engagement) {
    engagementService.Engagement = engagement;
    $location.path('/engagement/history');
  };

  $scope.loadItems = function (sessionId) {

    engagementService.GetItemsBySessionId(sessionId).then(function (response) {
      $scope.items = $filter('filter')(response, {itemType: "EngagementItem"});
    }, function (error) {
      console.info("GetEngagementsBySessionId err" + error);

    });
  };


  $scope.loadEngagements = function () {

    engagementService.LoadEngagements(5, 1).then(function (response) {
      $scope.engagements = $filter('filter')(response, {engagementType: "Engagement"});
    }, function (error) {
      console.info("GetCatagories err" + error);

    });
  };

  $scope.getEngagementsBySessionId = function (sessionId) {

    engagementService.GetEngagementsBySessionId(sessionId).then(function (response) {
      $scope.engagementsHistory = $filter('filter')(response, {engagementType: "Engagement"});
    }, function (error) {
      console.info("GetCatagories err" + error);

    });
  };

  $scope.loadEngagements();

  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

  $scope.showAdvanced = function (ev, eng) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'partials/addItems.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    })
      .then(function (item) {
        if (item != "Cancel") {
          engagementService.SaveItem(item, eng).then(function (response) {
            if (response)
              Notification.success({message: "Successfully Saved", delay: 300, closeOnClick: true});
            else
              Notification.error({message: "Fail to Save.", delay: 300, closeOnClick: true});

          }, function (error) {
            console.info("SaveItem err" + error);
          });
        }
        //$scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        //$scope.status = 'You cancelled the dialog.';
      });
    $scope.$watch(function () {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function (wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

});

app.controller("FileHistoryController", function ($scope, $mdDialog, $mdMedia, $route, $routeParams, $mdDialog, $mdMedia, $location, $log, $filter, $http, NgTableParams, engagementService) {


  $scope.engagement = engagementService.Engagement;
  $scope.engagementsHistory = {};
  $scope.items = {};

  if (!engagementService.Engagement)
    $location.path('/engagement/list');

  $scope.loadItems = function (sessionId) {
    if (!sessionId)
      $location.path('/engagement/list');
    engagementService.GetItemsBySessionId(sessionId).then(function (response) {
      $scope.items = $filter('filter')(response, {itemType: "EngagementItem"});
    }, function (error) {
      console.info("GetEngagementsBySessionId err" + error);

    });
  };

  $scope.getEngagementsBySessionId = function (sessionId) {
    if (!sessionId)
      $location.path('/engagement/list');
    engagementService.GetEngagementsBySessionId(sessionId).then(function (response) {
      $scope.engagementsHistory = $filter('filter')(response, {engagementType: "Engagement"});
    }, function (error) {
      console.info("GetCatagories err" + error);

    });
  };

  $scope.loadItems($scope.engagement.sessionId);
  $scope.getEngagementsBySessionId($scope.engagement.sessionId)
});


function DialogController($scope, $mdDialog) {
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}

app.directive("myDirective", function ($filter, engagementService) {

  return {
    restrict: "EA",
    scope: {
      name: "@",
      heroes: '=data'
    },

    template: '<div ng-repeat="x in heroes" style="border: outset"><md-input-container class="md-block" flex-gt-xs><label>Descriptions</label><input name="Descriptions" ng-model="x.data.Descriptions"></md-input-container><md-input-container class="md-block"> <label>Data</label>    <textarea ng-model="x.data.Data" columns="1" md-maxlength="500" rows="5"></textarea>    </md-input-container>    </div>',


    link: function (scope, element, attributes) {

      engagementService.GetItemsBySessionId(scope.name).then(function (response) {
        scope.heroes = $filter('filter')(response, {attachmentType: "EngagementItem"});
      }, function (error) {
        console.info("GetEngagementsBySessionId err" + error);

      });


    }
  }
});

