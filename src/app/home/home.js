angular.module('Movie.home', [
	'ui.router'
])
.config(function($stateProvider, $sceDelegateProvider) {
	$stateProvider
		.state('Movie.home', {
      resolve: {
        currentMovie: function(MovieService, movie) {
           return MovieService.getCurrentMovie();
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
.controller('AppCtrl', function(PreloadService, currentMovie, $timeout, $scope, $state, $sce) {
  var app = this;

   app.renderHtml = function(html) {
    return $sce.trustAsHtml(html);
  };

  app.movie = currentMovie;
  app.movie.release = moment(app.movie.release).format('MM[.]DD[.]YYYY');

  // Init cast
  app.currentCast = 0;

  // Init carousels
  app.direction = 'forward';
  app.currentIndex = 0;
  app.setCurrentIndex = function(carousel, index) {
    app.direction = (index >= app.currentIndex) ? 'forward' : 'reverse';
    if (index >= 0 && index < carousel.length ) {
      $timeout(function() {
        app.currentIndex = index;
      });
    }
  };

  // Load iframe
  app.showAssets = false;
  $scope.$on('animation-done', function() {
    $scope.$apply(function() {
      app.showAssets = true;
    });
  });


});

