/**
 * Created by a on 1/11/2016.
 */



var app = angular.module("ConferenceApp",["ngMaterial","ngMessages", "ngRoute", "conferenceService", "sipUserService"]);


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default');
});

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


app.directive('conferenceAvailable', function($timeout, $q, $http) {
  return {
    restrict: 'A',
    require: 'ngModel',


    link: function(scope, elm, attr, model) {


      model.$asyncValidators.conferenceExists = function(input) {

        var defer = $q.defer();
        $http.get("http://127.0.0.1:8085/DVP/API/6.0/ConferenceConfiguration/ConferenceRoom/" + input).then(function(response) {
          if(response.data && response.data.IsSuccess) {



              if (response.data.Result) {

                //model.$setValidity('conferenceExists', false);
                defer.reject();

              } else {

                //model.$setValidity('conferenceExists', true);
                defer.resolve();

              }

            }else{

              //model.$setValidity('conferenceExists', true);
              defer.resolve();
            }




        });

        return defer.promise;

      };
    }
  }
});








