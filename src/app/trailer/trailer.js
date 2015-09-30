angular.module('Movie.trailer', [])
.config(function ($stateProvider) {
    $stateProvider
        .state('Movie.trailer', {
            url: '/trailer'
        }
    );
})