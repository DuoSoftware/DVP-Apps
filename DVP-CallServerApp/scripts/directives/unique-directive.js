/**
 * Created by a on 12/11/2015.
 */


angular.module("ClusterManageApp").directive("ngUnique", function(clusterService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      element.bind('blur', function (e) {
        if (!ngModel || !element.val()) return;
        var keyProperty = scope.$eval(attrs.ngUnique);
        var currentValue = element.val();
        clusterService.checkUniqueValue(keyProperty.key, keyProperty.property, currentValue)
          .then(function (unique) {
            //Ensure value that being checked hasn't changed
            //since the Ajax call was made
            if (currentValue == element.val()) {
              console.log('unique = '+unique);
              ngModel.$setValidity('unique', unique);
              scope.$broadcast('show-errors-check-validity');
            }
          });
      });
    }
  }
});
