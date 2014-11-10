angular.module('Movie', [
	'ngAnimate',
	'ui.router',
	'Movie.home',
	'Movie.gallery',
	'Movie.synopsis',
	'Movie.cast',
	'Movie.trailer',
	'Movie.directives.nav',
	'Movie.directives.thumbnail',
	'Movie.services.preload',
	'Movie.services.movie'
])
.constant('ENDPOINT_URI', 'app/data/movie.json')
.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

	$stateProvider
		.state('Movie', {
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
.animation('.main-content', function($rootScope) {
  return {
		enter: function(element, done) {
			var finished = function() {
				$rootScope.$broadcast('animation-done');
				done();
			};
			TweenMax.fromTo( element, 1, { x: -2000, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
		},
		leave: function(element, done) {
			// animation for outbound page
			TweenMax.to( element, 1, { x: 2000, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done });
		}
	};

});
