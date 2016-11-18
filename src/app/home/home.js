var homeState = {
  parent: 'Movie',
  name: 'home',
  url: '/',
  views: {
    'main@': 'home'
  }
};

function config($stateProvider) {
  $stateProvider.state(homeState);
}

angular.module('Movie.home', [])
.config(config);
