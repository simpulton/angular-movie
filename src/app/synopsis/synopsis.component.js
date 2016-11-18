var synopsis = {
  bindings: {
    movie: '<'
  },
  selector: 'synopsis',
  controller: 'SynopsisController',
  controllerAs: 'synopsisVm',
  templateUrl: 'app/synopsis/synopsis.html'
};

angular.module('Movie.synopsis')
.component('synopsis', synopsis);
