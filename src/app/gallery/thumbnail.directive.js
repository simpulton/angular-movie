angular.module('Movie.directives.thumbnail', [])
.directive('thumbnail', function() {
	var linker = function(scope, element, attrs) {
		var tl = new TimelineLite();

		tl.add(TweenMax.to(element, 1, {border: '5px solid rgba(255, 255, 255, 0.4)'}));
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
	};
})