angular.module('Movie', [
    'ui.router',
    'Movie.synopsis',
    'Movie.home',
    'Movie.cast',
    'Movie.gallery',
    'Movie.trailer',
    'Movie.services.movie',
    'Movie.directives.back',
    'Movie.directives.billboard'
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
                }
            }
        });

    $urlRouterProvider.otherwise('/');
})

.constant('ENDPOINT_URI', 'app/data');
