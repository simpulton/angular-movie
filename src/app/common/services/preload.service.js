angular.module('Movie.services.preload', [])
.service('PreloadService', function($rootScope, $q) {
  var queue = new createjs.LoadQueue(true),
      isLoaded = false;

  var loadBgs = function(manifest) {
    var bgs = [
      {src: "assets/images/background.jpg"},
      {src: "assets/images/bg-synopsis.jpg"},
      {src: "assets/images/bg-cast.jpg"}
    ];

    return manifest.concat(bgs);
  };

  this.loadManifest = function(manifest) {
    var deferred = $q.defer();
    $rootScope.loadItems = [];

    if (manifest.length == 0) deferred.resolve();

    manifest = loadBgs(manifest);


    queue.on('loadstart', function(event) {
//      $rootScope.loadItems = event.target._loadItemsBySrc;
    });

    queue.on('fileload', function(event) {
      $rootScope.loadItems.push(event.item.src);
    });

    queue.on('complete', function() {
      $rootScope.$broadcast('queueComplete', manifest);
      deferred.resolve();
    });

    queue.loadManifest(manifest);

    queue.on('progress', function(event) {
      $rootScope.$broadcast('queueProgress', event);
    });


    return deferred.promise;
  };

  this.getStatus = function () {
    return isLoaded;
  };
});