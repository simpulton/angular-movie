function PreloadService($rootScope, $q) {
  var queue = new createjs.LoadQueue(true);

  this.loadManifest = loadManifest;
  
  function loadBgs() {
    return [
      { src: "assets/images/background.jpg" },
      { src: "assets/images/bg-synopsis.jpg" },
      { src: "assets/images/bg-cast.jpg "}
    ];
  };

  function loadManifest(movie) {
    var deferred = $q.defer(),
        manifest = loadBgs();

    movie.images.filter(function (image) {
      manifest.push(image);
    });

    if (manifest.length == 0) deferred.resolve();

    queue.on('complete', function () {
      deferred.resolve();
    });

    queue.loadManifest(manifest);

    return deferred.promise;
  }
}

angular.module('Movie.services.preload', [])
.service('PreloadService', PreloadService);
