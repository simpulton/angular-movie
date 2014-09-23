angular.module('Movie.trailer', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('movie.trailer', {
			url: '/trailer',
			views: {
				'main@': {
					templateUrl: 'app/trailer/trailer.tpl.html'
				}
			}
		}
	);
})