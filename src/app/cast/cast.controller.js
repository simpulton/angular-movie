function CastController($sce) {
  var castVm = this;

  castVm.$onInit = function () {
    castVm.currentCast = 0;
    castVm.renderHtml = renderHtml;
  };

  function renderHtml(html) {
    return $sce.trustAsHtml(html);
  }
}

angular.module('Movie.cast')
.controller('CastController', CastController);
