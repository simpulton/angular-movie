var trailer = {
  selector: 'trailer',
  controller: 'TrailerController',
  controllerAs: 'trailerVm',
  templateUrl: 'app/trailer/trailer.tpl.html'
};

angular.module('Movie.trailer')
.component('trailer', trailer);
