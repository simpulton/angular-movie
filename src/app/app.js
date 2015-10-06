angular.module('Movie', [
    'ui.router',
    'ngAudio',
    'ui.bootstrap',
    'Movie.home',
    'Movie.gallery',
    'Movie.synopsis',
    'Movie.cast',
    'Movie.trailer',
    'Movie.services.movie',
    'Movie.services.preload',
    'Movie.directives.billboard'
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

            },
        });

    $urlRouterProvider.otherwise("/");

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads
        'self',
        // Allow loading from youtube
        'https://www.youtube.com/**',
        'https://fast.wistia.net/**'
    ]);
})
.constant('ENDPOINT_URI', 'app/data')
.controller('MainCtrl', function ($rootScope, ngAudio) {
    var main = this;

    main.loaded = false;
    main.showAudio = true;

    $rootScope.$on('loaded', function(event, movie) {
        main.loaded = true;

        ngAudio.setUnlock(false);

        main.audio = ngAudio.load(movie.audio[0].src);
        main.audio.play();

        main.handleAudio = function () {
            main.audio.paused ? main.audio.play() : main.audio.pause();
        };
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toPrarms, fromState, fromParams) {
        if (toState.name == 'Movie.trailer') {
            main.audio.pause();
            main.showAudio = false;
        } else if (fromState.name == "Movie.trailer") {
            main.audio.play();
            main.showAudio = true;
        }
    });
});

