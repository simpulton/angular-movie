angular.module('Movie.synopsis', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('Movie.home.synopsis', {
			url: 'synopsis',
			views: {
				'main@': {
					templateUrl: 'app/synopsis/synopsis.tpl.html',
          			controller: 'AppCtrl',
         			controllerAs: 'app'
				}
			}
		}
	);
});