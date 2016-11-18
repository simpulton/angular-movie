function TrailerController($scope) {
  var trailerVm = this;

  $scope.$on('animation-done', showIframe);

  function showIframe() {
    $scope.$apply(function() {
      trailerVm.showIframe = true;
    });
  }
}

angular.module('Movie.trailer')
.controller('TrailerController', TrailerController);
