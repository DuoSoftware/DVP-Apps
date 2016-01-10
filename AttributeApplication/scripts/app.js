/**
 * Created by Pawan on 12/11/2015.
 */
(function() {
    console.log("hit app");
    var app = angular.module("attributeapp", ["ngRoute","ngMaterial","md.data.table"]);


    app.config(function($routeProvider) {
        $routeProvider.when("/attribute", {

            templateUrl: "partials/main.html",
            controller: "MainController"
        })
            .when("/attribute",{
                templateUrl: "partials/attribute.html",
                controller: "AttributeController"
            })
            .when("/viewattrib",{
                templateUrl: "partials/view.html",
                controller: "ViewController"


            })
            .when("/editattrib",{
                templateUrl: "partials/edit.html",
                controller: "EditController"


            })
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


            })
            .otherwise({
                redirectTo: "/attribute"
            });
    });


}());
