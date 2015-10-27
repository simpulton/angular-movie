angular.module('Movie.synopsis')
    .controller('SynopsisController', function (movie) {
        var synopsisVm = this;

        synopsisVm.movie = movie;
    });