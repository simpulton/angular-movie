var ANIMATIONS = {
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

function AnimationsService() {

  // Note: The "leave" attribute associated with each page transition actually contains the "leave" animation
  //       for the page transition before. This is because when state is changed, the name
  //       of the page transition changes before the "leave" event is executed. Take, for example,
  //       "from-home-to-home". When I refresh the page, the "enter" attribute is
  //       selected and that animation is run. If I go to the synopsis state, the
  //       current page transition is changed from "from-home-to-home" to "from-home-to-synopsis";
  //       THEN the "leave" attribute is selected and the associated animation is run.

  var currentAnimation = {};

  // Synopsis and cast animations are the same
  ANIMATIONS["from-home-to-cast"] = ANIMATIONS["from-home-to-synopsis"];
  ANIMATIONS["from-cast-to-home"] = ANIMATIONS["from-synopsis-to-home"];

  this.getAnimations = function() {
    return ANIMATIONS;
  };

  this.getCurrentAnimation = function() {
    return currentAnimation;
  };

  this.setCurrentAnimation = function(animation) {
    currentAnimation = animation;
  };
}

angular.module('Movie.services.animations', [])
.service('AnimationsService', AnimationsService);