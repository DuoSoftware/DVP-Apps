/**
 * Created by dinusha on 1/18/2016.
 */
(function() {
  var app = angular.module("userManagementApp");

  app.directive("extcheck", function($q, $http)
  {

    var validateExtension = function(ext)
    {
      return $http({
        method: 'GET',
        url: 'http://localhost:8086/DVP/API/6.0/SipUser/Extension/' + ext,
        headers: {
          'authorization': 'hhhh'
        }
      }).then(function (resp) {
        return resp.data;
      })
    };

    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.extcheck = function(modelValue) {
          var defer = $q.defer();
          if(scope.IsEdit)
          {
            defer.resolve();
          }
          else
          {
            validateExtension(modelValue).then(function(data){
                if (data.IsSuccess)
                {
                  if(data.Result)
                  {
                    defer.reject();
                  }
                  else
                  {
                    defer.resolve();
                  }
                }
                else
                {
                  defer.reject();
                }},
              function(err)
              {
                defer.reject();
              })
          }


          return defer.promise;
        }
      }
    };
  });

  app.directive("usernamecheck", function($q, $http)
  {

    var validateUsername = function(usr)
    {
      return $http({
        method: 'GET',
        url: 'http://localhost:8086/DVP/API/6.0/SipUser/User/' + usr,
        headers: {
          'authorization': 'hhhh'
        }
      }).then(function (resp) {
        return resp.data;
      })
    };

    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.usernamecheck = function(modelValue) {
          var defer = $q.defer();
          validateUsername(modelValue).then(function(data){
            if(scope.IsEdit)
            {
              defer.resolve();
            }
            else
            {
              if (data.IsSuccess)
              {
                if (data.Result)
                {
                  defer.reject();
                }
                else
                {
                  defer.resolve();
                }
              }
              else
              {
                defer.reject();
              }
            }},
            function(err)
            {
              defer.reject();
            });

          return defer.promise;
        }
      }
    };
  });

}())
