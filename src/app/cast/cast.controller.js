angular.module('Movie.cast')
    .controller('CastController', function (movie) {
        var castVm = this;

        castVm.movie = movie;
    });