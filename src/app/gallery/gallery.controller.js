angular.module('Movie.gallery')
    .controller('GalleryController', function (movie, $timeout) {
        var galleryVm = this;

        galleryVm.movie = movie;
        galleryVm.currentIndex = 0;
        galleryVm.sliderIndex = 0;
        galleryVm.sliderStep = 5;

        galleryVm.setCurrentIndex = function (index) {
            if (index >= 0 && index < galleryVm.movie.images.length) {
                galleryVm.currentIndex = index;
            }
        };

        galleryVm.slideRight = function () {
            galleryVm.sliderIndex += galleryVm.sliderStep;
        };

        galleryVm.slideLeft = function () {
            galleryVm.sliderIndex -= galleryVm.sliderStep;
        };

        galleryVm.rightSliderArrowVisible = function () {
            return galleryVm.movie.images[galleryVm.sliderIndex + galleryVm.sliderStep];
        };

        galleryVm.leftSliderArrowVisible = function () {
            return galleryVm.movie.images[galleryVm.sliderIndex - galleryVm.sliderStep];
        };
    });