angular.module('Movie.directives.back', [])

.directive('back', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/common/templates/back-button.tpl.html'
  }
});
