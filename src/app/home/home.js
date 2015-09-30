angular.module('Movie.home', [])
.config(function ($stateProvider, $sceDelegateProvider) {
    $stateProvider
        .state('Movie.home', {
            url: '/',
            views: {
                    'main@': {
                        templateUrl: 'app/home/home.tpl.html',
                        controller: 'AppCtrl',
                        controllerAs: 'app'
                    }
                }
            }
        );
})
.controller('AppCtrl', function ($rootScope, movie) {
    var app = this;
    app.movie = movie;
});