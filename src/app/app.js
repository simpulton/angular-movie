angular.module('Movie', [
    'ui.router',
    'Movie.home',
    'Movie.gallery',
    'Movie.synopsis',
    'Movie.cast',
    'Movie.trailer',
    'Movie.services.movie'
])
.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    $stateProvider
        .state('Movie', {
            abstract: true,
            url: '',
            resolve: {
                movie: function (MovieService, $rootScope) {
                    return MovieService.fetch()
                        .then(function (response) {
                            $rootScope.$broadcast('loaded', response.data[0]);
                            return response.data[0];
                        });
                }

            },
        });

    $urlRouterProvider.otherwise("/");
})
.constant('ENDPOINT_URI', 'app/data')
.controller('MainCtrl', function ($rootScope) {
    var main = this;
    
});