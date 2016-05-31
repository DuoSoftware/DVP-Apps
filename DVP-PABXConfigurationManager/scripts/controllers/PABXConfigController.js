/**
 * Created by Pawan on 1/28/2016.
 */
(function () {

  var app =   angular.module("pabxconfigapp");
  var PABXConfigController = function ($scope,dbservice,commonservice,$location,$mdDialog,$mdMedia)
  {

    var self = this;
    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.eNumbers = [];
    self.selectedENumbers = [];

    //self.selectedVegetables = [];
    //self.numberChips = [];
    //self.numberChips2 = [];
    //self.numberBuffer = '';
    self.autocompleteDemoRequireMatch = true;
    self.transformChip = transformChip;

    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    };
    function querySearch (query) {
      var results = query ? self.eNumbers.filter(createFilterFor(query)) : [];
      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(vegetable) {
        return (vegetable._lowername.indexOf(lowercaseQuery) === 0) /*||
         (vegetable._lowertype.indexOf(lowercaseQuery) === 0);*/
      };
    }




    var onError = function(reason) {
      $scope.isDisabled = false;
      $scope.error=reason;
      commonservice.showAlert("ERROR","Error Occured");
    };

    var onMasterLoadCompleted = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        $scope.masterObj=response.data.Result;
      }

    };

    var onMasterConfigSaveCompleted = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        //$scope.masterObj=response.data.Result;
        commonservice.showAlert("PABX Global Configurations","Configurations successfully Updated");
        console.log(" Saves Master "+JSON.stringify(response));
      }
    };

    var onGeneralLoadCompleted = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        $scope.generalObj=response.data.Result;
        if($scope.generalObj.PickUp)
        {
          $scope.generalObj.PickUp = parseInt($scope.generalObj.PickUp);
        }
        if($scope.generalObj.Park)
        {
          $scope.generalObj.Park = parseInt($scope.generalObj.Park);
        }
        if($scope.generalObj.Barge)
        {
          $scope.generalObj.Barge = parseInt($scope.generalObj.Barge);
        }
        if($scope.generalObj.Intercept)
        {
          $scope.generalObj.Intercept = parseInt($scope.generalObj.Intercept);
        }
        if($scope.generalObj.VoiceMail)
        {
          $scope.generalObj.VoiceMail = parseInt($scope.generalObj.VoiceMail);
        }


        console.log("General "+JSON.stringify($scope.generalObj));

      }
    };

    var onGeneralConfigSaveCompleted = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        //$scope.masterObj=response.data.Result;
        commonservice.showAlert("PABX Feature codes","Configurations successfully Updated");
        console.log(" Saves General "+JSON.stringify(response));
      }
    };

    var onEnumbersloadCompleted = function (response) {

      console.log("Hitaaaaz");
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        //$scope.masterObj=response.data.Result;
        self.eNumbers = response.data.Result.map(function (c) {

          var eNum = {
            name: c.EmergencyNum/*,
             type: c.EmergencyNum*/
          };
          eNum._lowername = c.EmergencyNum;
          /*veg._lowertype = c.EmergencyNum;*/
          return eNum.name;
        });
      }



    };

    var onAddCompleted = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        console.log(" new Emg Number added "+JSON.stringify(response));
      }
    };
    var onDelCompleted = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        console.log("mg Number deleted "+JSON.stringify(response));
      }
    };

    $scope.loadMasterConfigs = function () {

      dbservice.loadMasterData().then(onMasterLoadCompleted,onError);

    };

    $scope.loadGeneralConfigs = function () {

      dbservice.loadGeneral().then(onGeneralLoadCompleted,onError);
    };

    $scope.saveMasterConfigs = function () {

      dbservice.updateMasterData($scope.masterObj).then(onMasterConfigSaveCompleted,onError);
    };

    $scope.saveGeneralConfigs = function () {
      dbservice.updateGeneralData($scope.generalObj).then(onGeneralConfigSaveCompleted,onError);
    };

    $scope.loadEmergencyNumbers = function () {

      dbservice.loadEmergencyNumbers().then(onEnumbersloadCompleted,onError);

    };




    self.OnChipAdd = function($chip){

      console.log($chip);
      var newObj =
      {
        EmergencyNumber:$chip
      };

      dbservice.addEmgNumber(newObj).then(onAddCompleted,onError);


    };


    self.OnChipDelete = function($chip)
    {
      dbservice.delEmgNumber($chip).then(onDelCompleted,onError);
    }


    $scope.loadMasterConfigs();
    $scope.loadGeneralConfigs();

    $scope.loadEmergencyNumbers();

  };

  app.controller("PABXConfigController",PABXConfigController);
}());
