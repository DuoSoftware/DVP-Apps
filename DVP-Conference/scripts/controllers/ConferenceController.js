/**
 * Created by a on 1/11/2016.
 */

var app = angular.module("ConferenceApp");

app.controller("ConferenceListController", function($scope, $location,$mdDialog, conference){


  $scope.showAlert = function(tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };

  $scope.showConfirm = function(tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

    var confirm = $mdDialog.confirm()
      .title(tittle)
      .textContent(content)
      .ok(okbutton)
      .cancel(cancelbutton);
    $mdDialog.show(confirm).then(function() {
      OkCallback(okObj);
    }, function() {
      CancelCallBack();
    });
  };



  $scope.loadConferences = function() {

    // resource.user = {};
    conference.GetConferences().then(function (response) {
      $scope.conferences = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });

  };


  $scope.deleteConference = function(confObj){


    $scope.showConfirm("Delete Conference","Delete","ok","cancel","Do you want to delete " + confObj.ConferenceName,function(obj){

      conference.DeleteConference(obj.ConferenceName).then(function (response) {
        //$scope.resources = response;
        $scope.loadConferences();

        $scope.showAlert("Deleted", "Deleted", "ok","Conference " + obj.ConferenceName+ " Deleted successfully");

      }, function (error) {
        $scope.showAlert("Error","Error","ok","There is an error ");
      });

    }, function(){

      //$scope.showAlert("title","lable","ok","content");

    },confObj)




  };


  $scope.viewConference = function(resourceID){

    $location.path('/conference/'+resourceID+'/edit');

  }


  $scope.loadConferences();



});


app.controller("ConferenceViewController", function($scope, $location,$mdDialog, conference){

});


app.controller("ConferenceUserController", function($scope, $location,$mdDialog, conference){

  $scope.conference = conference.Conference

});



app.controller("ConferenceEditController", function($scope, $location,$mdDialog,$routeParams,  conference){


  $scope.conference = {};
  $scope.edit = true;
  $scope.now = new Date();

  $scope.showAlert = function(tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };

  $scope.loadConference = function() {
    conference.GetConference($routeParams.id).then(function (response) {
      $scope.conference = response;
      conference.Conference = response;

      $scope.conference.StartTime = new Date(response.StartTime);
      $scope.conference.EndTime = new Date(response.EndTime);

    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };


  $scope.loadConference();

  //$scope.resource = resource.User;

  $scope.updateConference = function() {
    conference.UpdateConference($scope.conference).then(function (response) {
      //$scope.resource = response;

      if(response)
        $scope.showAlert("Conference Updated","Conference Updated","ok","Resource Updated successfully "+$scope.conference.ConferenceName);
      else
        $scope.showAlert("Error","Error","ok","There is an error ");
      //$location.path('/resource/'+resource.User.ResourceId+'/view');
      //$location.path('/resource/list');

    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };


});


app.controller("ConferenceCreateController", function($scope, $location,$mdDialog, conference, sipuser){



  $scope.date = new Date();
  $scope.minDate = $scope.date;
  $scope.edit = false;
  $scope.now = new Date();



  $scope.showAlert = function(tittle, label, button, content) {

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(tittle)
        .textContent(content)
        .ok(button)
    );
  };

  $scope.showConfirm = function(tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

    var confirm = $mdDialog.confirm()
      .title(tittle)
      .textContent(content)
      .ok(okbutton)
      .cancel(cancelbutton);
    $mdDialog.show(confirm).then(function() {
      OkCallback(okObj);
    }, function() {
      CancelCallBack();
    });
  };


  $scope.conference = {};

  $scope.createConference = function() {
    conference.CreateConference($scope.conference).then(function (response) {
      //$scope.resource = response;


      $scope.showAlert("Conference Created","Conference Created","ok","Conference created successfully "+response.ConferenceName);
      $location.path('/conference/list');



    }, function (error) {

      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };


  $scope.LoadExtentions = function(){

    // resource.user = {};
    sipuser.GetExtensions().then(function (response) {
      $scope.extensions = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });


  }

  $scope.LoadExtentions();




});
