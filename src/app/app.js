angular.module('Movie', [
	'ngAnimate',
	'ui.router',
  'Movie.admin',
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
.constant('ENDPOINT_URI', 'http://angularmovieapi-31190.onmodulus.net/api')
.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

	$stateProvider
		.state('Movie', {
      resolve: {
        movie: function(MovieService, $location) {
          return MovieService.fetch()
            .then(function(response) {
              if (response.data.length == 0) {
                $location.path('/admin');
              }
              MovieService.setCurrentMovie(response.data[0]);
              MovieService.getCurrentMovie();
              return response.data[0];
            });
        },
        loaded: function(PreloadService, movie) {
          var manifest = [];

          if (movie && movie.images) {
            movie.images.filter(function (image) {
              manifest.push(image);
            });
          }

          return PreloadService.loadManifest(manifest)
            .then(function(response) {
              return response;
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
.animation('.main-content', function($rootScope) {
  return {
		enter: function(element, done) {
			// animation for inbound page
      var finished = function() {
        $rootScope.$broadcast('animation-done');
        done();
      };

			TweenMax.fromTo(element, 1, {x:'-2500px'}, { x:0, opacity: '1', onComplete: finished});
		},
		leave: function(element, done) {
			// animation for outbound page
			element.css({position:'absolute', top: 0});
			TweenMax.to(element, 1, { x: '2000px', opacity: '0', onComplete: done });
		}
	};

});
