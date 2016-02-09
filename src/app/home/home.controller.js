angular.module('Movie.home')

.controller('HomeController', function() {
  var homeVm = this;

  homeVm.title = 'angular';
  homeVm.release = '09.04.2015';
  homeVm.byline = 'SEE IT IN realD 3D, HFR 3D AND IMAX 3D'
});
