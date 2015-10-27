angular.module('Movie.home')
    .controller('HomeController', function () {
        var homeVm = this;

        homeVm.title = "angular";
        homeVm.release = "09.04.2015";

        console.log('HomeController');
    });