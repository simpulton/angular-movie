angular.module('Movie.filters.startIndex', [])
    .filter('startIndex', function () {
        return function (input, startIndex) {
            return input.slice(startIndex, input.length);
        }
    });