/**
 * Created by Pawan on 12/22/2015.
 */
(function () {

    var app =   angular.module("attributeapp");

    var MapController = function (dbcontroller,$scope,$location,$timeout, $q) {

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

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(Attributes) {
                return (Attributes._lowerattribute.indexOf(lowercaseQuery) === 0);
            };
        }

        function loadAttributes() {


            dbcontroller.getAttributeList().then(function (response) {

                console.log(response.Result);

                var ResArray = response.Result.slice();

                self.Attributes = ResArray.map(function (data) {

                    var obj = JSON.parse(JSON.stringify(data));

                    obj._lowerattribute = data.Attribute.toLowerCase();
                    return obj;
                });

            });

        }


        self.SaveData=  function(GID)
        {
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

        }

        var onError = function(data)
        {
            $scope.error=data.Exception;
            console.log(data.Exception);
        }

        var onMapingSucceeded = function (data) {

            console.log("Attributes added to group "+JSON.stringify(data.data.Result));
            $location.path("/group");
        }

        loadAttributes();

    }

    app.controller("MapController",MapController);

}());