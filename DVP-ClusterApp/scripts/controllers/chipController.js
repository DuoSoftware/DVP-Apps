/**
 * Created by a on 12/15/2015.
 */
(function () {
  'use strict';
  angular
    .module('ClusterManageApp')
    .controller('BasicDemoCtrl', DemoCtrl);

  function DemoCtrl ($scope, $routeParams, $timeout, $q, resource, task) {
    var self = this;



    //////////////////////////////////////////////////////////////////////////////////////

    self.autocompleteDemoRequireMatch = true;
    self.transformChip = transformChip;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;


    self.resourceTasks;
    self.masterTasks;


    function transformChip(chip) {

      if (angular.isObject(chip)) {
        return chip;
      }
      return { name: chip, type: 'new' }
    }



    function querySearch (query) {
      var results = query ? self.masterTasks.filter(createFilterFor(query)) : [];
      return results;
    }


    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(task) {
        return (task._lowername.indexOf(lowercaseQuery) === 0) ;
      };
    }

    ////////////////////////////////////////////////////////////////////////////////////


    self.getSelectedChipIndex = function(event) {
      var selectedChip = angular.element(event.currentTarget).controller('mdChips').selectedChip;
      //alert(selectedChip);
    }

    self.OnChipAdd = function($chip){
      //alert("Add " + $chip.TaskName);


        self.AssignTask($chip);
        return $chip;


    }


    self.OnChipDelete = function($chip){
      //alert("Delete " + $chip);


      self.DeleteTask($chip);


    }

    self.OnChipSelect = function($chip){
      //alert("Select "+$chip);



    }



    //////////////////////////////////////////////////////////////////////////////////////////////////

    function loadResourceTasks() {
      resource.GetTasksAssignedToResource($routeParams.id).then(function (response) {
        self.resourceTasks = response.map(function(c,index){

          var item = c.ResTask.ResTaskInfo;
          item.TaskId= c.ResTask.TaskId;
          item._lowername= item.TaskName.toLowerCase();
          return item;

        });
        /*
         map(function (c, index) {
         var cParts = c.split(' ');
         var contact = {
         name: c,
         email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
         image: 'http://lorempixel.com/50/50/people?' + index
         };
         contact._lowername = contact.name.toLowerCase();
         return contact;
         });

         */

      });
    };



    function loadMasterTasks() {

      // resource.user = {};
      task.GetTasks().then(function (response) {
        self.masterTasks = response.map(function(c,index){

          var item = c.ResTaskInfo;
          item.TaskId= c.TaskId;
          item._lowername= item.TaskName.toLowerCase();
          return item;

        });
      });

    };




    self.AssignTask = function(mastertask){

      //mastertask = JSON.parse(mastertask);
      ////att.Concurrency,att.RefInfo,att.OtherData


      var concurrencyObj = {};


      resource.AssignTaskToResource($routeParams.id,mastertask.TaskId,concurrencyObj).then(function (response) {

        //$route.reload();

      }, function (error) {
        alert(error);
      });


    }


    self.DeleteTask = function(mastertask){

     // mastertask = JSON.parse(mastertask);
      ////att.Concurrency,att.RefInfo,att.OtherData


      var concurrencyObj = {};


      resource.DeleteTaskToResource($routeParams.id,mastertask.TaskId,concurrencyObj).then(function (response) {



      }, function (error) {
        alert(error);
      });


    }











    loadResourceTasks();
    loadMasterTasks();

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }
})();
