angular.module('Movie.trailer', [
	'ui.router'
])
.config(function($stateProvider) {
	$stateProvider
		.state('Movie.home.trailer', {
			url: 'trailer',
			views: {
				'main@': {
					templateUrl: 'app/trailer/trailer.tpl.html',
          			controller: 'AppCtrl',
          			controllerAs: 'app'
				}
			}
		}
	);
})
.animation('.current-trailer', function($window) {
  var finish = function(element, done) {
    element.css('z-index', '1');
    done();
  };
  return {
    addClass: function(element, className, done) {
      // inbound trailer animation
      element.css('z-index', '10');
      TweenMax.fromTo(element, 1, {scaleX: 0, scaleY: 0, rotation: 0}, { scaleX: 1, scaleY:1, delay: 1, rotation: 360, onComplete: finish(element, done)});
    },

    beforeRemoveClass: function(element, className, done) {
      // outbound trailer animation

      TweenMax.fromTo(element, 1, {scaleX: 1, scaleY: 1, rotation: 0}, { scaleX: 0, scaleY:0, rotation: 360, onComplete: done});
    }
  };
});
