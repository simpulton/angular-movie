angular.module('Movie.synopsis', [])

.config(function($stateProvider) {
  $stateProvider
    .state('Movie.synopsis', {
      url: '/synopsis',
      views: {
        'main@': {
          templateUrl: 'app/synopsis/synopsis.tpl.html',
          controller: 'SynopsisController',
          controllerAs: 'synopsisVm'
        }
      }
    });
});
