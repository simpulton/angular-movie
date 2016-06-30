function config($stateProvider) {
  $stateProvider
    .state('Movie.trailer', {
      url: '/trailer',
      views: {
        'main@': {
          template: '<trailer></trailer>'
        }
      }
    });
}

angular.module('Movie.trailer', [])
.config(config);
