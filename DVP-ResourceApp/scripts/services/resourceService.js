var resourceModule = angular.module("resourceService", []);

resourceModule.factory("resource", function($http){


  var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';

  var getResources = function(){


    return $http({
      method: 'GET',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resources",
      headers: {
        'authorization': authToken
      }
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });

    /*return $http.get("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resources").then(function(response){


      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }


    });*/
  };


  var getResource = function(id){


    return $http({
      method: 'GET',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/" + id,
      headers: {
        'authorization': authToken
      }
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });


      /*return $http.get("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/" + id).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return {};
        }

      });*/

  };


  var deleteResource = function(id){


    return $http({
      method: 'DELETE',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/" + id,
      headers: {
        'authorization': authToken
      }
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });


    /*return $http.delete("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/" + id).then(function(response) {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });*/

  }


  var updateResource = function(resource){



    if(resource && resource.ResourceId)
    {
      return $http({
        method: 'PUT',
        url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/" + resource.ResourceId,
        headers: {
          'authorization': authToken
        },
        data:resource
      }).then(function(response)
      {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return {};
        }

      });
    }
      /*return $http.put("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/" + resource.ResourceId,resource).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return {};
        }

      });*/

  };


  var createResource = function(resource){

    return $http({
      method: 'POST',
      url:"http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource",
      headers: {
        'authorization': authToken
      },
      data:resource
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }

    });


      /*return $http.post("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource",resource).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }

      });*/

  };


  //att.Concurrency,att.RefInfo,att.OtherData

  var assignTaskToResource= function(resourceId, TaskId, taskInfo){



    return $http({
      method: 'POST',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/"+resourceId+"/Tasks/" + TaskId,
      headers: {
        'authorization': authToken
      },
      data:taskInfo
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });



      /*return $http.post("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/"+resourceId+"/Tasks/" + TaskId, taskInfo).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return {};
        }

      });*/


  };

  ///DVP/API/' + version + '/ResourceManager/Resource/Task/:TaskId

  var deleteTaskToResource= function(ResourceId, TaskId, taskInfo){


    return $http({
      method: 'DELETE',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/"+ResourceId+"/Task/" + TaskId,
      headers: {
        'authorization': authToken
      },
      data:taskInfo
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });


     /* return $http.delete("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/"+ResourceId+"/Task/" + TaskId).then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return {};
        }

      });*/


  };


  var getTasksAssignedToResource= function(resourceId){


    return $http({
      method: 'GET',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/"+resourceId+"/Tasks",
      headers: {
        'authorization': authToken
      }
    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });



    /*return $http.get("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/"+resourceId+"/Tasks").then(function(response) {
        if(response.data && response.data.IsSuccess) {

          return response.data.Result;


        }else{

          return {};
        }

      });*/


  };




  var updateTasksAssignedToResource= function(resourceID, resourceTask){

    return $http({
      method: 'PUT',
      url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/"+resourceID+"/Tasks/"+resourceTask.TaskId,
      headers: {
        'authorization': authToken
      },
      data:resourceTask

    }).then(function(response)
    {
      if(response.data && response.data.IsSuccess) {

        return response.data.Result;


      }else{

        return {};
      }

    });


    /*return $http.put("http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Resource/"+resourceID+"/Tasks/"+resourceTask.TaskId,resourceTask).then(function(response) {
      if(response.data && response.data.IsSuccess) {


        return response.data.Result;


      }else{

        return {};
      }

    });*/


  };




  return{

    GetResources : getResources,
    GetResource: getResource,
    UpdateResource: updateResource,
    CreateResource: createResource,
    DeleteResource: deleteResource,
    AssignTaskToResource: assignTaskToResource,
    GetTasksAssignedToResource: getTasksAssignedToResource,
    DeleteTaskToResource: deleteTaskToResource,
    UpdateTasksAssignedToResource: updateTasksAssignedToResource,
    User: {}

  }


});
