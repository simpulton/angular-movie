angular.module('Movie.gallery', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('Movie.gallery', {
                url: '/gallery',
                views: {
                    'main@': {
                        templateUrl: 'app/gallery/gallery.tpl.html',
                        controller: 'GalleryController',
                        controllerAs: 'galleryVm'
                    }
                }
            }
        );
    });