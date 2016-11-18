var home = {
  bindings: {
    movie: '<'
  },
  selector: 'home',
  controller: 'HomeController',
  controllerAs: 'homeVm',
  templateUrl: 'app/home/home.html'
};

angular.module('Movie.home')
.component('home', home);
