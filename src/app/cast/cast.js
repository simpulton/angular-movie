angular.module('Movie.cast', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('Movie.cast', {
                url: '/cast'
            }
        );
    });