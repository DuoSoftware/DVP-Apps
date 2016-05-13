/**
 * Created by a on 1/11/2016.
 */



var app = angular.module("ConferenceApp",["ngMaterial","ngMessages", "ngRoute", "conferenceService", "sipUserService",'md.data.table']);


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default');
});

app.config(function($routeProvider){

  $routeProvider.when("/",{

    templateUrl: 'partials/conferenceList.html',
    controller: 'conferenceListController'

  }).when("/conference/list",{


    templateUrl: 'partials/conferenceList.html',
    controller: 'conferenceListController'


  }).when("/conference/create",{


    templateUrl: 'partials/conferenceAdd.html',
    controller: 'conferenceCreateController'


  }).when("/conference/:id/edit",{


    templateUrl: 'partials/conferenceEdit.html',
    controller: 'conferenceEditController'



  }).when("/conference/:id/view",{


    templateUrl: 'partials/conferenceView.html',
    controller: 'conferenceViewController'



  }).when("/conference/:id/users",{


  templateUrl: 'partials/conferenceUserForm.html',
  controller: 'conferenceUserController'



  }).otherwise({


    templateUrl: 'partials/conferenceList.html',
    controller: 'conferenceListController'

  });

});


app.directive('conferenceAvailable', function($timeout, $q, $http) {
  return {
    restrict: 'A',
    require: 'ngModel',


    link: function(scope, elm, attr, model) {


      model.$asyncValidators.conferenceExists = function(input) {

        var defer = $q.defer();
        var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
        return $http({
          method: 'GET',
          url: "http://conference.104.131.67.21.xip.io/DVP/API/1.0.0.0/ConferenceConfiguration/ConferenceRoom/" + input,
          headers: {
            'authorization': authToken
          }
          //data:data
        })
          .then(function(response) {
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








