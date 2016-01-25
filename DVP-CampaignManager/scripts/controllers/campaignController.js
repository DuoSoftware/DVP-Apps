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



app.controller("CampaignEditController", function($scope, $location,$mdDialog, $log, $routeParams, campaign,sipuser, schedule, fileReader){


  $scope.mechanisms = ["BLAST", "PREVIEW", "PREDICTIVE"];
  $scope.modes = ["IVR", "AGENT", "FIFO"];
  $scope.channels = ["SMS", "Email", "Call"];



  $scope.campaign = {};
  $scope.extensions;
  $scope.config = {};
  $scope.upload = {};
  $scope.hideaddCallBack = true;
  $scope.callBacks;

  //$scope.fileUpload = {};




  $scope.date = new Date();
  $scope.minDate = $scope.date;
  $scope.now = new Date();


  $scope.GetCallBacks= function(id){

    campaign.GetCallBacks(id).then(function (response) {
      //$scope.resource = response;

      if(response) {

        $scope.callBacks = response;

      }else{

        //$scope.showAlert("Error","Error","ok","There is an error, Error on get campaigns");

      }

    }, function (error) {

      //$scope.showAlert("Error","Error","ok","There is an error ");
    });

  };

  $scope.deleteCallback = function(id){



    campaign.DeleteCallBacks($scope.campaign.CampaignId,id).then(function (response) {
      //$scope.resource = response;

      if(response) {


        $scope.showAlert("Deleted", "Deleted", "ok", "Campaign Callback configurations deleted successfully");
        $scope.GetCallBacks($scope.config.ConfigureId);


      }else{

        $scope.showAlert("Error","Error","ok","There is an error");

      }

    }, function (error) {

      $scope.showAlert("Error","Error","ok","There is an error ");
    });



  }

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

          $scope.hideaddCallBack = false;

          $scope.GetCallBacks($scope.config.ConfigureId);


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

          $scope.showAlert("Campaign config updated", "Campaign config updated", "ok", "Campaign config updated successfully " + $scope.campaign.CampaignName);
          $scope.GetCampaign();
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

          $scope.showAlert("Campaign config updated", "Campaign config updated", "ok", "Campaign config updated successfully " + $scope.campaign.CampaignName);
          $scope.GetCampaign();
          //$location.path('/campaign/list');

        }else{

          $scope.showAlert("Error","Error","ok","There is an error");

        }



      }, function (error) {

        $scope.showAlert("Error","Error","ok","There is an error ");
      });



    }




  };

  $scope.AddCallbackDialog = function(){


    $mdDialog.show({
      templateUrl: 'partials/callbackDialog.html',
      clickOutsideToClose:true,
      locals: {parent: $scope, configid: $scope.config.ConfigureId},
      controller: "CallBackController",
      bindToController: true,
      fullscreen: true
    })
      .then(function(answer) {

        $scope.status = 'You said the information was "' + answer + '".';

        $scope.GetCallBacks($scope.config.ConfigureId);


      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });


  };

  $scope.AddCategory = function(cat){

    if(cat) {
      var obj = {"CategoryName": cat}

      campaign.CreateCategories(obj).then(function (response) {
        //$scope.resource = response;

        if(response) {

          $scope.showAlert("Create category", "Create category", "ok", "Create category successfully ");
          //$location.path('/campaign/list');
          $scope.LoadCategories();

        }else{

          $scope.showAlert("Error","Error","ok","There is an error");

        }

      }, function (error) {

        $scope.showAlert("Error","Error","ok","There is an error ");
      });

    }

  };

  $scope.LoadCategories = function(){

    // resource.user = {};
    campaign.GetCategories().then(function (response) {
      $scope.Categorys = response.map(function(c,index){

        var item = c;
        item._lowername= item.CategoryName.toLowerCase();
        return item;

      });



    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });


  }


  $scope.LoadSchedules = function(){

    // resource.user = {};
    schedule.GetSchedules().then(function (response) {
      $scope.Schedules = response;
    }, function (error) {
      $scope.showAlert("Error","Error","ok","There is an error ");
    });


  }

  $scope.uploadNumbers = function(upload) {



    upload.CampaignId = $scope.campaign.CampaignId;

    campaign.UploadNumbers(upload).then(function (response) {
      //$scope.resource = response;

      if (response) {


        $scope.showAlert("Number uploaded", "Number uploaded", "ok", "Number uploaded successfully ");

        this.form.reset();




      } else {

        $scope.showAlert("Error", "Error", "ok", "There is an error");

      }

    }, function (error) {

      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });
  };


  $scope.GetCampaign();

  $scope.LoadExtentions();

  $scope.LoadCategories();

  $scope.LoadSchedules();


  $scope.getFile = function (file) {
    $scope.file = file;
    $scope.progress = 0;
    fileReader.readAsText($scope.file, $scope)
      .then(function(result) {
        $scope.upload.Contacts = JSON.parse(result);
      });
  };

  $scope.$on("fileProgress", function(e, progress) {
    $scope.progress = (progress.loaded / progress.total) * 100;
  });




  $scope.querySearch = function(query) {
    var results = query ? $scope.Categorys.filter($scope.createFilterFor(query)) : [];
    return results;
  }


  $scope.createFilterFor = function(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(cat) {
      return (cat._lowername.indexOf(lowercaseQuery) === 0);
    };
  }

  $scope.searchTextChange = function(text) {
    $log.info('Text changed to ' + text);
  }
  $scope.selectedItemChange = function(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
    if(item){

      $scope.upload.CategoryID = item.CategoryID;

    }
  }





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

          $scope.showAlert("Deleted", "Deleted", "ok", "Campaign " + campObj.CampaignName + " Deleted successfully");
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


app.controller("CallBackController",function($scope,  $mdDialog, campaign, configid){


  $scope.callback = {};
  $scope.reasons;



  $scope.configid = configid;



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

  $scope.cancel = function(){

    //alert(JSON.stringify(attributes));

    $mdDialog.hide();

  };





  $scope.GetReasons = function(){



    campaign.GetReasons().then(function (response) {
      //$scope.resource = response;

      if(response) {


        $scope.reasons = response;


      }else{

        //$scope.showAlert("Error","Error","ok","There is an error");

      }

    }, function (error) {

      //$scope.showAlert("Error","Error","ok","There is an error ");
    });



  }





  $scope.AddCallBack = function(id, callback){



    campaign.UpdateCallBack(id, callback).then(function (response) {
      //$scope.resource = response;

      if(response) {


        $mdDialog.hide();


      }else{

        $scope.showAlert("Error","Error","ok","There is an error");

      }

    }, function (error) {

      $scope.showAlert("Error","Error","ok","There is an error ");
    });



  }

  $scope.GetReasons();



});
