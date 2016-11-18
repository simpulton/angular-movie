var castState = {
  parent: 'Movie',
  name: 'cast',
  url: '/cast',
  views: {
    'main@': 'cast'
  }
};

function config($stateProvider) {
  $stateProvider.state(castState);
}

function castAnimate() {
  // animation for the cast section
  return {
    enter: function (element, done) {
      var h4 = element.find('h4'),
          content = angular.element(element).find('div');

      TweenMax.fromTo(element, 0.75, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.25});
      TweenMax.fromTo(h4, 0.75, {x: 50}, {x: 0, ease: Expo.easeOut, delay: 0.25});
      TweenMax.fromTo(content, 0.75, {y: 50}, {y: 0, ease: Expo.easeOut, delay: 0.25, onComplete: done});
    },
    leave: function (element, done) {
      TweenMax.to(element, 0.25, {autoAlpha: 0, onComplete: done});
    }
  };
}

angular.module('Movie.cast', [])
.config(config)
.animation('.cast-animate', castAnimate);
