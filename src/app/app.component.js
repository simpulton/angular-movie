var app = {
  selector: 'app',
  controller: 'MainController',
  controllerAs: 'mainVm',
  templateUrl: 'app/app.html'
};

angular.module('Movie')
.component('app', app);
