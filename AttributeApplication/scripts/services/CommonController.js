/**
 * Created by Pawan on 1/4/2016.
 */
/**
 * Created by Pawan on 12/11/2015.
 */
(function () {

  var commoncontroller = function ($http,$mdDialog,$mdMedia) {


    var showConfirm = function(title, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

      var confirm = $mdDialog.confirm()
        .title(title)
        .textContent(content)
        .ok(okbutton)
        .cancel(cancelbutton);
      $mdDialog.show(confirm).then(function() {
        OkCallback();
      }, function() {
        CancelCallBack();
      });
    };



    return{

      showConfirm:showConfirm

    };
  };

  var module = angular.module("attributeapp");
  module.factory("commoncontroller",commoncontroller);
}());


