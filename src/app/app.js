var currentSection = "";
var lastSection = "";
	
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
.constant('ENDPOINT_URI', 'http://angular-movie-api-node.herokuapp.com/api')
.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

	$stateProvider
		.state('Movie', {
      resolve: {
        movie: function(MovieService) {
          return MovieService.fetch()
            .then(function(response) {
              MovieService.setCurrentMovie(response.data[0]);
              return response.data[0];
            });
        },
        loaded: function(PreloadService, movie, $rootScope) {
          var manifest = [];

          if (movie && movie.images) {
            movie.images.filter(function (image) {
              manifest.push(image);
            });
          }

          return PreloadService.loadManifest(manifest)
            .then(function(response) {
              $rootScope.loaded = true;
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
.run(function(MovieService, $rootScope, $state) {
  $rootScope.loaded = false;

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (MovieService.getCurrentMovie() == null && toState.name == 'Movie.home') {
      event.preventDefault();
      $state.go('Movie.admin');
    }

    $rootScope.state = toState.name.split('.').join('-').toLowerCase();
  });

  $rootScope.$on('queueProgress', function(event, mainEvent) {
    $rootScope.$apply(function() {
      $rootScope.progress = mainEvent.progress * 100;
    });
  });
})
.animation('.main-content', function($rootScope) {
  return {
		enter: function(element, done) {
			var finished = function() {
				$rootScope.$broadcast('animation-done');
				done();
			};
			
			var elementWidth = element.width();
			var elementHeight = element.height();
			
			// HACK TO FIGURE OUT WHAT SECTION IS ENTERING
			var targetSection = element.find('div').eq(0).attr('id');
			
			lastSection = currentSection;
			currentSection = targetSection;
			
			if (targetSection == "home") {
				switch(lastSection) {
					case "synopsis":
					case "cast":
						TweenMax.fromTo( element, 1, { x: 0, y: elementHeight, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
					case "gallery":
						TweenMax.fromTo( element, 1, { x: elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
					case "trailer":
						TweenMax.fromTo( element, 1, { x: -elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
          case "admin":
            TweenMax.fromTo( element, 1, { x: 0, y: elementHeight, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
          case "":
					default:
						TweenMax.fromTo( element, 1, { x: -elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
				}
			} else {
				switch(targetSection) {
					case "synopsis":
					case "cast":
						TweenMax.fromTo( element, 1, { x: 0, y: -elementHeight, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
					case "gallery":
						TweenMax.fromTo( element, 1, { x: -elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
					case "trailer":
						TweenMax.fromTo( element, 1, { x: elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
          case "admin":
            TweenMax.fromTo( element, 1, { x: 0, y: elementHeight, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
            break;
				}
			}
			
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + currentSection);

		},
		leave: function(element, done) {
			// animation for outbound page
			
			var elementWidth = element.width();
			var elementHeight = element.height();
			
			// HACK TO FIGURE OUT WHAT SECTION YOU ARE LEAVING
			if (lastSection != "home") {
				switch(lastSection) {
					case "synopsis":
					case "cast":
						TweenMax.to( element, 1, { x: 0, y: -elementHeight, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
						break;
					case "gallery":
						TweenMax.to( element, 1, { x: -elementWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
						break;
					case "trailer":
						TweenMax.to( element, 1, { x: elementWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
						break;
          case "admin":
            TweenMax.to( element, 1, { x: elementWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
          case "":
					default:
						TweenMax.to( element, 1, { autoAlpha: 0, ease: Expo.easeInOut, onComplete: done });
						break;
				}
				
			} else {
				switch(currentSection) {
					case "synopsis":
					case "cast":
						TweenMax.to( element, 1, { x: 0, y: elementHeight, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
						break;
					case "gallery":
						TweenMax.to( element, 1, { x: elementWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
						break;
					case "trailer":
						TweenMax.to( element, 1, { x: -elementWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
          case "admin":
            TweenMax.to( element, 1, { x: 0, y: elementHeight, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
            break;
				}
				
			}
			
		}
	};

});
