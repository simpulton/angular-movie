angular.module('Movie.home')

.controller('HomeController', function(movie) {
  var homeVm = this;

  homeVm.movie = movie;
});
