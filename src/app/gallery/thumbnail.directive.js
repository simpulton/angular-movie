angular.module('Movie.directives.thumbnail', [])
.directive('thumbnail', function() {
	var linker = function(scope, element, attrs) {
		var tl = new TimelineLite();

		tl.add(TweenMax.to(element, .25, {border: '1px solid rgba(255, 204, 102, 1)'}));
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