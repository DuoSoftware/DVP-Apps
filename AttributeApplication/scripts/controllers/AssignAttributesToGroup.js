/**
 * Created by Pawan on 12/22/2015.
 */
(function () {

  var app =   angular.module("attributeapp");


  var MapController = function (dbcontroller,$scope,$location,commoncontroller,$timeout, $q,$mdDialog,$route) {
    $scope.isDisabled = false;
    var self = this;
    $scope.editObj={};
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


///////////////////////////////////////////

   // self.resourceTasks;
    self.allAttributes = [];
    self.groupTasks = [];
    //self.masterTasks;

    $scope.DataObj=dbcontroller.GroupObj;
    $scope.editObj.GroupName=$scope.DataObj.GroupName;
    $scope.editObj.OtherData=$scope.DataObj.OtherData;
    $scope.editObj.GroupClass=$scope.DataObj.GroupClass;
    $scope.editObj.GroupType=$scope.DataObj.GroupType;
    $scope.editObj.GroupCategory=$scope.DataObj.GroupCategory;
    $scope.editObj.Percentage=$scope.DataObj.Percentage;


    function transformChip(chip) {
      // If it is an object, it's already a known chip

      if (angular.isObject(chip)) {
        console.log("Already a chip");
        return chip;
      }
      // Otherwise, create a new one
      console.log("new chip");
      return { name: chip, type: 'new' }
    }

    function querySearch (query) {
      var results = query ? self.allAttributes .filter(createFilterFor(query)) : [];
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

        self.allAttributes  = response.data.Result.map(function (c,index) {

          var item = c;
          console.log("ITM   "+JSON.stringify(c));

          item._lowerattribute = c.Attribute.toLowerCase();


          return item;
        });

      });

    }

    function LoadCurrent(AID) {

      dbcontroller.GetAttributesOfGroup(AID).then(function (response) {

        var tempArr=[];
        for( var i= 0,len=response.data.Result.ResAttributeGroups.length;i<len;i++)
        {
          tempArr.push(response.data.Result.ResAttributeGroups[i].ResAttribute);

          if(i==len-1 )
          {
            // $scope.attribData=tempArr;

            self.groupTasks = tempArr.map(function(c,index){

              var item = JSON.parse(JSON.stringify(c));
              item._lowerattribute = c.Attribute.toLowerCase();
              return item;


            });






          }
        }






      });
    };




    var onError = function(reason)
    {
      $scope.error=reason;
      commoncontroller.showAlert("Error",reason);
      //$mdDialog.hide();
      console.log(reason);
    }



    self.OnChipAdd = function($chip){
      //alert("Add " + $chip.TaskName);

      var Alist=[];
      Alist.push($chip.AttributeId);


      dbcontroller.AddAttributesToGroup(Alist,$scope.DataObj.GroupId).then(function (res) {

      }, function () {

      });
      return $chip;


    }


    self.OnChipDelete = function($chip)
    {
      dbcontroller.RemoveAttributeFromGroup($chip.AttributeId,$scope.DataObj.GroupId).then(function (res) {

      }, function () {

      });
    }




    loadAttributes();
    LoadCurrent($scope.DataObj.GroupId);


    var onUpdateComplete = function(response)
    {
      console.log(response.data.Exception);
      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        $scope.isDisabled = false;
        console.log(response);
        commoncontroller.showAlert("SUCCESS","Group updated Successfully !");
        //$mdDialog.hide();
        $location.path("/group");
      }
    }

    var onError = function (reason)
    {
      $scope.isDisabled = false;
      $scope.error = reason;
      commoncontroller.showAlert("ERROR",reason);
      console.log(reason);
    }

    $scope.SaveUpdated = function(gid)
    {
      console.log("GID   "+gid);
      console.log(JSON.stringify($scope.editObj));
      $scope.isDisabled = true;
      $scope.editObj.GroupId=gid;
      var content= "Do you want to Save changes ? ";
      var title="Update group details ";
      console.log(content) ;
      commoncontroller.showConfirm(title,"Save","Save","Cancel",content,function(obj){

        dbcontroller.updateGroup($scope.editObj).then(onUpdateComplete,onError);


      }, function(){

        //$scope.showAlert("title","lable","ok","content");
        $scope.isDisabled = false;

      },$scope.editObj);





    }

    $scope.hideDialog = function()
    {

      $location.path("/group");

    }


    var onMapingSucceeded = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        alert("kkkk");
        console.log("Attributes added to group "+JSON.stringify(response.data.Result));

        $location.path("/group");
      }



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




  }

  app.controller("MapController",MapController);

}());
