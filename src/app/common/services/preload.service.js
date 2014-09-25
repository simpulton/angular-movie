angular.module('Movie.services.preload', [])
.service('PreloadService', function($rootScope) {
  var queue = new createjs.LoadQueue(true);

  this.loadManifest = function(manifest) {
    queue.loadManifest(manifest);

    queue.on('progress', function(event) {
        $rootScope.$broadcast('queueProgress', event);
    });

    queue.on('complete', function() {
        $rootScope.$broadcast('queueComplete', manifest);
    });
  };
});