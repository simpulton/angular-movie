function GalleryController(MovieService) {
  var galleryVm = this;

  galleryVm.direction = 'backward';
  galleryVm.currentIndex = 0;
  galleryVm.setCurrentSlideIndex = setCurrentSlideIndex;
  galleryVm.isCurrentSlideIndex = isCurrentSlideIndex;
  galleryVm.nextSlide = nextSlide;
  galleryVm.prevSlide = prevSlide;

  getMovie();

  function getMovie() {
    MovieService
    .fetch()
    .then(getResults);
  }

  function getResults(movie) {
    galleryVm.movie = movie[0];
    galleryVm.images = galleryVm.movie.images;
  }

  function setCurrentSlideIndex(index) {
    galleryVm.direction = (index > galleryVm.currentIndex) ? 'backward' : 'forward';
    galleryVm.currentIndex = index;
  }

  function isCurrentSlideIndex(index) {
    return galleryVm.currentIndex == index;
  }

  function nextSlide() {
    galleryVm.direction = 'backward';
    galleryVm.currentIndex = (galleryVm.currentIndex < galleryVm.images.length - 1) ? ++galleryVm.currentIndex : 0;
  }

  function prevSlide() {
    galleryVm.direction = 'forward';
    galleryVm.currentIndex = (galleryVm.currentIndex > 0) ? --galleryVm.currentIndex : galleryVm.images.length - 1;
  }
}

angular.module('Movie.gallery')
.controller('GalleryController', GalleryController);
