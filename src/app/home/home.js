angular.module('Movie.home', [])
    .config(function ($stateProvider, $sceDelegateProvider) {
        $stateProvider
            .state('Movie.home', {

                url: '/',
                views: {
                    'main@': {
                        templateUrl: 'app/home/home.tpl.html',
                        controller: 'AppCtrl',
                        controllerAs: 'app'
                    }
                }
            }
        );
    })
    .controller('AppCtrl', function ($scope, $sce, $timeout, MovieService) {
        var app = this;

        app.showIframe = true;

        app.renderHtml = function (html) {
            return $sce.trustAsHtml(html);
        };

        MovieService.fetch()
            .then(function (response) {
                app.movie = response.data[0];
            });

        // Init cast
        app.currentCast = 0;

        // Init slideshow
        app.direction = 'forward';
        app.currentIndex = 0;
        app.setCurrentIndex = function (index) {
            app.direction = (index >= app.currentIndex) ? 'forward' : 'reverse';
            if (index >= 0 && index < app.movie.images.length) {
                $timeout(function () {
                    app.currentIndex = index;
                });
            }
        };

    });

