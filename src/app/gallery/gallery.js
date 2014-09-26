angular.module('Movie.gallery', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('movie.gallery', {
			url: '/gallery',
			views: {
				'main@': {
					controller: 'GalleryCtrl',
					controllerAs: 'gallery',
					templateUrl: 'app/gallery/gallery.tpl.html'
				}
			}
		}
	);
})
.controller('GalleryCtrl', function($scope, PreloadService, $timeout) {
	var gallery = this;

	var images = [
		{id: 'image00', src: 'assets/images/big-thumb.jpg'},
		{id: 'image01', src: 'assets/images/big-thumb-2.png'},
		{id: 'image02', src: 'assets/images/big-thumb-3.png'}
	];

	gallery.loaded = false;

	gallery.direction = 'forward';

	gallery.setCurrentIndex =  function(index) {

		gallery.direction = (index >= gallery.currentIndex) ? 'forward' : 'reverse';

		if (index >= 0 && index < gallery.images.length ) {
			$timeout(function() {
					gallery.currentIndex = index;
					$scope.$broadcast('animation', index);
			}, 1);
		}
	};

	gallery.load = function() {
		PreloadService.loadManifest(images);
	};

	$scope.$on('queueComplete', function(event, slides) {
    $scope.$apply(function(){
        gallery.images = images;
				gallery.currentIndex = 0;
				gallery.loaded = true;
    });
  });

  gallery.load();
})
.animation('.current-image', function($window) {

	return {

		enter: function(element, done) {
			// inbound picture animation
			var x = element.hasClass('forward') ? $window.innerWidth : -$window.innerWidth;

			TweenMax.fromTo(element, 1, {x:x}, { x:0, onComplete: done});
			element.css('position', 'static');
		},

		leave: function(element, done) {
			// outbound picture animation
			var x = element.hasClass('forward') ? -$window.innerWidth : $window.innerWidth,
					from = element.hasClass('forward') ? 0 : -element.width();
					time = element.hasClass('forward') ? 1 : 1.7,

			element.css('position', 'absolute');
			TweenMax.fromTo(element, time, {x:from}, {x: x, onComplete: done});
		}
	};
});
