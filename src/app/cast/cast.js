angular.module('Movie.cast', [])
.config(function ($stateProvider) {
    $stateProvider
        .state('Movie.cast', {
            url: '/cast',
            views: {
                'main@': {
                    templateUrl: 'app/cast/cast.tpl.html',
                    controller: 'AppCtrl',
                    controllerAs: 'app'
                }
            }
        }
    );
})