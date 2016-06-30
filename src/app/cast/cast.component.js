var cast = {
  selector: 'cast',
  controller: 'CastController',
  controllerAs: 'castVm',
  templateUrl: 'app/cast/cast.tpl.html'
};

angular.module('Movie.cast')
.component('cast', cast);
