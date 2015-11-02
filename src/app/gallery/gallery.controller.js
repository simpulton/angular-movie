angular.module('Movie.gallery')
    .controller('GalleryController', function (movie, $timeout) {
        var galleryVM = this;

        galleryVM.images = movie.images;
        galleryVM.direction = 'backward';
        galleryVM.currentIndex = 0;

        galleryVM.setCurrentSlideIndex = function (index) {
            galleryVM.direction = (index > galleryVM.currentIndex) ? 'backward' : 'forward';
            galleryVM.currentIndex = index;
        };

        galleryVM.isCurrentSlideIndex = function (index) {
            return galleryVM.currentIndex == index;
        };

        galleryVM.nextSlide = function () {
            galleryVM.direction = 'backward';
            galleryVM.currentIndex = (galleryVM.currentIndex < galleryVM.images.length - 1) ? ++galleryVM.currentIndex : 0;
        };

        galleryVM.prevSlide = function () {
            galleryVM.direction = 'forward';
            galleryVM.currentIndex = (galleryVM.currentIndex > 0) ? --galleryVM.currentIndex : galleryVM.images.length - 1;
        };
    });
