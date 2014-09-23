angular.module('Movie.cast', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('movie.cast', {
			url: '/cast',
			views: {
				'main@': {
					templateUrl: 'app/cast/cast.tpl.html'
				}
			}
		}
	);
})