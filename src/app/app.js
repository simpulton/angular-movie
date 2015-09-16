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
    'Movie.services.movie'
])
    .constant('ENDPOINT_URI', 'app/data')
    .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
        $stateProvider
            .state('Movie', {
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
    .controller('MainCtrl', function ($rootScope, $state, ngAudio, $timeout, $window, MovieService) {
        var main = this;

        MovieService.fetch()
            .then(function (response) {
                main.movie = response.data[0];
                main.showAudio = true;

                ngAudio.setUnlock(false);

                main.audio = ngAudio.load(main.movie.audio[0].src);
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
