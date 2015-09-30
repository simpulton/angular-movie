angular.module('Movie.gallery', [])
.config(function ($stateProvider) {
    $stateProvider
        .state('Movie.gallery', {
            url: '/gallery'
        }
    );
})