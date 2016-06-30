function TrailerController(MovieService, $scope) {
  var trailerVm = this;

  trailverVm.$onInit = function () {
    getMovie();
  };

  $scope.$on('animation-done', showIframe);

  function getMovie() {
    MovieService
      .fetch()
      .then(getResults);
  }

  function getResults(movie) {
    trailerVm.movie = movie[0];
  }

  function showIframe() {
    $scope.$apply(function() {
      trailerVm.showIframe = true;
    });
  }
}

angular.module('Movie.trailer')
.controller('TrailerController', TrailerController);
