/**
 * Created by Pawan on 12/22/2015.
 */
(function () {

  var app =   angular.module("attributeapp");

  var MapTestController = function (dbcontroller,$scope,$location,commoncontroller,$timeout, $q) {
    $scope.isDisabled = false;
    var self = this;
    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.selectedAttributes=[];
    self.Attributes;
    self.autocompleteDemoRequireMatch = true;
    self.transformChip = transformChip;

    self.LoadAttribList=[];
    self.SaveIDList=[];
    self.autocompleteDemoRequireMatch = true;
    $scope.DataObj=dbcontroller.GroupObj;

    self.currentAttribs=[];
    self.tempCAttribs=[];

    self.readonly = false;



    ////////////////////////////////////////////


    self.resourceTasks;
    self.masterTasks;




    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    function querySearch (query) {
      var results = query ? self.masterTasks.filter(createFilterFor(query)) : [];
      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(Attributes) {
        return (Attributes._lowerattribute.indexOf(lowercaseQuery) === 0);
      };
    }

    function loadAttributes() {


      dbcontroller.getAttributeList().then(function (response) {

        console.log(response.data.Result);

        //var ResArray = response.data.Result.slice();

        self.masterTasks = response.data.Result.map(function (c,index) {

          var item = c;
          console.log("ITM   "+JSON.stringify(c));

          item._lowerattribute = c.Attribute.toLowerCase();


          return item;
        });

      });

    }


    self.SaveData=  function(GID)
    {
      $scope.isDisabled = true;
      var content= "Do you want to Save changes ? ";
      var title = "Attribute assigning."
      commoncontroller.showConfirm(title,"Save","Save","Cancel",content,function(obj){

        console.log("Saving Data "+JSON.stringify(self.selectedAttributes));

        var idList=[];

        for(i=0;i<self.selectedAttributes.length;i++)
        {
          console.log("i = "+i);
          console.log("length = "+self.selectedAttributes.length);

          idList.push(self.selectedAttributes[i].AttributeId);

          if((self.selectedAttributes.length-1)==i)
          {
            console.log("done");
            dbcontroller.AddAttributesToGroup(idList,GID).then(onMapingSucceeded,onError);
          }


        }


      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },null);


    }

    var onError = function(reason)
    {
      $scope.error=reason;
      console.log(reason);
    }

    var onMapingSucceeded = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        console.log("Attributes added to group "+JSON.stringify(response.data.Result));
        $location.path("/group");
      }



    }

    /* var LoadCurrent = function (AID) {

     dbcontroller.GetAttributesOfGroup(AID).then(function (response) {

     var curArray = response.data.Result.slice();

     self.currentAttribs = curArray.map(function (data) {

     var obj = JSON.parse(JSON.stringify(data));

     //obj._lowerattribute = data.currentAttribs.toLowerCase();
     console.log(obj);
     return obj.ResAttribute.Attribute;
     });

     });

     };*/

    function LoadCurrent(AID) {

      dbcontroller.GetAttributesOfGroup(AID).then(function (response) {

        var tempArr=[];
        for( var i= 0,len=response.data.Result.ResAttributeGroups.length;i<len;i++)
        {
          tempArr.push(response.data.Result.ResAttributeGroups[i].ResAttribute);

          if(i==len-1 )
          {
            // $scope.attribData=tempArr;

            self.resourceTasks = tempArr.map(function(c,index){

              var item = JSON.parse(JSON.stringify(c));
              item._lowerattribute = c.Attribute.toLowerCase();
              return item;


            });






          }
        }






      });
    };


    self.OnChipAdd = function($chip){
      //alert("Add " + $chip.TaskName);

      var Alist=[];
      Alist.push($chip.AttributeId);


      dbcontroller.AddAttributesToGroup(Alist,10).then(function (res) {

      }, function () {

      });
      return $chip;


    }


    self.OnChipDelete = function($chip)
    {
      dbcontroller.RemoveAttributeFromGroup($chip.AttributeId,10).then(function (res) {

      }, function () {

      });
    }



    loadAttributes();
    LoadCurrent(10);



  }

  app.controller("MapTestController",MapTestController);

}());
