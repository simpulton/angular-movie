var currentSection = "";
var lastSection = "";
	
angular.module('Movie', [
	'ui.router',
  'ui.bootstrap',
	'Movie.home',
	'Movie.gallery',
	'Movie.synopsis',
	'Movie.cast',
	'Movie.trailer',
	'Movie.directives.nav',
	'Movie.directives.thumbnail',
  'Movie.directives.billboard',
	'Movie.services.preload',
	'Movie.services.movie',
  'Movie.animations'
])
.constant('ENDPOINT_URI', 'app/data/movie.json')
.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

	$stateProvider
		.state('Movie', {
      resolve: {
        movie: function(MovieService) {
          return MovieService.getMovie()
            .then(function(response) {
              return response.data[0];
            });
        }
      },
      abstract: true,
			url: ''
		});

	$urlRouterProvider.otherwise("/");

	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads
		'self',
		// Allow loading from youtube
		'https://www.youtube.com/**'
	]);

})
.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      // State handling for animations

      // Set Default from state to "home"
      fromState = (fromState.name) ? fromState : {name: "home"};

      var tState = toState.name.split('.'),
          fState = fromState.name.split('.'),
          lastIndex = tState.length - 1,
          fLastIndex = fState.length - 1;

      var tostate = tState[lastIndex];
      var fromstate = fState[fLastIndex];

      $rootScope.animation = "from-" + fromstate + "-to-" + tostate;
      $rootScope.toState = tostate;
    });
})
.animation('.progressbar', function() {
  return {
    enter: function(element, done) {
      TweenMax.fromTo( element, 1, {autoAlpha: 0}, { autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
    },
    leave: function(element, done) {
      TweenMax.to( element, 1, { autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
    }
  }
});