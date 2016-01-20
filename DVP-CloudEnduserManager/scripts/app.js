/**
 * Created by Pawan on 12/11/2015.
 */
(function() {
    console.log("hit app");
    var app = angular.module("clduserapp", ["ngRoute","ngMaterial","md.data.table"]);


    app.config(function($routeProvider) {
        $routeProvider.when("/endusers", {

            templateUrl: "partials/enduser.html",
            controller: "EnduserController"
        })
            .when("/edituser/:id",{
                templateUrl: "partials/edituser.html",
                controller: "EditUserController"
            })

            .when("/newuser",{
                templateUrl: "partials/newuser.html",
                controller: "NewUserController"


            })
            .when("/contexts",{
                templateUrl: "partials/context.html",
                controller: "ContextController"


            })

            .when("/newcontext",{
                templateUrl: "partials/newcontext.html",
                controller: "NewContextController"


            })
          .when("/editcontext/:context",{
            templateUrl: "partials/editcontext.html",
            controller: "EditContextController"


          })
          /*
            .when("/group",{
                templateUrl: "partials/group.html",
                controller: "GroupController"
            })
            .when("/viewgroup",{
                templateUrl: "partials/viewgroup.html",
                controller: "ViewgroupController"


            })
            .when("/editgroup",{
                templateUrl: "partials/assignattributestogroup.html",
                controller: "MapController"


            })
            .when("/newgroup",{
                templateUrl: "partials/newgroup.html",
                controller: "NewgroupController"


            })
            .when("/map",{
                templateUrl: "partials/assignattributestogroup.html",
                controller: "MapController"


            })
            .when("/testa",{
                templateUrl: "partials/main.html",
                controller: "MainController"


            })*/
            .otherwise({
                redirectTo: "/endusers"
            });
    });


}());
