angular.module('Movie.home', [
	'ui.router'
])
.config(function($stateProvider, $sceDelegateProvider) {
	$stateProvider
		.state('Movie.home', {
      resolve: {
        movie: function(MovieService) {
          return MovieService.getMovie()
            .then(function(response) {
              return response.data[0];
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

  // Preloading
  if (!PreloadService.getStatus()) {
    var manifest = [];
    var load = function (manifest) {
      PreloadService.loadManifest(manifest);
    };

    app.movie.images.filter(function (image) {
      manifest.push(image);
    });
    app.movie.trailers.filter(function (trailer) {
      manifest.push(trailer);
    });

    load(manifest);
  }

  $scope.$on('queueComplete', function(event, slides) {
    $scope.$apply(function(){
      console.log('complete');
    });
  });

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

