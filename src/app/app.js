var currentSection = "";
var lastSection = "";
	
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
					case "":
					default:						 
						TweenMax.fromTo( element, 1, { x: -elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
				}
			} else {
				switch(targetSection) {
					case "synopsis":
					case "cast":
						TweenMax.fromTo( $('.movie-details'), 1, { x: -500, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, delay: .5 });
						TweenMax.fromTo( element, 1, { x: 0, y: -elementHeight, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
					case "gallery":
						TweenMax.fromTo( $('.movie-details'), 1, { x: -500, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, delay: .5 });
						TweenMax.fromTo( element, 1, { x: -elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
					case "trailer":
						TweenMax.fromTo( element, 1, { x: elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
						break;
				}
			}

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
						break;
				}
				
			}
			
		}
	};

});
