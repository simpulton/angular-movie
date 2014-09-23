angular.module('Movie.synopsis', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('movie.synopsis', {
			url: '/synopsis',
			views: {
				'main@': {
					templateUrl: 'app/synopsis/synopsis.tpl.html'
				}
			}
		}
	);
})