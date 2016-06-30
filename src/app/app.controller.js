function MainController($rootScope, ngAudio, AnimationsService) {
  var mainVm = this;

  mainVm.$onInit = function () {
    mainVm.loaded = false;
    mainVm.showAudio = true;
  };

  $rootScope.$on('loaded', function(event, movie) {
    mainVm.loaded = true;

    setUpAudio(movie);
  });

  function setUpAudio(movie) {
    ngAudio.setUnlock(false);

    mainVm.audio = ngAudio.load(movie.audio[0].src);
    mainVm.audio.play();

    mainVm.handleAudio = function() {
      return mainVm.audio.paused ? mainVm.audio.play() : mainVm.audio.pause();
    };

    $rootScope.$on('$stateChangeSuccess', handleStateChangeAudio);
  }

  function handleStateChangeAudio(event, toState, toPrarms, fromState, fromParams) {
    if (toState.name == 'Movie.trailer') {
      mainVm.audio.pause();
      mainVm.showAudio = false;
    } else if (fromState.name == "Movie.trailer") {
      mainVm.audio.play();
      mainVm.showAudio = true;
    }
  }
}

angular.module('Movie')
.controller('MainController', MainController);
