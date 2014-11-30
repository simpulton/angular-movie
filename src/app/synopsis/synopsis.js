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
})
.animation('.about', function($rootScope) {

	return {

		enter: function(element, done) {
			console.log("WTF");
		},

		leave: function(element, done) {
			console.log("WTF");
		}
	};
});
