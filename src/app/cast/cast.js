angular.module('Movie.cast', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('Movie.home.cast', {
			url: 'cast',
			views: {
				'main@': {
					templateUrl: 'app/cast/cast.tpl.html',
          controller: 'AppCtrl',
          controllerAs: 'app'
				}
			}
		}
	);
})
.animation('.cast-animate', function($timeout) {
//  animation for the cast section

  return {
    enter: function(element, done) {
      element.css('display', 'none');
      TweenMax.fromTo(element, 0.5, {x: '700px'}, {x: '0', delay: 0.5, onComplete: done});
      TweenMax.to(element, 0, {display: 'block', delay: 0.5, onComplete: done});
    },
    leave: function(element, done) {
      TweenMax.to(element, 0.5, {x: '700px', onComplete: done});
    }
  };
});