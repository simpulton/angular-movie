function navButton() {
	var linker = function(scope, element, attrs) {

		scope.play = function() {
			TweenMax.to(element, 0.5, { y: 10, backgroundColor: '#000', color: '#ffcc66', ease: Expo.easeOut });
		};

		scope.reverse = function() {
			TweenMax.to(element, 0.5, { y: 0, backgroundColor: 'transparent', color: '#000', ease: Expo.easeOut });
		};
	};

	return {
		scope: true,
		link: linker
	};
}

angular.module('Movie.directives.nav', [])
.directive('navButton', navButton);
