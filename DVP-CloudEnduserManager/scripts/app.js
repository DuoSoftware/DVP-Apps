/**
 * Created by Pawan on 12/11/2015.
 */
(function() {
    console.log("hit app");
    var app = angular.module("clduserapp", ["ngRoute","ngMaterial","md.data.table"]);


    app.config(function($routeProvider) {
        $routeProvider.when("/endusers", {

            templateUrl: "new/enduser.html",
            controller: "EnduserController"
        })
            .when("/edituser/:id",{
                templateUrl: "new/edituser.html",
                controller: "EditUserController"
            })

            .when("/newuser",{
                templateUrl: "new/newuser.html",
                controller: "NewUserController"


            })
            .when("/contexts",{
                templateUrl: "new/context.html",
                controller: "ContextController"


            })
          /*
            .when("/newattrib",{
                templateUrl: "partials/new.html",
                controller: "NewController"


            })
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
