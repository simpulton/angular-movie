angular.module('Movie.synopsis', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('Movie.synopsis', {
      resolve: {
        loaded: function(PreloadService, movie, $rootScope) {
          $rootScope.loaded = false;
          var manifest = PreloadService.selectImages(movie, $rootScope.toState);

          return PreloadService.loadManifest(manifest)
            .then(function(response) {
              $rootScope.loaded = true;
              return response;
            }, function(error) {
              console.log(error);
            },function(progress) {
              $rootScope.progress = progress;
            });
        }
      },
			url: '/synopsis',
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
