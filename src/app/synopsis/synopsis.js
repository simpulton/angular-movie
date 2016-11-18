var synopsisState = {
  parent: 'Movie',
  name: 'synopsis',
  url: '/synopsis',
  views: {
    'main@': 'synopsis'
  }
};

function config($stateProvider) {
  $stateProvider.state(synopsisState);
}

angular.module('Movie.synopsis', [])
.config(config);
