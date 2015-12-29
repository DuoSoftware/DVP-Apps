/**
 * Created by Pawan on 12/11/2015.
 */
(function() {
    console.log("hit app");
    var app = angular.module("attributeapp", ["ngRoute","ngMaterial"]);


    app.config(function($routeProvider) {
        $routeProvider.when("/main", {

            templateUrl: "main.html",
            controller: "MainController"
        })
            .when("/attribute",{
                templateUrl: "attribute.html",
                controller: "AttributeController"
            })
            .when("/viewattrib",{
                templateUrl: "view.html",
                controller: "ViewController"


            })
            .when("/editattrib",{
                templateUrl: "edit.html",
                controller: "EditController"


            })
            .when("/newattrib",{
                templateUrl: "new.html",
                controller: "NewController"


            })
            .when("/group",{
                templateUrl: "group.html",
                controller: "GroupController"
            })
            .when("/viewgroup",{
                templateUrl: "viewgroup.html",
                controller: "ViewgroupController"


            })
            .when("/editgroup",{
                templateUrl: "editgroup.html",
                controller: "EditgroupController"


            })
            .when("/newgroup",{
                templateUrl: "newgroup.html",
                controller: "NewgroupController"


            })
            .when("/map",{
                templateUrl: "assignattributestogroup.html",
                controller: "MapController"


            })
            .when("/testa",{
                templateUrl: "testaz.html",
                controller: "MapTestController"


            })
            .otherwise({
                redirectTo: "/main"
            });
    });


}());