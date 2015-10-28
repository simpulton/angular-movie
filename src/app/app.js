angular.module('Movie', [
    'ui.router',
    'ngAudio',
    'Movie.synopsis',
    'Movie.home',
    'Movie.cast',
    'Movie.gallery',
    'Movie.trailer',
    'Movie.services.movie',
    'Movie.directives.billboard',
    'Movie.services.preload'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('Movie', {
            abstract: true,
            url: '',
            resolve: {
                movie: function (MovieService) {
                    return MovieService.fetch()
                        .then(function (response) {
                            return response.data[0];
                        });
                },
                loaded: function (PreloadService, movie, $rootScope) {
                    return PreloadService.loadManifest(movie)
                        .then(function (response) {
                            $rootScope.$broadcast('loaded', movie);
                            return response;
                        }, function (error) {
                            console.error(error);
                        });
                }
            }
        });

    $urlRouterProvider.otherwise('/');
})
.constant('ENDPOINT_URI', 'app/data')
.controller('MainController', function ($rootScope, ngAudio) {
    var mainCtrl = this;

    mainCtrl.loaded = false;
    mainCtrl.showAudio = true;

    $rootScope.$on('loaded', function (event, movie) {
        mainCtrl.loaded = true;

        ngAudio.setUnlock(false);

        mainCtrl.audio = ngAudio.load(movie.audio[0].src);
        mainCtrl.audio.play();

        mainCtrl.handleAudio = function () {
            mainCtrl.audio.paused ? mainCtrl.audio.play() : mainCtrl.audio.pause();
        };
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toPrarms, fromState, fromParams) {
        if (toState.name == 'Movie.trailer') {
            mainCtrl.audio.pause();
            mainCtrl.showAudio = false;
        } else if (fromState.name == "Movie.trailer") {
            mainCtrl.audio.play();
            mainCtrl.showAudio = true;
        }
    });
});