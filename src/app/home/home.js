angular.module('Movie.home', [
	'ui.router'
])
.config(function($stateProvider, $sceDelegateProvider) {
	$stateProvider
		.state('Movie.home', {
      resolve: {
        movie: function(MovieService, $location) {
          return MovieService.fetch()
            .then(function(response) {
              if (response.data.length == 0) {
                $location.path('/admin');
              }
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
.controller('AppCtrl', function(PreloadService, movie, $timeout, $scope) {
  var app = this;

  app.movie = movie;
  app.movie.release = moment(app.movie.release).format('MM[.]DD[.]YYYY');
  app.showIframe = false;

  // Preloading
  if (!PreloadService.getStatus()) {
    var manifest = [];
    var load = function (manifest) {
      PreloadService.loadManifest(manifest);
    };

    if (app.movie.images) {
      app.movie.images.filter(function (image) {
        manifest.push(image);
      });
    };
    /*app.movie.trailers.filter(function (trailer) {
      manifest.push(trailer);
    });*/

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

