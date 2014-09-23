angular.module('Movie', [
	'ui.router',
	'Movie.home',
	'Movie.gallery',
	'Movie.synopsis',
	'Movie.cast',
	'Movie.trailer'
])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('movie', {
			abstract: true,
			url: ''
		}
	);

	$urlRouterProvider.otherwise("/");
})
