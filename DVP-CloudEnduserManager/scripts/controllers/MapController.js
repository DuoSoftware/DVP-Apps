(function () {

  var app =   angular.module("attributeapp");

  var MapController = function (dbcontroller,$scope,$location,$timeout, $q) {

    var self = this;
    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.NewList=[];
    self.autocompleteDemoRequireMatch = true;
    self.transformChip = transformChip;

    self.LoadAttribList=[];
    self.SaveIDList=[];
    self.autocompleteDemoRequireMatch = true;
    $scope.DataObj=dbcontroller.GroupObj;



    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    function querySearch (query) {
      var results = query ? self.Attributes.filter(createFilterFor(query)) : [];
      return results;
    }







    var onAttributeComplete = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {
        self.AttributeList=response.Result;
        console.log("Attribute result "+JSON.stringify(self.AttributeList));


        for(i=0;i<self.AttributeList.length;i++)
        {
          self.LoadAttribList[self.AttributeList[i].Attribute]= self.AttributeList[i];
          if(i==(self.AttributeList.length)-1)
          {
            console.log("Loaded AttributeList "+JSON.stringify(self.LoadAttribList));
          }
        }
      }





    }
    var onError = function(reason)
    {
      $scope.error=reason;
      console.log(reason);
    }

    dbcontroller.getAttributeList().then(onAttributeComplete,onError);

    self.SaveData=  function(GID)
    {
      console.log("Saving Data "+JSON.stringify(self.NewList));




      for(i=0;i<self.NewList.length;i++)
      {
        console.log("i = "+i);
        console.log("length = "+self.NewList.length);

        if(self.LoadAttribList[self.NewList[i]])
        {
          console.log("go");
          self.SaveIDList.push(self.LoadAttribList[self.NewList[i]].AttributeId);

        }
        if((self.NewList.length-1)==i)
        {
          console.log("done");
          //console.log("Going to Save "+JSON.stringify(self.SaveIDList));
          dbcontroller.AddAttributesToGroup(self.SaveIDList,GID).then(onMapingSucceeded,onError);
        }



      }

    }

    var onMapingSucceeded = function (response) {

      if(response.data.Exception)
      {
        onError(response.data.Exception.Message);
      }
      else
      {

        console.log("Attributes added to group " + JSON.stringify(response.data.Result));
        $location.path("/group");
      }
    }

  }

  app.controller("MapController",MapController);

}());
