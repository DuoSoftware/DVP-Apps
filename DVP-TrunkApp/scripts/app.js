/**
 * Created by Achintha on 12/29/2015.
 */
(function () {
    console.log("hit app");
    var app= angular.module("trunkApp", ["ngRoute","ngMaterial","ngMessages"]);
    app.config(function($routeProvider){
        $routeProvider

          .when("/trunk",{
            templateUrl:"partials/trunk.html",
            controller:"TrunkController"
          })
          .when("/phoneNumber",{
            templateUrl:"partials/phoneNumber.html",
            controller:"PhoneNumberController"
          })

            .when("/main",{
            templateUrl: "partials/main.html",
            controller: "MainController"
            })
            .when("/view",{
                templateUrl: "view.html",
                controller: "ViewController"
            })
            .when("/apps",{
                templateUrl: "partials/reloadApps.html",
                controller: "ReloadAppsController"
            })

            .when("/trunk/:id/edit",{
                templateUrl:"partials/editTrunk.html",
                controller: "EditTrunkController"
            })
            .when("/new",{
                templateUrl:"partials/newTrunk.html",
            //templateUrl:"partials/test.html",
                controller: "NewTrunkController"
            })

          .when("/delete",{
            templateUrl:"partials/deleteTrunk.html",
            //templateUrl:"partials/test.html",
            controller: "DeleteTrunkController"
          })
          .when("/phoneNumber",{
            templateUrl:"partials/phoneNumber.html",
            //templateUrl:"partials/test.html",
            controller: "PhoneNumberController"
          })

          .when("/newNumber",{
            templateUrl:"partials/newPhoneNumber.html",
            //templateUrl:"partials/test.html",
            controller: "NewPhoneNumberController"
          })
          .when("/phoneNumber/:PhoneNumber/edit",{
            templateUrl:"partials/editPhoneNumber.html",
            //templateUrl:"partials/test.html",
            controller: "EditPhoneNumberController"
          })

          .otherwise({
                redirectTo: "/trunk"
            });

    });
}())
