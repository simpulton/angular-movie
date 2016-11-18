var movieState = {
  name: 'Movie',
  resolve: {
    movie: function(MovieService) {
      return MovieService.fetch()
        .then(function(response) {
          return response[0];
        });
    },
    loaded: function(PreloadService, movie, $rootScope) {
      return PreloadService.loadManifest(movie)
        .then(function(response) {
          $rootScope.$broadcast('loaded', movie);
          return response;
        }, function(error) {
          console.error(error);
        });
    }
  }
};

function config($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
  $stateProvider.state(movieState);

  $urlRouterProvider.otherwise('/');

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads
    'self',
    // Allow loading from wistia
    'https://fast.wistia.net/**'
  ]);
}

function run($transitions, AnimationsService) {
  $transitions.onStart({}, setUpAnimationsService);

  function setUpAnimationsService($transition$) {
    var fromState = $transition$.$from(),
      toState = $transition$.$to();

    // State handling for animations
    // Set Default from state to "home"
    fromState = (fromState.name) ? fromState : {
      name: "home"
    };

    var tState = toState.name.split('.'),
      fState = fromState.name.split('.'),
      lastIndex = tState.length - 1,
      fLastIndex = fState.length - 1;

    var tostate = tState[lastIndex];
    var fromstate = fState[fLastIndex];

    var currentAnimation = "from-" + fromstate + "-to-" + tostate;

    AnimationsService.setCurrentAnimation(currentAnimation);
  }
}

angular.module('Movie', [
  'ui.router',
  'ngAudio',
  'Movie.animations',
  'Movie.synopsis',
  'Movie.home',
  'Movie.cast',
  'Movie.gallery',
  'Movie.trailer',
  'Movie.services.movie',
  'Movie.components.billboard',
  'Movie.components.back',
  'Movie.directives.nav',
  'Movie.services.preload',
  'Movie.services.animations'
])
.config(config)
.run(run)
.constant('ENDPOINT_URI', 'app/data');
