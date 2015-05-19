angular.module('Movie', [
    'ui.router',
    'ui.bootstrap',
    'ngAudio',
    'Movie.home',
    'Movie.gallery',
    'Movie.synopsis',
    'Movie.cast',
    'Movie.trailer',
    'Movie.directives.nav',
    'Movie.directives.thumbnail',
    'Movie.directives.billboard',
    'Movie.services.preload',
    'Movie.services.movie',
    'Movie.services.animations',
    'Movie.animations'
])
    .constant('ENDPOINT_URI', 'app/data')
    .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
        $stateProvider
            .state('Movie', {
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
                                console.log(error);
                            });
                    }

                },
                abstract: true,
                url: ''
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
    .controller('MainCtrl', function (AnimationsService, $rootScope, $state, ngAudio, $timeout, $window) {
        var main = this;

        main.showAudio = true;
        main.loaded = false;

        $rootScope.$on('loaded', function(event, movie) {
            main.loaded = true;

            ngAudio.setUnlock(false);

            main.audio = ngAudio.load(movie.audio[0].src);
            main.audio.play();

            main.handleAudio = function () {
                main.audio.paused ? main.audio.play() : main.audio.pause();
            };
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // State handling for animations
            // Set Default from state to "home"
            fromState = (fromState.name) ? fromState : {name: "home"};

            var tState = toState.name.split('.'),
                fState = fromState.name.split('.'),
                lastIndex = tState.length - 1,
                fLastIndex = fState.length - 1;

            var tostate = tState[lastIndex];
            var fromstate = fState[fLastIndex];

            var currentAnimation = "from-" + fromstate + "-to-" + tostate;

            AnimationsService.setCurrentAnimation(currentAnimation);

            main.toState = tostate;

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
