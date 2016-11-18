var trailer = {
  bindings: {
    movie: '<'
  },
  selector: 'trailer',
  controller: 'TrailerController',
  controllerAs: 'trailerVm',
  templateUrl: 'app/trailer/trailer.html'
};

angular.module('Movie.trailer')
.component('trailer', trailer);
