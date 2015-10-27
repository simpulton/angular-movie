angular.module('Movie.home', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('Movie.home', {
                url: '/'
            }
        );
    });