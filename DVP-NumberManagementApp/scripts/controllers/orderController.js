/**
 * Created by Heshan.i on 1/20/2016.
 */
(function(){
  var app = angular.module("numberManagementApp");
  var orderController = function($scope, voxboneApi, $mdDialog, $mdMedia){
    var onGetCountryCodesComplete = function(data){
      if(data.IsSuccess){
        var jResult = JSON.parse(data.Result);
        $scope.countries = jResult.countries;
        $scope.countries.map( function (country) {
          return {
            country: country
          };
        });
      }
    };
    var onError = function(){

    };

    $scope.country = null;
    $scope.searchText = null;
    $scope.querySearch = function(country) {
      var results = country ? $scope.countries.filter( createFilterFor(country) ) : $scope.countries, deferred;
        return results;
    };
    function createFilterFor(query) {
      var uppercaseQuery = angular.uppercase(query);
      return function filterFn(country) {
        return (country.countryName.indexOf(uppercaseQuery) === 0);
      };
    };
    $scope.showDidGroupDialog = function(ev, countryCode) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: didGroupDialogController,
        templateUrl: 'partials/didGroups.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: useFullScreen,
        locals: {
          countryCode: countryCode
        }
      })
        .then(function(answer) {

        }, function() {
        });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };
    $scope.loadData = function(){
      voxboneApi.GetCountryCodes(0,500).then(onGetCountryCodesComplete, onError);
    };
    $scope.loadData();
  };

  function didGroupDialogController($scope, voxboneApi, $mdDialog, countryCode){
    var onFilterDidsFormTypeComplete = function(data){
      if(data.IsSuccess){
        var jResult = JSON.parse(data.Result);
        dupDidGroups = dupDidGroups.concat(jResult.didGroups);
        $scope.didGroups = GetUniques(dupDidGroups);
        var lPages = $scope.query.loadedPages.push($scope.query.page);
        angular.extend({}, $scope.query, {loadedPages: [lPages]});
        $scope.total = jResult.resultCount;
      }else{
        $scope.total = 0;
      }
    };
    var onGetDidsForCountryCodeComplete = function(data){
      if(data.IsSuccess){
        var jResult = JSON.parse(data.Result);
        dupDidGroups = dupDidGroups.concat(jResult.didGroups);
        $scope.didGroups = GetUniques(dupDidGroups);
        var lPages = $scope.query.loadedPages.push($scope.query.page);
        angular.extend({}, $scope.query, {loadedPages: [lPages]});
        $scope.total = jResult.resultCount;
      }else{
        $scope.total = 0;
      }
    };
    var onError = function(){

    };

    var GetUniques = function(data){
      var uniqueObjs = [];
      var uniqueIds = [];
      for(i = 0; i< data.length; i++){
        if(uniqueIds.indexOf(data[i].didGroupId) === -1){
          uniqueIds.push(data[i].didGroupId);
          uniqueObjs.push(data[i]);
        }
      }
      return uniqueObjs;
    };
    Array.prototype.inArray = function(comparer) {
      for(var i=0; i < this.length; i++) {
        if(comparer === (this[i])) return true;
      }
      return false;
    };

    var dupDidGroups = [];
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(ans) {
      $mdDialog.hide(ans);
    };
    $scope.onPaginate = function (page, limit) {
      if(limit != $scope.query.lastLimit){
        var lPagesCount = Math.floor($scope.didGroups.length / limit);
        var lPages = [];
        for(var i=0; i < lPagesCount; i++) {
          lPages.push(i+1);
        }
        $scope.query.loadedPages = lPages;
        $scope.query.lastLimit = limit;
      }
      if(!$scope.query.loadedPages.inArray(page)) {
        angular.extend({}, $scope.query, {page: page, limit: limit});
        var qPage = page - 1;
        voxboneApi.GetDidsForCountryCode(countryCode, qPage, limit).then(onGetDidsForCountryCodeComplete, onError);
      }
    };
    $scope.FilterByDidType = function(didType){
      $scope.query = {
        lastLimit: 5,
        loadedPages: [],
        limit: 5,
        page: 1
      };
      var page = $scope.query.page - 1;
      voxboneApi.FilterDidsFormType(didType, countryCode, page, $scope.query.limit).then(onFilterDidsFormTypeComplete, onError);
    };
    $scope.loadDidGroups = function(){
      $scope.query = {
        lastLimit: 5,
        loadedPages: [],
        limit: 5,
        page: 1
      };
      var page = $scope.query.page - 1;
      voxboneApi.GetDidsForCountryCode(countryCode, page, $scope.query.limit).then(onGetDidsForCountryCodeComplete, onError);
    };
    $scope.loadDidGroups();
  };
  app.controller("orderController", orderController);
}());
