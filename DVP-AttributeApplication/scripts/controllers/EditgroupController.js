/**
 * Created by Pawan on 12/16/2015.
 */
/**
 * Created by Pawan on 12/14/2015.
 */
(function () {
  var app= angular.module("attributeapp");

  var EditgroupController = function ($scope,dbcontroller,commoncontroller,$location,$mdDialog) {

    var editObj;
    $scope.isDisabled = false;

    var self = this;
    $scope.GDataObj=dbcontroller.GroupObj;
    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.autocompleteDemoRequireMatch = true;
    self.transformChip = transformChip;
    self.autocompleteDemoRequireMatch = true;
    self.allAttributes = [];
    self.groupTasks = [];

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
      var results = query ? self.allAttributes.filter(createFilterFor(query)) : [];
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

        self.allAttributes = response.data.Result.map(function (c,index) {

          var item = c;
          console.log("ITM   "+JSON.stringify(c));

          item._lowerattribute = c.Attribute.toLowerCase();


          return item;
        });

      });

    };

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

    self.OnChipAdd = function($chip){
      //alert("Add " + $chip.TaskName);

      var Alist=[];
      Alist.push($chip.AttributeId);


      dbcontroller.AddAttributesToGroup(Alist,$scope.GDataObj.GroupId).then(function (res) {

      }, function () {

      });
      return $chip;


    }


    self.OnChipDelete = function($chip)
    {
      dbcontroller.RemoveAttributeFromGroup($chip.AttributeId,$scope.GDataObj.GroupId).then(function (res) {

      }, function () {

      });
    }

    loadAttributes();
    LoadCurrent($scope.GDataObj.GroupId);








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
        $location.path("/group");
      }
    }

    var onError = function (reason)
    {
      $scope.isDisabled = false;
      //$scope.error = reason;
      if (reason.data)
      {
        commoncontroller.showAlert("Error",reason.data.message);
      }
      else
      {
        commoncontroller.showAlert("Error",reason);
      }
      console.log(reason);
    }

    $scope.SaveUpdated = function(gid)
    {
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

      },editObj);





    }











  }
  app.controller("EditgroupController",EditgroupController
  );
}())
