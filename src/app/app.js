angular.module('Movie', [
    'ui.router',
    'Movie.home',
    'Movie.gallery',
    'Movie.synopsis',
    'Movie.cast',
    'Movie.trailer',
    'Movie.services.movie',
    'Movie.services.preload'
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
.controller('MainCtrl', function ($rootScope) {
    var main = this;

    main.loaded = false;

    $rootScope.$on('loaded', function(event, movie) {
        main.loaded = true;
    });
});