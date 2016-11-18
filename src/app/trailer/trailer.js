var trailerState = {
  parent: 'Movie',
  name: 'trailer',
  url: '/trailer',
  views: {
    'main@': 'trailer'
  }
};

function config($stateProvider) {
  $stateProvider.state(trailerState);
}

angular.module('Movie.trailer', [])
.config(config);
