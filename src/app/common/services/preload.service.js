angular.module('Movie.services.preload', [])
.service('PreloadService', function($rootScope, $q) {
  var queue = new createjs.LoadQueue(true);

  var loadBgs = function(manifest, route) {
    var bgs = {
      home: {
        src: "assets/images/background.jpg"
      }
      ,
      synopsis: {
        src: "assets/images/bg-synopsis.jpg"
      }
      ,
      cast: {
        src: "assets/images/bg-cast.jpg"
      }
    };

    return manifest.concat(bgs[route]);
  };

  this.selectImages = function(movie, route) {
    var manifest = [];

    if (route == 'gallery') {
      movie.images.filter(function(image) {
        manifest.push(image);
      });
    }

    manifest = loadBgs(manifest, route);

    return manifest;
  };

  this.loadManifest = function(manifest) {
    var deferred = $q.defer();

    if (manifest.length == 0) deferred.resolve();

    queue.on('complete', function() {
      $rootScope.$broadcast('queueComplete', manifest);
      deferred.resolve();
    });

    queue.loadManifest(manifest);

    queue.on('progress', function(event) {
      var progress = event.progress * 100;
      deferred.notify(progress);
    });

    return deferred.promise;
  };
});