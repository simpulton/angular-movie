angular.module('Movie.services.preload', [])
.service('PreloadService', function($rootScope, $q) {
  var queue = new createjs.LoadQueue(true),
      isLoaded = false;

  this.loadManifest = function(manifest) {
    var deferred = $q.defer();

    if (manifest.length == 0) deferred.resolve();

    queue.loadManifest(manifest);

    queue.on('progress', function(event) {
        $rootScope.$broadcast('queueProgress', event);
    });

    queue.on('complete', function() {
        isLoaded = true;
        deferred.resolve();
    });

    return deferred.promise;
  };

  this.getStatus = function () {
    return isLoaded;
  };
});