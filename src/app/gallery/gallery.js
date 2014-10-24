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
			TweenMax.fromTo(element, 1, {opacity: 0}, { opacity: 1, onComplete: done});
		},

		leave: function(element, done) {
			// outbound picture animation
			TweenMax.fromTo(element, time, {opacity: 1}, {opacity: 0, onComplete: done});
		}
	};
});
