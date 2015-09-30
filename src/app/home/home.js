angular.module('Movie.home', [])
.config(function ($stateProvider, $sceDelegateProvider) {
    $stateProvider
        .state('Movie.home', {
            url: '/'
        }
    );
})