angular.module('Movie.home', [
	'ui.router'
])
.config(function($stateProvider, $sceDelegateProvider) {
	$stateProvider
		.state('Movie.home', {
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
			url: '/',
			views: {
				'main@': {
					templateUrl: 'app/home/home.tpl.html',
          controller: 'AppCtrl',
          controllerAs: 'app'
				}
			}
		}
	);
})
.controller('AppCtrl', function(PreloadService, movie, $timeout, $scope, $sce) {
  var app = this;

  app.renderHtml = function(html) {
    return $sce.trustAsHtml(html);
  };

  app.movie = movie;
  app.showIframe = false;

  // Init cast
  app.currentCast = 0;

  // Init slideshow
  app.direction = 'forward';
  app.currentIndex = 0;
  app.setCurrentIndex = function(index) {
    app.direction = (index >= app.currentIndex) ? 'forward' : 'reverse';
    if (index >= 0 && index < app.movie.images.length ) {
      $timeout(function() {
        app.currentIndex = index;
      });
    }
  };

  $scope.$on('animation-done', function() {
    $scope.$apply(function() {
      app.showIframe = true;
    });
  });


});

