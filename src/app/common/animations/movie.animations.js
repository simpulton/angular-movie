angular.module('Movie.animations', ['ngAnimate'])
    .animation('.main-content', function () {
        return {
            enter: function (element, done) {
                TweenMax.fromTo( element, 1, { x:  -element.width(), y: 0, autoAlpha: 0 },
                    { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: done});
            },
            leave: function (element, done) {
                TweenMax.fromTo( element, 1, { x: 0, y: 0, autoAlpha: 1 },
                    { x: element.width(), y: 0, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done});
            }
        }
    });
