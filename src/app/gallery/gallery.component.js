var gallery = {
  selector: 'gallery',
  controller: 'GalleryController',
  controllerAs: 'galleryVm',
  templateUrl: 'app/gallery/gallery.tpl.html'
};

angular.module('Movie.gallery')
.component('gallery', gallery);
