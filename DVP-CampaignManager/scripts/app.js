/**
 * Created by a on 1/19/2016.
 */
var app = angular.module("CampaignApp", ["ngMaterial","ngMessages", "ngRoute","campaignService", "sipUserService", "scheduleService", "uploadService", "phoneNumberService"]);

app.config(function($routeProvider){

  $routeProvider.when("/campaign/list",{


    templateUrl: 'partials/campaignList.html',
    controller: 'CampaignListController'


  }).when("/campaign/create",{


    templateUrl: 'partials/campaignCreate.html',
    controller: 'CampaignCreateController'


  }).when("/campaign/:id/edit",{


    templateUrl: 'partials/campaignEdit.html',
    controller: 'CampaignEditController'



  }).when("/campaign/:id/view",{


    templateUrl: 'partials/campaignView.html',
    controller: 'CampaignViewController'



  }).otherwise({


    templateUrl: 'partials/campaignList.html',
    controller: 'CampaignListController'


  });

});




app.directive('apsUploadFile', apsUploadFile);

function apsUploadFile() {
  var directive = {
    transclude: true,
    restrict: 'E',
    templateUrl: 'partials/uploadButton.html',
    link: function apsUploadFileLink(scope, element, attrs) {
      var input = $(element[0].querySelector('#fileInput'));
      var button = $(element[0].querySelector('#uploadButton'));
      var resetbutton = $(element[0].querySelector('#resetButton'));
      var textInput = $(element[0].querySelector('#textInput'));

      if (input.length && button.length && textInput.length) {
        button.click(function (e) {
          input.click();
        });
        textInput.click(function (e) {
          input.click();
        });
      }

      input.on('change', function (e) {
        var files = e.target.files;
        if (files[0]) {
          scope.fileName = files[0].name;
        } else {
          scope.fileName = null;
        }
        scope.$apply();
      });

      resetbutton.on('click', function (e) {

        scope.fileName = undefined;
        this.form.reset();

      });
    }
  }
  return directive;
}





app.directive("ngFileSelect",function(){

  return {
    link: function($scope,el){

      el.bind("change", function(e){

        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile($scope.file);
      })

    }

  }


})
