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
.controller('GalleryCtrl', function($scope, PreloadService) {
	var gallery = this;

	var images = [
		{id: 'image00', src: 'assets/images/big-thumb.jpg'},
		{id: 'image01', src: 'assets/images/big-thumb-2.png'},
		{id: 'image02', src: 'assets/images/big-thumb-3.png'}
	];

	gallery.loaded = false;

	gallery.reverse = false;
	gallery.setCurrentIndex =  function(index, reverse) {
		if (index >= 0 && index < gallery.images.length ) {
			gallery.currentIndex = index;
			$scope.$broadcast('animation', index);
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
.directive('transition', function($animate) {
	var linker = function(scope, element, attrs) {
		scope.$on('animation', function(event, index) {
			$animate.removeClass(element, 'current-image');
			$animate.addClass(element, 'current-image');
		});
	};

	return {
		link: linker,
		scope: {
			transition: '=',
			index: '='
		}
	};
})
.animation('.current-image', function($window) {

	return {

		addClass: function(element, done) {
			TweenMax.fromTo(element, 1, {x:-$window.innerWidth}, { x:0, onComplete: done});
		},
		leave: function(element, done) {
			element.css('position', 'absolute');
			TweenMax.to(element, 1, {x: $window.innerWidth, onComplete: done});
		}
	};
});
