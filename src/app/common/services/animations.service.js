angular.module('Movie.services.animations', [])
    .factory('AnimationsService', function() {
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
            }
        };

        return {
            getAnimations: getAnimations,
            getCurrentAnimation: getCurrentAnimation,
            setCurrentAnimation: setCurrentAnimation
        };
    });