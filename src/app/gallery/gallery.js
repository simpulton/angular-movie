angular.module('Movie.gallery', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('Movie.gallery', {
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
			url: '/gallery',
			views: {
				'main@': {
          templateUrl: 'app/gallery/gallery.tpl.html',
          controller: 'AppCtrl',
          controllerAs: 'app'
				}
			}
		}
	);
})
.animation('.current-image', function($window) {

	return {
		enter: function(element, done) {
			// inbound picture animation
			var x = element.hasClass('forward') ? $window.innerWidth : -$window.innerWidth;
			TweenMax.fromTo( element, 1, { x: x }, { x: 0, ease: Expo.easeInOut, onComplete: done});
		},

		leave: function(element, done) {
			// outbound picture animation
			var x = element.hasClass('forward') ? -$window.innerWidth : $window.innerWidth;
			TweenMax.to( element, 1, { x: x, ease: Expo.easeInOut, onComplete: done});
		}
	};
});
