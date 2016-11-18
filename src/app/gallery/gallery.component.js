var gallery = {
  bindings: {
    movie: '<'
  },
  selector: 'gallery',
  controller: 'GalleryController',
  controllerAs: 'galleryVm',
  templateUrl: 'app/gallery/gallery.html'
};

angular.module('Movie.gallery')
.component('gallery', gallery);
