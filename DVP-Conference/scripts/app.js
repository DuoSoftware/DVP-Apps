/**
 * Created by a on 1/11/2016.
 */



var app = angular.module("ConferenceApp",["ngMaterial","ngMessages", "ngRoute", "conferenceService", "sipUserService"]);

app.config(function($routeProvider){

  $routeProvider.when("/",{

    templateUrl: 'partials/conferenceList.html',
    controller: 'ConferenceListController'

  }).when("/conference/list",{


    templateUrl: 'partials/conferenceList.html',
    controller: 'ConferenceListController'


  }).when("/conference/create",{


    templateUrl: 'partials/conferenceAdd.html',
    controller: 'ConferenceCreateController'


  }).when("/conference/:id/edit",{


    templateUrl: 'partials/conferenceEdit.html',
    controller: 'ConferenceEditController'



  }).when("/conference/:id/view",{


    templateUrl: 'partials/conferenceView.html',
    controller: 'ConferenceViewController'



  }).when("/conference/:id/users",{


  templateUrl: 'partials/conferenceUserForm.html',
  controller: 'ConferenceUserController'



  }).otherwise({


    templateUrl: 'partials/conferenceList.html',
    controller: 'ConferenceListController'

  });

});





