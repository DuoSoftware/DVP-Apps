(function () {
  'use strict';
  angular
    .module('NetworkManageApp')
    .controller('CallServerChipsController', DemoCtrl);
  function DemoCtrl($scope, $routeParams, clusterService) {
    var self = this;
    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.searchCallServer = searchCallServer;
    self.selectedCallServers = [];
    self.callServers = loadCallServers();
    self.numberChips = [];
    self.numberChips2 = [];
    self.numberBuffer = '';
    self.autocompleteDemoRequireMatch = false;
    self.transformCallServer = transformCallServer;

    $scope.status = {};
    $scope.showStatus = false;

    self.OnCallServerAdd = function (chip) {
      $scope.showStatus = false;
      self.AssignCallServer(chip);
      return chip;
    };

    self.OnCallServerDelete = function ($chip) {
      $scope.showStatus = false;
      self.DeleteCallServer($chip);
    };

    function ResetAssignCallServerChips(contact) {
      $scope.showStatus = true;
      $scope.status = "Fail to Add Call Server - " + contact.Name;
      for (var i = self.selectedCallServers.length; i--;) {
        if (self.selectedCallServers[i]) {
          if (self.selectedCallServers[i].id === contact.id) {
            self.selectedCallServers.splice(i, 1);
          }
        }
      }
    }

    function ResetDeleteCallServerChips(callServer) {
      $scope.showStatus = true;
      $scope.status = "Fail to Delete Call Server - " + callServer.Name;
      self.selectedCallServers.push(callServer);
    }

    self.AssignCallServer = function (contact) {
      clusterService.AssignCallServerToCluster(contact.id, $routeParams.id).then(function (response) {
        $scope.showStatus = !response;
        if (!response) {
          ResetAssignCallServerChips(contact);
          $route.reload();
        }
        else {

        }
      }, function (error) {
        ResetAssignCallServerChips(contact);
        $route.reload();
      });
    };

    self.DeleteCallServer = function (callServer) {
      clusterService.DeleteCallServerFromCluster($routeParams.id, callServer.id).then(function (response) {
        $scope.showStatus = !response;
        if (!response) {
          ResetDeleteCallServerChips(callServer);
          $route.reload();
        }
      }, function (error) {

        ResetDeleteCallServerChips(callServer);
        $route.reload();
      });
    };

    function transformCallServer(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return {Name: chip, InternalMainIP: 'new'}
    }

    function searchCallServer(query) {
      var results = query ? self.callServers.filter(createFilterForCallServer(query)) : [];
      return results;
    }

    function createFilterForCallServer(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(callServer) {
        return (callServer._lowername.indexOf(lowercaseQuery) === 0) ||
          (callServer._lowertype.indexOf(lowercaseQuery) === 0);
      };
    }

    function loadCallServers() {

      clusterService.GetCallServers().then(function (response) {
        if (response) {
          self.callServers = response.map(function (c) {
            var contact = {
              Name: c.Name,
              InternalMainIP: c.InternalMainIP,
              id: c.id,
            };
            contact._lowername = c.Name.toLowerCase();
            contact._lowertype = c.InternalMainIP.toLowerCase();
            return contact;
          });
        }
        loadCluster();
      });
    }

    function loadCluster() {
      clusterService.GetCluster($routeParams.id).then(function (response) {
        if (response) {
          self.selectedCallServers = response.CallServer.map(function (c, index) {
            var contact = {
              Name: c.Name,
              InternalMainIP: c.InternalMainIP,
              id: c.id,
            };
            contact._lowername = c.Name.toLowerCase();
            contact._lowertype = c.InternalMainIP.toLowerCase();
            return contact;
          });

          for (var j = self.callServers.length; j--;) {
            for (var i = self.selectedCallServers.length; i--;) {
              if (self.selectedCallServers[i]) {
                if (self.selectedCallServers[i].id === self.callServers[j].id) {
                  self.selectedCallServers.splice(i, 1);
                  self.selectedCallServers.push(self.callServers[j]);
                }
              }
            }
          }
        }

      }, function (error) {

      });
    };

  }
})();

(function () {
  'use strict';
  angular
    .module('NetworkManageApp')
    .controller('NetworkChipsController', DemoCtrl);
  function DemoCtrl($scope, $routeParams, clusterService) {
    var self = this;
    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.autocompleteDemoRequireMatch = false;

    $scope.status = {};
    $scope.showStatus = false;

    self.searchNetwork = searchNetwork;
    self.networks = loadNetworks();
    self.transformNetwork = transformNetwork;
    self.selectedNetworks = [];

    self.OnNetworkAdd = function (chip) {
      self.AssignNetwork(chip);
      return chip;
    };

    self.OnNetworkDelete = function ($chip) {
      self.DeleteNetwork($chip);
    };

    function ResetAssignNetworkChips(network) {
      $scope.showStatus = true;
      $scope.status = "Fail to Add Network - " + network.Network;
      for (var i = self.selectedCallServers.length; i--;) {
        if (self.selectedCallServers[i]) {
          if (self.selectedCallServers[i].id === network.id) {
            self.selectedCallServers.splice(i, 1);
          }
        }
      }
    }

    function ResetDeleteNetworkChips(network) {
      $scope.showStatus = true;
      $scope.status = "Fail to Delete Network - " + network.Network;
      self.selectedNetworks.push(network);
    }

    self.AssignNetwork = function (network) {
      clusterService.AssignNetworkToCluster(network.id, $routeParams.id).then(function (response) {

        if (response) {
          $scope.showStatus = !response;
          if (!response) {

            ResetAssignNetworkChips(network);
            $route.reload();
          }
          else {

          }
        }
      }, function (error) {
        $scope.showStatus = true;
        $scope.status = "Fail to Add Network - " + contact.Network;
        $route.reload();
      });
    };


    self.DeleteNetwork = function (network) {
      clusterService.DeleteNetworkFromCluster($routeParams.id, network.id).then(function (response) {
        if (response) {
          $scope.showStatus = !response;
          if (!response) {
            ResetDeleteNetworkChips(network);
            $route.reload();
          }
        }
      }, function (error) {
        $scope.showStatus = true;
        $scope.status = "Fail to Delete Network - " + network.Network;
        $route.reload();
      });
    };

    function transformNetwork(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return {Network: chip, NATIP: 'new'}
    }

    function searchNetwork(query) {
      var results = query ? self.networks.filter(createFilterForNetwork(query)) : [];
      return results;
    }

    function createFilterForNetwork(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(network) {
        return (network._lowername.indexOf(lowercaseQuery) === 0) ||
          (network._lowertype.indexOf(lowercaseQuery) === 0);
      };
    }

    function loadNetworks() {

      clusterService.GetNetworks().then(function (response) {
        self.networks = response.map(function (c) {
          var contact = {
            Network: c.Network,
            NATIP: c.NATIP,
            id: c.id,
          };
          contact._lowername = c.Network.toLowerCase();
          contact._lowertype = c.NATIP.toLowerCase();
          return contact;
        });
        loadAddedNetworks();
      });
    }

    function loadAddedNetworks() {
      clusterService.GetCluster($routeParams.id).then(function (response) {
        if (response) {
          self.selectedNetworks = response.Network.map(function (c, index) {
            var contact = {
              Network: c.Network,
              NATIP: c.NATIP,
              id: c.id,
            };
            contact._lowername = c.Network.toLowerCase();
            contact._lowertype = c.NATIP.toLowerCase();
            return contact;
          });


          for (var j = self.networks.length; j--;) {
            for (var i = self.selectedNetworks.length; i--;) {
              if (self.selectedNetworks[i]) {
                if (self.selectedNetworks[i].id === self.networks[j].id) {
                  self.selectedNetworks.splice(i, 1);
                  self.selectedNetworks.push(self.networks[j]);
                }
              }
            }
          }
        }
      }, function (error) {

      });
    };

  }
})();


