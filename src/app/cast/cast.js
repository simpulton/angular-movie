angular.module('Movie.cast', [
    'ui.router'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('Movie.cast', {
                url: '/cast',
                views: {
                    'main@': {
                        templateUrl: 'app/cast/cast.tpl.html',
                        controller: 'AppCtrl',
                        controllerAs: 'app'
                    }
                }
            }
        );
    })
    .animation('.cast-animate', function ($timeout) {
//  animation for the cast section

        return {
            enter: function (element, done) {
                var h4 = element.find('h4'),
                    content = element.find('.copy');

                TweenMax.fromTo(element, 0.75, {autoAlpha: 0}, {autoAlpha: 1, delay: .25});
                TweenMax.fromTo(h4, 0.75, {x: 50}, {x: 0, ease: Expo.easeOut, delay: .25});
                TweenMax.fromTo(content, 0.75, {y: 50}, {y: 0, ease: Expo.easeOut, delay: .25, onComplete: done});
            },
            leave: function (element, done) {
                TweenMax.to(element, .25, {autoAlpha: 0, onComplete: done});
            }
        };
    });