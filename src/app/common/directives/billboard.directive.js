angular.module('Movie.directives.billboard', [])
.directive('billboard', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/common/templates/billboard.tpl.html',
    controller: function () {},
    controllerAs: 'billboardVm',
    scope: true,
    bindToController: {
      movie: '='
    }
  }
});