angular.module('Movie.trailer')

.controller('TrailerController', function(movie, $scope) {
  var trailerVm = this;

  trailerVm.movie = movie;

  $scope.$on('animation-done', function() {
    $scope.$apply(function() {
      trailerVm.showIframe = true;
    });
  });
});
