/**
 * Created by Achintha on 12/29/2015.
 */
(function () {
    console.log("hit app");
    var app= angular.module("applicationDeveloperApp", ["ngRoute","ngMaterial","ngMessages"]);
    app.config(function($routeProvider){
        $routeProvider
            .when("/main",{
            templateUrl: "partials/main.html",
            controller: "MainController"
            })
            .when("/view",{
                templateUrl: "view.html",
                controller: "ViewController"
            })
            .when("/apps",{
                templateUrl: "partials/apps.html",
                controller: "AppsController"
            })
            .when("/edit",{
                templateUrl:"partials/editApp.html",
                controller: "EditAppController"
            })
            .when("/new",{
                templateUrl:"partials/newApplication.html",
            //templateUrl:"partials/test.html",
                controller: "NewApplicationController"
            })

            .when("/viewDeactApp",{
                templateUrl:"partials/viewDeactivatedAppDetails.html",
                controller: "ViewDeactivatedAppDetailsController"
            })
            .when("/app/:id/edit",{


            templateUrl:"partials/editApp.html",
            controller: "EditAppController"
          })

              .otherwise({
                redirectTo: "/main"
            });

    });
}())
