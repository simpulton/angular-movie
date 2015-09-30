angular.module('Movie', [
    'ui.router',
    'Movie.home',
    'Movie.gallery',
    'Movie.synopsis',
    'Movie.cast',
    'Movie.trailer'
])
.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    $stateProvider
        .state('Movie', {
            abstract: true,
            url: ''
        });

    $urlRouterProvider.otherwise("/");
})
.controller('MainCtrl', function () {
    var main = this;
});