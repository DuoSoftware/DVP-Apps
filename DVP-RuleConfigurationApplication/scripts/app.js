/**
 * Created by Pawan on 12/11/2015.
 */
(function() {
    console.log("hit app");
    var app = angular.module("ruleapp", ["ngRoute","ngMaterial","md.data.table"]);


    app.config(function($routeProvider) {
        $routeProvider
          .when("/rules",{
            templateUrl: "partials/new/rules.html",
            controller: "RuleController"


          })
          .when("/newrule/:direction",{
            templateUrl: "partials/new/newrule.html",
            controller: "NewRuleController"


          })
          .when("/editrule/:id",{
            templateUrl: "partials/new/editrule.html",
            controller: "EditRuleController"


          }).
          when("/translations",{
            templateUrl: "partials/new/translations.html",
            controller: "TranslationController"


          }).
          when("/newtranslation",{
            templateUrl: "partials/new/newtranslation.html",
            controller: "NewTranslationController"


          })

            .otherwise({
                redirectTo: "/rules"
            });
    });


}());
