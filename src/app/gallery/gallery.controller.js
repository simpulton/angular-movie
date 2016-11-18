function GalleryController() {
  var galleryVm = this;

  galleryVm.$onInit = function () {
    galleryVm.direction = 'backward';
    galleryVm.currentIndex = 0;
    galleryVm.setCurrentSlideIndex = setCurrentSlideIndex;
    galleryVm.isCurrentSlideIndex = isCurrentSlideIndex;
    galleryVm.nextSlide = nextSlide;
    galleryVm.prevSlide = prevSlide;
  };

  function setCurrentSlideIndex(index) {
    galleryVm.direction = (index > galleryVm.currentIndex) ? 'backward' : 'forward';
    galleryVm.currentIndex = index;
  }

  function isCurrentSlideIndex(index) {
    return galleryVm.currentIndex == index;
  }

  function nextSlide() {
    galleryVm.direction = 'backward';
    galleryVm.currentIndex = (galleryVm.currentIndex < galleryVm.movie.images.length - 1) ? ++galleryVm.currentIndex : 0;
  }

  function prevSlide() {
    galleryVm.direction = 'forward';
    galleryVm.currentIndex = (galleryVm.currentIndex > 0) ? --galleryVm.currentIndex : galleryVm.movie.images.length - 1;
  }
}

angular.module('Movie.gallery')
.controller('GalleryController', GalleryController);
