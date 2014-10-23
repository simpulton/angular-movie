angular.module('Movie.services.movie', [])
.service('MovieService', function($http, ENDPOINT_URI) {
    var currentMovie = {};
    var resource = '/movies/';

    var getUrl = function() {
      return ENDPOINT_URI + resource;
    };

    var getUrlForId = function(id) {
      return getUrl() + id;
    };

    this.setCurrentMovie = function(movie) {
      currentMovie = angular.copy(movie);
    };
    this.getCurrentMovie = function() {
      return currentMovie || null;
    };

    this.fetch = function() {
      return $http.get(getUrl());
    };

    this.create = function(movie) {
      return $http.post(getUrl(), movie);
    };

    this.update = function(id, movie) {
      return $http.put(getUrlForId(id), movie);
    };

    this.destroy = function(id) {
      return $http.delete(getUrlForId(id));
    };
  });