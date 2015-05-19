angular.module('Movie.services.movie', [])
.service('MovieService', function($http, ENDPOINT_URI) {
    var getUrl = function() {
      return ENDPOINT_URI;
    };

    this.getMovie = function() {
      return $http.get(getUrl());
    };
  })