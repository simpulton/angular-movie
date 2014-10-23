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

			TweenMax.fromTo(element, 1, {x:x}, { x:0, onComplete: done});
			element.css('position', 'static');
		},

		leave: function(element, done) {
			// outbound picture animation
			var x = element.hasClass('forward') ? -$window.innerWidth : $window.innerWidth,
					from = element.hasClass('forward') ? 0 : -element.width();
					time = element.hasClass('forward') ? 1 : 1.7,

			element.css('position', 'absolute');
			TweenMax.fromTo(element, time, {x:from}, {x: x, onComplete: done});
		}
	};
});
