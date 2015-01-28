angular.module('Movie.animations', ['ngAnimate'])
.factory('AnimationsService', function($window) {

    // Note: The "leave" attribute associated with each page transition actually contains the "leave" animation
    //       for the page transition before. This is because when state is changed, the name
    //       of the page transition changes before the "leave" event is executed. Take, for example,
    //       "from-home-to-home". When I refresh the page, the "enter" attribute is
    //       selected and that animation is run. If I go to the synopsis state, the
    //       current page transition is changed from "from-home-to-home" to "from-home-to-synopsis";
    //       THEN the "leave" attribute is selected and the associated animation is run. This
    //       seems clunky, and perhaps in most cases it would be; however, in this case it actually
    //       saves us from having to separate out the logic for the home page "leave" animation.

    var animations = {
      // All page transition animations go here

      "from-home-to-home": {
        enter: function(element, done, props) {
          TweenMax.fromTo( element, 1, { x:  -props.elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
        },
        leave: function(element, done, props) {
          TweenMax.fromTo( element, 1, { x: 0, y: 0, autoAlpha: 1 }, { x: 0, y: props.elementHeight, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
        }
      },
      "from-home-to-synopsis": {
        enter: function(element, done, props) {
          TweenMax.fromTo( element, 1, { x: 0, y: -props.elementHeight, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
        },
        leave: function(element, done, props) {
          TweenMax.to( element, 1, { x: 0, y: props.elementHeight, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
        }
      },
      "from-synopsis-to-home": {
        enter: function(element, done, props) {
          TweenMax.fromTo( element, 1, { x: 0, y: props.elementHeight, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
        },
        leave: function(element, done, props) {
          TweenMax.to( element, 1, { x: 0, y: -props.elementHeight, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
        }
      },
      "from-home-to-gallery": {
        enter: function(element, done, props) {
          TweenMax.fromTo( element, 1, { x: -props.elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
        },
        leave: function(element, done, props) {
          TweenMax.to( element, 1, { x: props.elementWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
        }
      },
      "from-gallery-to-home": {
        enter: function (element, done, props) {
          TweenMax.fromTo( element, 1, { x: props.elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
        },
        leave: function (element, done, props) {
          TweenMax.to( element, 1, { x: -props.elementWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
        }
      },
      "from-home-to-trailer": {
        enter: function(element, done, props) {
          TweenMax.fromTo( element, 1, { x: props.elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
        },
        leave: function(element, done, props) {
          TweenMax.to( element, 1, { x: -props.elementWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
        }
      },
      "from-trailer-to-home": {
        enter: function (element, done, props) {
          TweenMax.fromTo( element, 1, { x: -props.elementWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
        },
        leave: function (element, done, props) {
          TweenMax.to( element, 1, { x: props.elementWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
        }
      }
    };

    // Synopsis and cast animations are the same
    animations["from-home-to-cast"] = animations["from-home-to-synopsis"];
    animations["from-cast-to-home"] = animations["from-synopsis-to-home"];

    // Return page transition animations
    var getAnimations = function() {
      return animations;
    };

    // Return width and height of an element
    var getProps = function(element) {
      return {
        elementWidth: element.width(),
        elementHeight: element.height()
      };
    };

    return {
      getAnimations: getAnimations,
      getProps: getProps
    };
})
.animation('.main-content', function(AnimationsService, $rootScope) {
  var animations = AnimationsService.getAnimations();

  return {
    enter: function(element, done) {
      var finished = function() {
        $rootScope.$broadcast('animation-done');
        done();
      };

      var props = AnimationsService.getProps(element);

      animations[$rootScope.animation].enter(element, finished, props);

    },
    leave: function(element, done) {
      var props = AnimationsService.getProps(element);

      animations[$rootScope.animation].leave(element, done, props);
    }
  }
});
