var galleryState = {
  parent: 'Movie',
  name: 'gallery',
  url: '/gallery',
  views: {
    'main@': 'gallery'
  }
};

function config($stateProvider) {
  $stateProvider.state(galleryState);
}

function imageAnimation($window) {
  return {
    enter: function (element, done) {
      // inbound picture animation
      var scope = element.scope();
      var x = scope.galleryVm.direction === 'forward' ? $window.innerWidth : -$window.innerWidth;
      TweenMax.fromTo(element, 1, {x: x}, {x: 0, ease: Expo.easeInOut, onComplete: done});
    },

    leave: function (element, done) {
      // outbound picture animation
      var scope = element.scope();
      var x = scope.galleryVm.direction === 'forward' ? -$window.innerWidth : $window.innerWidth;
      TweenMax.to(element, 1, {x: x, ease: Expo.easeInOut, onComplete: done});
    }
  };
}

angular.module('Movie.gallery', [])
.config(config)
.animation('.image-animation', imageAnimation);
