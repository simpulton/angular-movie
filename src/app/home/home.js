function config($stateProvider) {
  $stateProvider
    .state('Movie.home', {
      url: '/',
      views: {
        'main@': {
          template: '<home></home>'
        }
      }
    });
}

angular.module('Movie.home', [])
.config(config);
