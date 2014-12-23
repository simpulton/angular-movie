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
        $rootScope.$broadcast('queueComplete', manifest);
        deferred.resolve();
    });

    return deferred.promise;
  };

  this.getStatus = function () {
    return isLoaded;
  };
});