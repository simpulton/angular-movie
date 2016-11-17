var synopsis = {
  selector: 'synopsis',
  controller: 'SynopsisController',
  controllerAs: 'synopsisVm',
  templateUrl: 'app/synopsis/synopsis.html'
};

angular.module('Movie.synopsis')
.component('synopsis', synopsis);
