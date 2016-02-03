/**
 * Created by Pawan on 12/11/2015.
 */
(function() {
    console.log("hit app");
    var app = angular.module("pabxconfigapp", ["ngRoute","ngMaterial","md.data.table"]);


    app.config(function($routeProvider) {
        $routeProvider.when("/pabxconfig", {

            templateUrl: "partials/pabxconfig.html"
        })
          .otherwise({
                redirectTo: "/pabxconfig"
            });
    });


}());
