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
		}
	);

	$urlRouterProvider.otherwise("/");

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads
    'self',
    // Allow loading from youtube
    'https://www.youtube.com/**'
  ]);

})
.controller('AppCtrl', function(PreloadService, movie, $timeout, $scope) {
    var app = this;

    app.movie = movie;

    // Preloading
    if (!PreloadService.getStatus()) {
      var manifest = [];
      var load = function (manifest) {
        PreloadService.loadManifest(manifest);
      };

      app.movie.images.filter(function (image) {
        manifest.push(image);
      });
      app.movie.trailers.filter(function (trailer) {
        manifest.push(trailer);
      });

      load(manifest);
    }

    $scope.$on('queueComplete', function(event, slides) {
      $scope.$apply(function(){
        console.log('complete');
      });
    });

    // Init cast
    app.currentCast = 0;

    // Init slideshow
    app.direction = 'forward';
    app.currentIndex = 0;
    app.setCurrentIndex = function(index) {
      app.direction = (index >= app.currentIndex) ? 'forward' : 'reverse';
      if (index >= 0 && index < app.movie.images.length ) {
        $timeout(function() {
          app.currentIndex = index;
        });
      }
    };


})
.animation('.main-content', function($rootScope) {

	return {
		enter: function(element, done) {
			// animation for inbound page
			TweenMax.fromTo(element, 1, {x:'-2500px'}, { x:0, opacity: '1', onComplete: done});
		},
		leave: function(element, done) {
			// animation for outbound page
			element.css({position:'absolute', top: 0});
			TweenMax.to(element, 1, { x: '2000px', opacity: '0', onComplete: done });
		}
	};

});
