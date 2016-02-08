angular.module('Movie.synopsis')

.controller('SynopsisController', function(movie, $sce) {
  var synopsisVm = this;

  synopsisVm.movie = movie;

  synopsisVm.renderHtml = function(html) {
    return $sce.trustAsHtml(html);
  }
});
