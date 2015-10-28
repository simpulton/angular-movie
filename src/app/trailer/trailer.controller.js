angular.module('Movie.trailer')
    .controller('TrailerController', function (movie) {
        var trailerVm = this;

        trailerVm.movie = movie;
    });