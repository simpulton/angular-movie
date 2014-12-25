angular.module('Movie.services.preload', [])
.service('PreloadService', function($rootScope, $q) {
  var queue = new createjs.LoadQueue(true),
      isLoaded = false;

  var loadBgs = function(manifest) {
    var bgs = [
      "assets/images/background.jpg",
      "assets/images/bg-synopsis.jpg",
      "assets/images/bg-cast.jpg"
    ];

    return manifest.concat(bgs);
  };

  this.loadManifest = function(manifest) {
    var deferred = $q.defer();

    if (manifest.length == 0) deferred.resolve();

    manifest = loadBgs(manifest);

    queue.loadManifest(manifest);

    queue.on('progress', function(event) {
        $rootScope.$broadcast('queueProgress', event);
    });

    queue.on('complete', function() {
      $rootScope.$broadcast('queueComplete', manifest);
      deferred.resolve();
    });

    return deferred.promise;
  };

  this.getStatus = function () {
    return isLoaded;
  };
});