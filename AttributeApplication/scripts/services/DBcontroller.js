/**
 * Created by Pawan on 12/11/2015.
 */
(function () {

var Attribobj;
    var GroupObj;
    var GID;
    var GIDst = false;

    var dbcontroller = function ($http) {

        var getAttributeList = function () {
            return $http.get("http://localhost:8831/DVP/API/6.0/ResourceManager/Attributes")
                .then(function (response) {
                    return response.data;
                });
        };

        var attribDelete = function (Attribute) {

            return $http.delete("http://localhost:8831/DVP/API/6.0/ResourceManager/Attribute/"+Attribute.AttributeId)
                .then(function (response) {

                    return Attribute.AttributeId;
                });

        };

        var updateAttribute = function (AID, Attribute,OtherData) {

            var data ={
                OtherData:OtherData,
                AttributeId:AID,
                Attribute:Attribute,
                AttClass:"clz",
                AttType:"typ",
                AttCategory:"cat"



            }
            return $http.put("http://localhost:8831/DVP/API/6.0/ResourceManager/Attribute/"+AID,data)
                .then(function (response) {

                    return response;
                });
        }


        var NewAttribute = function(Attribute,OtherData)
        {
            var data ={
                OtherData:OtherData,
                Attribute:Attribute,
                AttClass:"clz",
                AttType:"typ",
                AttCategory:"cat"



            }
            return $http.post("http://localhost:8831/DVP/API/6.0/ResourceManager/Attribute",data)
                .then(function (response) {

                    return response;
                });
        }

        var getGroupList = function () {
            return $http.get("http://localhost:8831/DVP/API/6.0/ResourceManager/Groups")
                .then(function (response) {
                    return response.data;
                });
        };

        var updateGroup = function (GID, GroupName,OtherData,Percentage) {

            var data = {
                OtherData: OtherData,
                GroupId: GID,
                GroupName: GroupName,
                GroupClass: "clz",
                GroupType: "typ",
                GroupCategory: "cat",
                Percentage: Percentage


            }
            return $http.put("http://localhost:8831/DVP/API/6.0/ResourceManager/Group/" + GID, data)
                .then(function (response) {

                    return response;
                });
        };
        var groupDelete = function (group) {

            return $http.delete("http://localhost:8831/DVP/API/6.0/ResourceManager/Group/"+group.GroupId)
                .then(function (response) {

                    return group.GroupId;
                });

        };

        var NewGroup = function(GroupName,OtherData,Percentage)
        {
            var data ={
                OtherData:OtherData,
                GroupName:GroupName,
                GroupClass: "clz",
                GroupType: "typ",
                GroupCategory: "cat",
                Percentage:Percentage



            }
            return $http.post("http://localhost:8831/DVP/API/6.0/ResourceManager/Group",data)
                .then(function (response) {

                    return response;
                });
        }

        var AddAttributesToGroup = function(AttributeIds,GID){

            var data ={
                OtherData:"Temp",
                AttributeIds:AttributeIds


            }
            return $http.put("http://localhost:8831/DVP/API/6.0/ResourceManager/Group/"+GID+"/Attribute",data)
                .then(function (response) {

                    return response;
                });

        }

        var GetAttributesOfGroup = function (GrpID) {


            return $http.get("http://localhost:8831/DVP/API/6.0/ResourceManager/Group/"+GrpID+"/Attribute")
                .then(function (response) {
                    return response.data;
                });

        }



        return{
            getAttributeList:getAttributeList,
            attribDelete:attribDelete,
            Attribobj:Attribobj,
            updateAttribute:updateAttribute,
            NewAttribute:NewAttribute,
            getGroupList:getGroupList,
            GroupObj:GroupObj,
            updateGroup:updateGroup,
            groupDelete:groupDelete,
            NewGroup:NewGroup,
            AddAttributesToGroup:AddAttributesToGroup,
            GID:GID,
            GetAttributesOfGroup:GetAttributesOfGroup,
            GIDst:GIDst

    };
    };

    var module = angular.module("attributeapp");
    module.factory("dbcontroller",dbcontroller);
}());


