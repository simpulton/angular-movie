var synopsis = {
  selector: 'synopsis',
  controller: 'SynopsisController',
  controllerAs: 'synopsisVm',
  templateUrl: 'app/synopsis/synopsis.tpl.html'
};

angular.module('Movie.synopsis')
.component('synopsis', synopsis);
