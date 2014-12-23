angular.module('Movie.gallery', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('Movie.home.gallery', {
			url: 'gallery',
			views: {
				'main@': {
          templateUrl: 'app/gallery/gallery.tpl.html',
          controller: 'AppCtrl',
          controllerAs: 'app'
				}
			}
		}
	);
})
.animation('.current-image', function($window) {

	return {
		enter: function(element, done) {
			// inbound picture animation
			var x = element.hasClass('forward') ? $window.innerWidth : -$window.innerWidth;
			TweenMax.fromTo( element, 1, { x: x }, { x: 0, ease: Expo.easeInOut, onComplete: done});
		},

		leave: function(element, done) {
			// outbound picture animation
			var x = element.hasClass('forward') ? -$window.innerWidth : $window.innerWidth;
			TweenMax.to( element, 1, { x: x, ease: Expo.easeInOut, onComplete: done});
		}
	};
});
