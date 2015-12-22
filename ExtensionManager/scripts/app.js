/**
 * Created by dinusha on 12/18/2015.
 */

(function(){
    var app = angular.module("extensionApp", ["ngMaterial", "ngRoute"]);

    app.config(function($routeProvider)
    {
        $routeProvider
            .when("/ExtManager",
            {
                templateUrl: "ExtManager.html",
                controller: "ExtManagerController"
            })
            .otherwise({redirectTo:"/ExtManager"})

    })
}());
