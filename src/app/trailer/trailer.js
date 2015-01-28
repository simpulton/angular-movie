angular.module('Movie.trailer', [
    'ui.router'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('Movie.trailer', {
                url: '/trailer',
                views: {
                    'main@': {
                        templateUrl: 'app/trailer/trailer.tpl.html',
                        controller: 'AppCtrl',
                        controllerAs: 'app'
                    }
                }
            }
        );
    })