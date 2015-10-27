angular.module('Movie.synopsis', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('Movie.synopsis', {
                url: '/synopsis'
            }
        );
    });