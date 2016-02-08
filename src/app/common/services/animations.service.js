angular.module('Movie.services.animations', [])

.factory('AnimationsService', function() {

  // Note: The "leave" attribute associated with each page transition actually contains the "leave" animation
  //       for the page transition before. This is because when state is changed, the name
  //       of the page transition changes before the "leave" event is executed. Take, for example,
  //       "from-home-to-home". When I refresh the page, the "enter" attribute is
  //       selected and that animation is run. If I go to the synopsis state, the
  //       current page transition is changed from "from-home-to-home" to "from-home-to-synopsis";
  //       THEN the "leave" attribute is selected and the associated animation is run.

  var currentAnimation = {};

  var getAnimations = function() {
    return animations;
  };

  var getCurrentAnimation = function() {
    return currentAnimation;
  };

  var setCurrentAnimation = function(animation) {
    currentAnimation = animation;
  };

  var animations = {
    "from-home-to-home": {
      enter: function(element, done) {
        TweenMax.fromTo( element, 1, { x:  -element[0].clientWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
      },
      leave: function(element, done) {
        TweenMax.fromTo( element, 1, { x: 0, y: 0, autoAlpha: 1 }, { x: 0, y: element[0].clientHeight, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
      }
    },
    "from-home-to-synopsis": {
      enter: function(element, done) {
        TweenMax.fromTo( element, 1, { x: 0, y: -element[0].clientHeight, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
      },
      leave: function(element, done) {
        TweenMax.to( element, 1, { x: 0, y: element[0].clientHeight, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
      }
    },
    "from-synopsis-to-home": {
      enter: function(element, done) {
        TweenMax.fromTo( element, 1, { x: 0, y: element[0].clientHeight, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
      },
      leave: function(element, done) {
        TweenMax.to( element, 1, { x: 0, y: -element[0].clientHeight, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
      }
    },
    "from-home-to-gallery": {
      enter: function(element, done) {
        TweenMax.fromTo( element, 1, { x: -element[0].clientWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
      },
      leave: function(element, done) {
        TweenMax.to( element, 1, { x: element[0].clientWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
      }
    },
    "from-gallery-to-home": {
      enter: function (element, done) {
        TweenMax.fromTo( element, 1, { x: element[0].clientWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
      },
      leave: function (element, done) {
        TweenMax.to( element, 1, { x: -element[0].clientWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
      }
    },
    "from-home-to-trailer": {
      enter: function(element, done) {
        TweenMax.fromTo( element, 1, { x: element[0].clientWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
      },
      leave: function(element, done) {
        TweenMax.to( element, 1, { x: -element[0].clientWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
      }
    },
    "from-trailer-to-home": {
      enter: function (element, done) {
        TweenMax.fromTo( element, 1, { x: -element[0].clientWidth, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
      },
      leave: function (element, done) {
        TweenMax.to( element, 1, { x: element[0].clientWidth, y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
      }
    }
  };

  // Synopsis and cast animations are the same
  animations["from-home-to-cast"] = animations["from-home-to-synopsis"];
  animations["from-cast-to-home"] = animations["from-synopsis-to-home"];

  return {
    getAnimations: getAnimations,
    getCurrentAnimation: getCurrentAnimation,
    setCurrentAnimation: setCurrentAnimation
  };
});
