function HomeController(MovieService) {
  var homeVm = this;

  getMovie();

  function getMovie() {
    MovieService
      .fetch()
      .then(getResults);
  }

  function getResults(movie) {
    homeVm.movie = movie[0];
  }
}

angular.module('Movie.home')
.controller('HomeController', HomeController);
