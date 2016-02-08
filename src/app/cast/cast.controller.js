angular.module('Movie.cast')

.controller('CastController', function(movie, $sce) {
  var castVm = this;

  castVm.movie = movie;
  castVm.currentCast = 0;

  castVm.renderHtml = function(html) {
    return $sce.trustAsHtml(html);
  };
});
