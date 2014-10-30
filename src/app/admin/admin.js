angular.module('Movie.admin', [
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider
    .state('Movie.admin', {
      url: '/admin',
      views: {
        'main@': {
          templateUrl: 'app/admin/admin.tpl.html',
          controller: 'AdminCtrl',
          controllerAs: 'admin'
        }
      }
    })
})
.controller('AdminCtrl', function(PreloadService, MovieService, $scope, $timeout) {
  var admin = this,
      add = false,
      movie = MovieService.getCurrentMovie();

  var datify = function(date) {
    return new Date(date);
  };

  // Initialize movie
  if (movie) {
    admin.movieId = movie.id;
  } else {
    movie = {
      images: [],
      trailers: [],
      cast: []
    };
    admin.movieId = null;
    add = true;
  }

  admin.editedMovie = angular.copy(movie);
  admin.editedMovie.release = datify(admin.editedMovie.release);

  // Methods on the form and scope
  // TODO: Preload images (and perhaps trailers) when added
  admin.addImage = function(newImage) {
    admin.editedMovie.images.push(newImage);
    admin.newImage = {};
  };

  admin.removeImage = function(index) {
    admin.editedMovie.images.splice(index, 1);
  };

  admin.addTrailer = function(newTrailer) {
    admin.editedMovie.trailers.push(newTrailer);
    admin.newTrailer = {};
  };

  admin.removeTrailer = function(index) {
    admin.editedMovie.trailers.splice(index, 1);
  };

  admin.addMember = function(castMember) {
    admin.editedMovie.cast.push(castMember);
    admin.castMember = {};
  };

  admin.removeMember = function(index) {
    admin.editedMovie.cast.splice(index, 1);
  };

  admin.resetForm = function() {
    if (!add) {
      admin.editedMovie = angular.copy(movie);
    } else {
      admin.editedMovie = {
        images: [],
        trailers: [],
        cast: []
      };
    }
    admin.newImage = {};
    admin.newTrailer = {};
    admin.castMember = {};
    admin.editedMovie.release = datify(admin.editedMovie.release);
  };

  admin.populate = function() {
    admin.editedMovie = MovieService.populate();
    admin.editedMovie.release = datify(admin.editedMovie.release);
  };

  // Load iframe
  admin.showAssets = false;

  $scope.$on('animation-done', function() {
    $timeout(function() {
      $scope.$apply(function() {
        admin.showAssets = true;
      });
    })
  });

  // CRUD methods
  admin.response = null;
  admin.deleted = null;

  var parseErrors = function(errors) {

  }

  var getMovie = function() {
    MovieService.fetch()
      .then(function(response) {
        admin.editedMovie = movie = response.data[0];
        if (admin.editedMovie) admin.editedMovie.release = datify(admin.editedMovie.release);
        if (movie) admin.movieId = movie.id;
        MovieService.setCurrentMovie(movie);
      });
  };

  var createMovie = function(editMovie) {
    MovieService.create(editMovie)
      .then(function(response) {
        admin.response = { type: 'success', message: 'Movie created successfully!' };
        admin.resetForm();
        getMovie();
        add = false;
      }, function(error) {
        console.log(error);
        admin.response = { type: 'danger', message: error.data.error.message };
      })
    ;
  };

  var updateMovie = function(movieId, editMovie) {
    MovieService.update(movieId, editMovie)
      .then(function(response) {
        admin.response = { type: 'success', message: 'Movie updated successfully!' };
        admin.resetForm();
        getMovie();
      }, function(error) {
        console.log(error);
        admin.response = { type: 'danger', message: error.data.error.message };
      })
    ;
  };

  admin.submitMovie = function(movieId, editMovie) {
    editMovie = {"movie": editMovie};

    if (add) {
      createMovie(editMovie);
    } else {
      updateMovie(movieId, editMovie);
    }
  };

  admin.deleteMovie = function(id) {
    MovieService.destroy(id)
      .then(function(response) {
        admin.response = { type: 'success', message: 'Movie deleted successfully!' };
        MovieService.setCurrentMovie(null);
        getMovie();
        add = true;
      }, function(error) {
        admin.response = { type: 'danger', message: error.data.error.message };
      });
  };
});
