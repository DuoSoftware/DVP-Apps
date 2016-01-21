/**
 * Created by a on 1/19/2016.
 */




app.controller("CampaignCreateController", function($scope, $location,$mdDialog, campaign,sipuser){


  $scope.mechanisms = ["BLAST", "PREVIEW", "PREDICTIVE"];
  $scope.modes = ["IVR", "AGENT", "FIFO"];
  $scope.channels = ["SMS", "Email", "Call"];

  $scope.campaign = {};


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

  $scope.createCampaign = function(campaignx) {
    campaign.CreateCampaign(campaignx).then(function (response) {
      //$scope.resource = response;

      if(response) {

        $scope.showAlert("Campaign Created", "Campaign Created", "ok", "Campaign created successfully " + response.CampaignName);
        $location.path('/campaign/list');

      }else{

        $scope.showAlert("Error","Error","ok","There is an error, Please check campaign name availability");

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

});



app.controller("CampaignEditController", function($scope, $location,$mdDialog,$routeParams, campaign,sipuser){


  $scope.mechanisms = ["BLAST", "PREVIEW", "PREDICTIVE"];
  $scope.modes = ["IVR", "AGENT", "FIFO"];
  $scope.channels = ["SMS", "Email", "Call"];



  $scope.campaign = {};
  $scope.extensions;
  $scope.config = {};


  $scope.date = new Date();
  $scope.minDate = $scope.date;
  $scope.now = new Date();

  $scope.GetCampaign= function(){

    campaign.GetCampaign($routeParams.id).then(function (response) {
      //$scope.resource = response;

      if(response) {

        //$location.path('/campaign/'+id+'/edit');
        campaign.Campaign = response;
        $scope.campaign = response;

        if($scope.campaign.CampConfigurations ){


          $scope.config = $scope.campaign.CampConfigurations;

          $scope.config.StartDate = new Date($scope.config.StartDate);
          $scope.config.EndDate = new Date($scope.config.EndDate);


        }


      }else{

        $scope.showAlert("Error","Error","ok","There is an error, Error on get campaigns");

      }

    }, function (error) {

      $scope.showAlert("Error","Error","ok","There is an error ");
    });



  }




  $scope.LoadExtentions = function(){

    // resource.user = {};
    sipuser.GetExtensions().then(function (response) {
      $scope.extensions = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });


  }

  $scope.GetCampaign();
  $scope.LoadExtentions();



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

  $scope.updateCampaign = function(id, campaignx) {
    campaign.UpdateCampaign(id, campaignx).then(function (response) {
      //$scope.resource = response;

      if(response) {

        $scope.showAlert("Campaign Updated", "Campaign Updated", "ok", "Campaign Updated successfully " + campaignx.CampaignName);
        //$location.path('/campaign/list');

      }else{

        $scope.showAlert("Error","Error","ok","There is an error");

      }

    }, function (error) {

      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };

  $scope.updateCampaignConfig = function(id, campaignx) {


    if($scope.campaign.CampConfigurations){

      campaign.UpdateCampaignConfig(id, campaignx.ConfigureId, campaignx).then(function (response) {
        //$scope.resource = response;

        if(response) {

          $scope.showAlert("Campaign config updated", "Campaign config updated", "ok", "Campaign config updated successfully " + campaignx.CampaignName);
          $route.reload();
          //$location.path('/campaign/list');

        }else{

          $scope.showAlert("Error","Error","ok","There is an error");

        }



      }, function (error) {

        $scope.showAlert("Error","Error","ok","There is an error ");
      });




    }else{


      campaign.CreateCampaignConfig(id, campaignx).then(function (response) {
        //$scope.resource = response;

        if(response) {

          $scope.showAlert("Campaign config updated", "Campaign config updated", "ok", "Campaign config updated successfully " + campaignx.CampaignName);
          $route.reload();
          //$location.path('/campaign/list');

        }else{

          $scope.showAlert("Error","Error","ok","There is an error");

        }



      }, function (error) {

        $scope.showAlert("Error","Error","ok","There is an error ");
      });



    }




  };


});



app.controller("CampaignListController", function($scope, $location,$mdDialog, campaign){





  $scope.campaigns;

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

  $scope.loadCampaign = function() {
    campaign.GetCampaigns().then(function (response) {
      //$scope.resource = response;

      if(response) {

        //$scope.showAlert("Update Created", "Update Created", "ok", "Update created successfully " + response.CampaignName);
        $scope.campaigns = response;

      }else{

        $scope.showAlert("Error","Error","ok","There is an error, Error on loading campaigns");

      }

    }, function (error) {

      $scope.showAlert("Error","Error","ok","There is an error ");
    });
  };

  $scope.deleteCampaign = function(campObj) {


    $scope.showConfirm("Delete Campaign", "Delete", "ok", "cancel", "Do you want to delete " + campObj.CampaignName, function (obj) {

      campaign.DeleteCampaign(campObj.CampaignId).then(function (response) {
        //$scope.resource = response;

        if (response) {

          $scope.showAlert("Deleted", "Deleted", "ok", "Campaign " + obj.CampaignName + " Deleted successfully");
          $scope.loadCampaign();


        } else {

          $scope.showAlert("Error", "Error", "ok", "There is an error, Error on deleting campaigns");

        }

      }, function (error) {

        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });
    }, campObj)
  };






  $scope.editCampaign= function(id){


        $location.path('/campaign/'+id+'/edit');





  }


  $scope.loadCampaign();

});
