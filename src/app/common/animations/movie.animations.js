angular.module('Movie.animations', ['ngAnimate'])
    .animation('.main-content', function () {
        return {
            enter: function (element, done) {
                element.hide();

                element.fadeIn(function () {
                    done();
                });
            },
            leave: function (element, done) {
                element.fadeOut(function () {
                    done();
                });
            }
        }
    });
