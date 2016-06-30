function CastController(MovieService, $sce) {
  var castVm = this;

  castVm.currentCast = 0;
  castVm.renderHtml = renderHtml;

  getMovie();

  function getMovie() {
    MovieService
      .fetch()
      .then(getResults);
  }

  function getResults(movie) {
    castVm.movie = movie[0];
  }

  function renderHtml(html) {
    return $sce.trustAsHtml(html);
  }
}

angular.module('Movie.cast')
.controller('CastController', CastController);
