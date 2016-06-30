function MovieService($q, $http, ENDPOINT_URI) {
  var resource = '/movie.json',
      movie = [];

  this.fetch = fetch;

  function getUrl() {
    return ENDPOINT_URI + resource;
  }

  function cacheResults(result) {
    movie = result.data;
    return movie;
  }

  function fetch() {
    return movie.length ? $q.when(movie) : $http.get(getUrl()).then(cacheResults);
  }
}

angular.module('Movie.services.movie', [])
.service('MovieService', MovieService);
