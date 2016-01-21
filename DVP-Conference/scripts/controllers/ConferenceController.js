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


app.controller("ConferenceUserController", function($scope, $location,$mdDialog,$log,$timeout,$q,$routeParams,  conference, sipuser){



  $scope.loadConference = function() {
    conference.GetConference($routeParams.id).then(function (response) {
      $scope.conference = response;
      conference.Conference = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };


  $scope.loadConference();




  $scope.simulateQuery = false;
  $scope.isDisabled    = false;
  $scope.itemFound = false;
  // list of `state` value/display objects

  $scope.sipUsers = [];
  $scope.conferenceUsers = [];
  $scope.querySearch   = querySearch;
  $scope.selectedItemChange = selectedItemChange;
  $scope.searchTextChange   = searchTextChange;

  $scope.selectedItem = undefined;


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



  $scope.addUserOut = function(text) {
    //alert(JSON.stringify( $scope.selectedItem ));


    var user = {};
    user.JoinType = "Outbound";

    if($scope.selectedItem){


      user.SipUACEndpointId = $scope.selectedItem.id;

      $scope.AddUserToConference(user);


    }else{


      if($scope.searchText) {

        user.Destination = text;

        //user.SipUACEndpointId = $scope.selectedItem.id;

        $scope.AddUserToConference(user);
      }

    }

  }

  $scope.addUserIn = function(text) {
    //alert(JSON.stringify( $scope.selectedItem ));

    var user = {};
    user.JoinType = "Inbound";

    if($scope.selectedItem){


      user.SipUACEndpointId = $scope.selectedItem.id;

      $scope.AddUserToConference(user);


    }else{


      if($scope.searchText) {

        user.Destination = text;

        //user.SipUACEndpointId = $scope.selectedItem.id;

        $scope.AddUserToConference(user);
      }

    }

  }



  function querySearch (query) {
    var results = query ? $scope.sipUsers.filter( createFilterFor(query) ) : $scope.sipUsers,
      deferred;
    if ($scope.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
    $scope.selectedItem = item;

    if(item){
      $scope.itemFound = true;
    }else{

      $scope.itemFound = false;
    }
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(user) {
      return (user._lowername.indexOf(lowercaseQuery) === 0);
    };
  }


  $scope.LoadSipUsers = function(){


    // resource.user = {};
    sipuser.GetSipUsers().then(function (response) {
      $scope.sipUsers = response.map(function(c,index){

        var item = c;
        item._lowername= c.SipUsername.toLowerCase();
        return item;

      });


    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });



  };


  $scope.AddUserToConference = function(user) {


    // resource.user = {};
    conference.AddUserToConference($routeParams.id, user).then(function (response) {

      if(response) {
        $scope.showAlert("Add user", "Add user", "ok", "User added successfully");
        $scope.LoadConferenceUsers();
      }else{

        $scope.showAlert("Error","Error","ok","There is an error ");

      }


    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });


  }

  $scope.DeleteConferenceUser= function(user) {


    // resource.user = {};
    conference.DeleteConferenceUser(user.id).then(function (response) {

      //$scope.showAlert("Add user", "Add user", "ok","User added successfully");
      $scope.LoadConferenceUsers();


    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });


  }



  $scope.UpdateConferenceUser= function(user) {


    // resource.user = {};
    conference.UpdateConferenceUser(user.id, user).then(function (response) {

      //$scope.showAlert("Add user", "Add user", "ok","User added successfully");
      //$scope.LoadConferenceUsers();


    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });


  }

  $scope.UpdateConferenceUserModes= function(user) {


    var modes = {};

    modes.Def =  user.Def;
    modes.Mute =  user.Mute;
    modes.Mod = user.Mod;


    // resource.user = {};
    conference.UpdateConferenceUserModes(user.id, modes).then(function (response) {

      //$scope.showAlert("Add user", "Add user", "ok","User added successfully");
      //$scope.LoadConferenceUsers();


    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });


  }







  $scope.LoadConferenceUsers = function() {

    // resource.user = {};
    conference.GetConferenceUsers($routeParams.id).then(function (response) {
      $scope.conferenceUsers = response.map(function(c,index){

        var item = c;

        if(c.SipUACEndpoint){

          c.Name = c.SipUACEndpoint.SipUsername;
          c.Email = c.SipUACEndpoint.EmailAddress;

        }else{

          c.Name = c.Destination;
          c.Email = "user@external.com";


        }


        return item;

      });




    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });

  };




  $scope.LoadConferenceUsers();
  $scope.LoadSipUsers();




});


app.controller("ConferenceEditController", function($scope, $location,$mdDialog,$routeParams,  conference){


  $scope.conference = {};
  $scope.edit = true;
  $scope.now = new Date().getTime();

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
        $scope.showAlert("Conference Updated","Conference Updated","ok","Conference Updated successfully "+$scope.conference.ConferenceName);
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

      if(response) {

        $scope.showAlert("Conference Created", "Conference Created", "ok", "Conference created successfully " + response.ConferenceName);
        $location.path('/conference/list');
      }else{

        $scope.showAlert("Error","Error","ok","There is an error, Please check conference name availability");

      }



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


  $scope.foundConference = false;

  $scope.GetConference = function(confName) {
    conference.GetConference(confName).then(function (response) {
      if(response) {

        $scope.foundConference = true;

      }
    }, function (error) {

    });
  };




});
