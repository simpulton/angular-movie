angular.module('Movie.directives.nav', [])

.directive('navButton', function() {
	var linker = function(scope, element, attrs) {
		// animation for the nav buttons
		
		var tl = new TimelineLite();

		tl.add(TweenMax.to(element, .5, {backgroundColor: '#000', color: '#ffcc66'}));
		tl.stop();

		scope.play = function() {
			tl.play();
		};

		scope.reverse = function() {
			tl.reverse();
		};
	};

	return {
		scope: true,
		link: linker
	}

});