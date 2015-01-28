angular.module('Movie.services.preload', [])
    .service('PreloadService', function ($rootScope, $q) {
        var queue = new createjs.LoadQueue(true);

        var loadBgs = function (manifest) {
            var bgs = [{src: "assets/images/background.jpg"}, {src: "assets/images/bg-synopsis.jpg"}, {src: "assets/images/bg-cast.jpg"}];

            angular.forEach(bgs, function (bg) {
                manifest.push(bg);
            });

            return manifest;
        };

        this.loadManifest = function (movie) {
            var deferred = $q.defer();
            var manifest = [];

            manifest = loadBgs(manifest);

            movie.images.filter(function (image) {
                manifest.push(image);
            });

            if (manifest.length == 0) deferred.resolve();

            queue.on('complete', function () {
                $rootScope.$broadcast('queueComplete', manifest);
                deferred.resolve();
            });

            queue.loadManifest(manifest);

            queue.on('progress', function (event) {
                var progress = event.progress * 100;
                deferred.notify(progress);
            });

            return deferred.promise;
        };
    });