angular.module('Movie', [
    'ui.router',
    'Movie.home',
    'Movie.synopsis',
    'Movie.cast',
    'Movie.gallery',
    'Movie.trailer'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('Movie', {
            abstract: true,
            url: ''
        });

    $urlRouterProvider.otherwise('/');
});