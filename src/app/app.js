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
    'Movie.services.preload',
    'Movie.filters.startIndex'
])
.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
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

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads
        'self',
        // Allow loading from youtube
        'https://www.youtube.com/**',
        'https://fast.wistia.net/**'
    ]);
})
.constant('ENDPOINT_URI', 'app/data')
.controller('MainController', function ($rootScope, ngAudio) {
    var mainVm = this;

    mainVm.loaded = false;
    mainVm.showAudio = true;

    $rootScope.$on('loaded', function (event, movie) {
        mainVm.loaded = true;

        ngAudio.setUnlock(false);

        mainVm.audio = ngAudio.load(movie.audio[0].src);
        mainVm.audio.play();

        mainVm.handleAudio = function () {
            mainVm.audio.paused ? mainVm.audio.play() : mainVm.audio.pause();
        };
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toPrarms, fromState, fromParams) {
        if (toState.name == 'Movie.trailer') {
            mainVm.audio.pause();
            mainVm.showAudio = false;
        } else if (fromState.name == "Movie.trailer") {
            mainVm.audio.play();
            mainVm.showAudio = true;
        }
    });
});