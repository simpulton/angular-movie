angular.module('Movie.gallery', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('movie.gallery', {
			url: '/gallery',
			views: {
				'main@': {
					templateUrl: 'app/gallery/gallery.tpl.html'
				}
			}
		}
	);
})