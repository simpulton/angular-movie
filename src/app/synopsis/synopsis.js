function config($stateProvider) {
  $stateProvider
    .state('Movie.synopsis', {
      url: '/synopsis',
      views: {
        'main@': {
          template: '<synopsis></synopsis>'
        }
      }
    });
}

angular.module('Movie.synopsis', [])
.config(config);
