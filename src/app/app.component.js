var app = {
  selector: 'app',
  controller: 'MainController',
  controllerAs: 'mainVm',
  templateUrl: 'app/app.tpl.html'
};

angular.module('Movie')
.component('app', app);
