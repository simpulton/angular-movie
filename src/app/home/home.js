angular.module('Movie.home', [])

.config(function($stateProvider) {
  $stateProvider
    .state('Movie.home', {
      url: '/',
      views: {
        'main@': {
          templateUrl: 'app/home/home.tpl.html',
          controller: 'HomeController',
          controllerAs: 'homeVm'
        }
      }
    });
});
