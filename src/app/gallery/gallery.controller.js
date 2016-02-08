angular.module('Movie.gallery')

.controller('GalleryController', function(movie) {
  var galleryVm = this;

  galleryVm.movie = movie;
  galleryVm.images = movie.images;
  galleryVm.direction = 'backward';
  galleryVm.currentIndex = 0;

  galleryVm.setCurrentSlideIndex = function(index) {
    galleryVm.direction = (index > galleryVm.currentIndex) ? 'backward' : 'forward';
    galleryVm.currentIndex = index;
  };

  galleryVm.isCurrentSlideIndex = function(index) {
    return galleryVm.currentIndex == index;
  };

  galleryVm.nextSlide = function() {
    galleryVm.direction = 'backward';
    galleryVm.currentIndex = (galleryVm.currentIndex < galleryVm.images.length - 1) ? ++galleryVm.currentIndex : 0;
  };

  galleryVm.prevSlide = function() {
    galleryVm.direction = 'forward';
    galleryVm.currentIndex = (galleryVm.currentIndex > 0) ? --galleryVm.currentIndex : galleryVm.images.length - 1;
  };
});
