(function () {
  'use strict';
  angular
    .module('ClusterManageApp')
    .controller('CustomInputDemoCtrl', DemoCtrl);
  function DemoCtrl($timeout, $q, $routeParams, clusterService) {
    var self = this;
    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.vegetables = loadVegetables();
    self.selectedVegetables = [];
    self.numberChips = [];
    self.numberChips2 = [];
    self.numberBuffer = '';
    self.autocompleteDemoRequireMatch = false;
    self.transformChip = transformChip;


    self.OnChipAdd = function (chip) {
      self.AssignCallServer(chip);
      return chip;
    };

    self.OnChipDelete = function ($chip) {
      self.DeleteCallServer($chip);
    };

    self.AssignCallServer = function (contact) {
      clusterService.AssignCallServerToCluster(contact.id,$routeParams.id).then(function (response) {
        if (!response) {
          alert("error");
          self.selectedVegetables.remove(contact);
        }
      }, function (error) {
        alert(error);
      });
    };

    self.DeleteCallServer = function (mastertask) {
      clusterService.DeleteCallServerFromCluster($routeParams.id, mastertask.TaskId).then(function (response) {
        if (!response)
          alert("error");
      }, function (error) {
        alert(error);
      });
    };


    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return {Name: chip, InternalMainIP: 'new'}
    }


    /**
     * Search for vegetables.
     */
    function querySearch(query) {
      var results = query ? self.vegetables.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(vegetable) {
        return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
          (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
      };
    }


    function loadVegetables() {

      clusterService.GetCallServers().then(function (veggies) {
        self.vegetables = veggies.map(function (c) {
          var contact = {
            Name: c.Name,
            InternalMainIP: c.InternalMainIP,
            id: c.id,
          };
          contact._lowername = c.Name.toLowerCase();
          contact._lowertype = c.InternalMainIP.toLowerCase();
          return contact;
        });

      });
    }

    function loadVegetables1() {
      var veggies = [
        {
          'Name': 'Broccoli',
          'InternalMainIP': 'Brassica'
        },
        {
          'Name': 'Cabbage',
          'InternalMainIP': 'Brassica'
        },
        {
          'Name': 'Carrot',
          'InternalMainIP': 'Umbelliferous'
        },
        {
          'Name': 'Lettuce',
          'InternalMainIP': 'Composite'
        },
        {
          'Name': 'Spinach',
          'InternalMainIP': 'Goosefoot'
        }
      ];
      return veggies.map(function (veg) {
        veg._lowername = veg.Name.toLowerCase();
        veg._lowertype = veg.InternalMainIP.toLowerCase();
        return veg;
      });
    }
  }
})();
