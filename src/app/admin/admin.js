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
    .state('Movie.admin.all', {
      url: "/all",
      templateUrl: 'app/admin/templates/all.tpl.html'
    })
    .state('Movie.admin.info', {
      url: '/info',
      templateUrl: 'app/admin/templates/info.tpl.html'
    })
    .state('Movie.admin.images', {
      url: '/images',
      templateUrl: 'app/admin/templates/images.tpl.html'
    })
    .state('Movie.admin.trailers', {
      url: '/trailers',
      templateUrl: 'app/admin/templates/trailers.tpl.html'
    })
    .state('Movie.admin.cast', {
      url: '/cast',
      templateUrl: 'app/admin/templates/cast.tpl.html'
    })
    .state('Movie.admin.cast.new', {
      url:'/new',
      templateUrl: 'app/admin/templates/cast-new.tpl.html'
    })
    .state('Movie.admin.cast.member', {
      url:'/:id',
      templateUrl: 'app/admin/templates/cast-member.tpl.html',
      controller: function($stateParams, $scope) {
        $scope.memberId = $stateParams.id;
      }
    })
  ;
})
.controller('AdminCtrl', function(PreloadService, MovieService, $scope, $timeout, $state) {
  // TODO: Remove unnecessary code
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
    admin.submitMovie(admin.movieId, admin.editedMovie);
  };

  admin.removeMember = function(index) {
    admin.editedMovie.cast.splice(index, 1);
    admin.submitMovie(admin.movieId, admin.editedMovie);
    $state.go('Movie.admin.cast');
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

  var getMovie = function() {
    MovieService.fetch()
      .then(function(response) {
        admin.editedMovie = movie = response.data[0] || { images: [], trailers: [], cast: [] };
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
        admin.response = { type: 'danger', message: error.data.error.message };
      })
    ;
  };

  admin.submitMovie = function(movieId, editMovie) {
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
        MovieService.setCurrentMovie();
        getMovie();
        add = true;
      }, function(error) {
        admin.response = { type: 'danger', message: error.data.error.message };
      });
  };
})
.animation('.admin-portal', function($rootScope) {
  return {
    enter: function(element, done) {
      var finished = function() {
        $rootScope.$broadcast('animation-done');
        done();
      };
      TweenMax.fromTo( element, 1, { x: -2000, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Expo.easeInOut, onComplete: finished});
    },
    leave: function(element, done) {
      // animation for outbound page
      TweenMax.to( element, 1, { x: 2000, autoAlpha: 0, ease: Expo.easeInOut, onComplete: done });
    }
  };

});
