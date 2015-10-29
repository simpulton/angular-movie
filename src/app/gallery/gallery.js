angular.module('Movie.gallery', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('Movie.gallery', {
                url: '/gallery',
                views: {
                    'main@': {
                        templateUrl: 'app/gallery/gallery.tpl.html',
                        controller: 'GalleryController',
                        controllerAs: 'galleryVm'
                    }
                }
            }
        );
    })
    .animation('.current-image', function ($window) {

        return {
            enter: function (element, done) {
                // inbound picture animation
                var x = element.hasClass('forward') ? $window.innerWidth : -$window.innerWidth;
                TweenMax.fromTo(element, 1, {x: x}, {x: 0, ease: Expo.easeInOut, onComplete: done});
            },

            leave: function (element, done) {
                // outbound picture animation
                var x = element.hasClass('forward') ? -$window.innerWidth : $window.innerWidth;
                TweenMax.to(element, 1, {x: x, ease: Expo.easeInOut, onComplete: done});
            }
        };
    })
    .animation('.slider-image', function () {
        return {
            enter: function (element, done) {
                // inbound picture animation
                //var x = element.hasClass('forward') ? element[0].parentElement.clientWidth : -element[0].parentElement.clientWidth;
                var x = element[0].parentElement.parentElement.clientWidth;
                TweenMax.fromTo(element, 10, {x:0}, {x: -x, ease: Expo.easeInOut, onComplete: done});
                console.log('entering', true);
            },

            leave: function (element, done) {
                // outbound picture animation
                //var x = element.hasClass('forward') ? -element[0].clientWidth : element[0].clientWidth;
                var x = element[0].parentElement.parentElement.clientWidth;

                TweenMax.to(element, 10, {x: -x, ease: Expo.easeInOut, onComplete: done});
                console.log('leaving', true);

            }
        };
    });