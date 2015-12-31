/**
 * Created by Pawan on 12/21/2015.
 */
(function () {
    var app =   angular.module("attributeapp");

    var MapTestController = function (dbcontroller,$scope,$location) {

        var self = this;

        self.autocompleteDemoRequireMatch = true;
        self.transformChip = transformChip;
        self.selectedItem = null;
        self.searchText = null;
        self.querySearch = querySearch;



        self.NewList=[];
        self.LoadAttribList=[];
        self.SaveIDList=[];
        self.AttribName=[];


        function transformChip(chip) {

            if (angular.isObject(chip)) {
                return chip;
            }
            return { name: chip, type: 'new' }
        }

        function querySearch (query) {
            console.log("querySearch "+query);
            var results = query ? self.AttribName.filter(createFilterFor(query)) : [];
            return results;
        }


        function createFilterFor(query) {
            console.log("createFilterFor "+query);
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(task) {
                return (task._lowername.indexOf(lowercaseQuery) === 0) ;
            };
        }

        self.getSelectedChipIndex = function(event) {
            var selectedChip = angular.element(event.currentTarget).controller('mdChips').selectedChip;
            //alert(selectedChip);
        }



        function loadResourceTasks() {
            dbcontroller.getAttributeList().then(function (response)

            {
                return
                self.resourceTasks = response.Result.map(function(c,index){

                    var item = c.ResTask.ResTaskInfo;
                    item.TaskId= c.ResTask.TaskId;
                    item._lowername= item.TaskName.toLowerCase();
                    return item;

                });


            });
        };












        $scope.DataObj=dbcontroller.GroupObj;


        var onAttributeComplete = function (data) {

            self.AttributeList=data.Result;
            console.log("Attribute result "+JSON.stringify(self.AttributeList));


            for(i=0;i<self.AttributeList.length;i++)
            {
                self.LoadAttribList[self.AttributeList[i].Attribute]= self.AttributeList[i];
                self.AttribName.push(self.AttributeList[i].Attribute);
                if(i==(self.AttributeList.length)-1)
                {
                    console.log("Loaded AttributeList "+JSON.stringify(self.LoadAttribList));
                }
            }


        }
        var onError = function(data)
        {
            $scope.error=data.Exception;
            console.log(data.Exception);
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
                /*else
                 {
                 console.log("nop");
                 continue;
                 }*/


            }

        }

        var onMapingSucceeded = function (data) {

            console.log("Attributes added to group "+JSON.stringify(data.data.Result));
            $location.path("/group");
        }

    }

    app.controller("MapTestController",MapTestController);

}());