(function () {
  'use strict';
  angular
    .module('ClusterManageApp')
    .controller('CustomInputDemoCtrl', DemoCtrl);
  function DemoCtrl($timeout, $q, $scope, $routeParams, $filter, clusterService) {
    var self = this;
    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.ipAddresss = [];// loadIpAddresses();
    self.selectedIpAddresses = [];
    self.numberChips = [];
    self.numberChips2 = [];
    self.numberBuffer = '';
    self.autocompleteDemoRequireMatch = true;
    self.transformChip = transformChip;

    $scope.MainIp = "";
    self.OnIpAdd = function (v) {

      var IPAddress = {};
      IPAddress.IsAllocated = true;
      IPAddress.IP = v;
      IPAddress.CallserverID = $routeParams.id;

      clusterService.CreateIpAddress(IPAddress).then(function (response) {
        $scope.showStatus = !response;
        loadCallServers();
        if (!response) {
          $scope.showStatus = true;
          $scope.status = "Fail to Delete IP Address - " + IPAddress.IP;
        }
      }, function (error) {
        $scope.showStatus = true;
        $scope.status = "Fail to Delete IP Address - " + IPAddress.IP;
        $route.reload();
      });

    };

    self.OnIpDelete = function ($chip) {
      self.DeleteNetwork($chip);
    };

    self.DeleteNetwork = function (ip) {
      clusterService.DeleteIpAddresses(ip).then(function (response) {
        $scope.showStatus = !response;
        if (response) {
          loadCallServers();
        } else {
          $scope.showStatus = true;
          $scope.status = "Fail to Delete IP Address - " + ip.IP;
          self.selectedIpAddresses.push(ip);
        }
      }, function (error) {
        $scope.showStatus = true;
        $scope.status = "Fail to Delete IP Address - " + ip.IP;
        loadCallServers();
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
      return {name: chip, mainIp: 'new'}
    }

    /**
     * Search for ipAddresss.
     */
    function querySearch(query) {
      var results = query ? self.ipAddresss.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(ipAddress) {
        return (ipAddress._lowername.indexOf(lowercaseQuery) === 0) ||
          (ipAddress._lowertype.indexOf(lowercaseQuery) === 0);
      };
    }

    function loadCallServers() {
      clusterService.GetIpAddresses().then(function (response) {
        if (response) {

          var assignToCallServer = $filter('filter')(response, {CallServerId: $routeParams.id});
          var ipAddressAvailable = $filter('filter')(assignToCallServer, {IsAllocated: false});
          var selectedCallServer = $filter('filter')(assignToCallServer, {IsAllocated: true});

          self.ipAddresss = assignToCallServer.map(function (v) {
            $scope.MainIp = v.MainIp;
            var veg = {
              IP: v.IP,
              mainIp: v.MainIp,
              allocated: v.IsAllocated,
              id: v.id,
              callServerId: v.CallServerId
            };
            veg._lowername = veg.IP;
            veg._lowertype = veg.mainIp;
            return veg;
          });

          self.selectedIpAddresses = selectedCallServer.map(function (v) {
            var veg = {
              IP: v.IP,
              mainIp: v.MainIp,
              allocated: v.IsAllocated,
              id: v.id,
              callServerId: v.CallServerId
            };
            veg._lowername = veg.IP;
            veg._lowertype = veg.mainIp;
            return veg;
          });
        }

      });
    }

    loadCallServers();
  }
})();
