function SynopsisController($sce) {
  this.renderHtml = renderHtml;

  function renderHtml(html) {
    return $sce.trustAsHtml(html);
  }
}

angular.module('Movie.synopsis')
.controller('SynopsisController', SynopsisController);
