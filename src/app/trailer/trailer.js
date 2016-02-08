angular.module('Movie.trailer', [])

.config(function($stateProvider) {
  $stateProvider
    .state('Movie.trailer', {
      url: '/trailer',
      views: {
        'main@': {
          templateUrl: 'app/trailer/trailer.tpl.html',
          controller: 'TrailerController',
          controllerAs: 'trailerVm'
        }
      }
    });
});
