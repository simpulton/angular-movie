angular.module('Movie.animations', ['ngAnimate'])
    .animation('.main-content', function (AnimationsService, $rootScope) {
      var animations = AnimationsService.getAnimations();

      return {
        enter: function (element, done) {
          var finished = function () {
            $rootScope.$broadcast('animation-done');
            done();
          };

          var props = AnimationsService.getProps(element),
              currentAnimation = AnimationsService.getCurrentAnimation();

          animations[currentAnimation].enter(element, finished, props);

        },
        leave: function (element, done) {
          var props = AnimationsService.getProps(element),
              currentAnimation = AnimationsService.getCurrentAnimation();

          animations[currentAnimation].leave(element, done, props);
        }
      }
    });
