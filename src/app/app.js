angular.module('Movie', [
    'ui.router',
    'Movie.synopsis',
    'Movie.home',
    'Movie.cast',
    'Movie.gallery',
    'Movie.trailer',
    'Movie.services.movie',
    'Movie.directives.back',
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
.controller('MainController', function ($rootScope) {
    var mainVm = this;

    mainVm.loaded = false;

    $rootScope.$on('loaded', function (event, movie) {
        mainVm.loaded = true;
    });
});