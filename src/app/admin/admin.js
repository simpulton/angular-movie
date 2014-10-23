angular.module('Movie.admin', [
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider
    .state('Movie.admin', {
      resolve: {
        movie: function(MovieService) {
          return MovieService.fetch()
            .then(function(response) {
              return response.data[0];
            });
        }
      },
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
.controller('AdminCtrl', function(MovieService, movie, $rootScope) {
  var admin = this,
      add = false;

  var datify = function(date) {
    return new Date(date);
  };

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
    };
    admin.newImage = {};
    admin.newTrailer = {};
    admin.castMember = {};
    admin.editedMovie.release = datify(admin.editedMovie.release);
  };


  // CRUD methods
  admin.response = null;
  admin.deleted = null;

  admin.getMovie = function() {
    MovieService.fetch()
      .then(function(response) {
        admin.editedMovie = response.data[0];
        if (admin.editedMovie) admin.editedMovie.release = datify(admin.editedMovie.release);
        movie = response.data[0];
        if (movie) admin.movieId = movie.id;
      });
  };

  admin.submitMovie = function(movieId, editMovie) {
    if (add) {
      MovieService.create(editMovie)
        .then(function(response) {
          admin.response = {
            type: 'success',
            message: 'Movie created successfully!'
          };
          admin.getMovie();
          admin.resetForm();
          add = false;
        }, function(error) {
          admin.response = {
            type: 'danger',
            message: error.data.error.message
          };
        })
      ;
    } else {
      MovieService.update(movieId, editMovie)
        .then(function(response) {
          admin.response = {
            type: 'success',
            message: 'Movie updated successfully!'
          };
          admin.getMovie();
          admin.resetForm(admin.editedMovie);
        }, function(error) {
          admin.response = {
            type: 'danger',
            message: error.data.error.message
          };
        })
      ;
    }

  };

  admin.deleteMovie = function(id) {
    MovieService.destroy(id)
      .then(function(response) {
        admin.response = {
          type: 'success',
          message: 'Movie deleted successfully!'
        };
        admin.getMovie();
        add = true;
      }, function(error) {
        admin.response = {
          type: 'danger',
          message: error.data.error.message
        };
      });
  };

});