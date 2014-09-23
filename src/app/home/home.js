angular.module('Movie.home', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('movie.home', {
			url: '/',
			views: {
				'main@': {
					templateUrl: 'app/home/home.tpl.html'
				}
			}
		}
	);
})