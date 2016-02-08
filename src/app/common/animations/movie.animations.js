angular.module('Movie.animations', ['ngAnimate'])

.animation('.main-content', function(AnimationsService, $rootScope) {
  var animations = AnimationsService.getAnimations();

  return {
    enter: function(element, done) {
      var finished = function() {
        $rootScope.$broadcast('animation-done');
        done();
      };

      var currentAnimation = AnimationsService.getCurrentAnimation();

      if (animations[currentAnimation]) {
        animations[currentAnimation].enter(element, finished);
      } else {
        done();
      }

    },
    leave: function(element, done) {
      var currentAnimation = AnimationsService.getCurrentAnimation();

      if (animations[currentAnimation]) {
        animations[currentAnimation].leave(element, done);
      } else {
        done();
      }
    }
  }
});
