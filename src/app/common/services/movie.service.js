angular.module('Movie.services.movie', [])

.service('MovieService', function($http, ENDPOINT_URI) {
  var resource = '/movie.json';

  var getUrl = function() {
    return ENDPOINT_URI + resource;
  };

  this.fetch = function() {
    return $http.get(getUrl());
  };
});
