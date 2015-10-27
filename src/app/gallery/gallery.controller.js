angular.module('Movie.gallery')
    .controller('GalleryController', function (movie) {
        var galleryVm = this;

        galleryVm.movie = movie;
    });