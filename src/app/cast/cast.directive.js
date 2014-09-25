angular.module('Movie.directives.cast', [])
.directive('castContainer', function() {
	var linker = function(scope, element, attrs) {
		// animation for the cast section

		var tl = new TimelineLite();
		var reverse = function() {
			tl.reverse();
		};
		
		tl.add(TweenMax.to(element.find('h4, p'), 0.5, {x: '700px', onComplete: reverse}));
		tl.stop();

		element.on('click', 'a', function() {
			tl.play();
		});
	};

	return {
		link: linker,
		scope: true
	};

});