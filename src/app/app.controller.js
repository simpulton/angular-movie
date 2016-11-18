function MainController($rootScope, ngAudio, $transitions) {
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

    $transitions.onSuccess({}, handleStateChangeAudio);
  }

  function handleStateChangeAudio($transition$) {
    var toState = $transition$.$to(),
      fromState = $transition$.$from();

    if (toState.name == 'trailer') {
      mainVm.audio.pause();
      mainVm.showAudio = false;
    } else if (fromState.name == 'trailer') {
      mainVm.audio.play();
      mainVm.showAudio = true;
    }
  }
}

angular.module('Movie')
.controller('MainController', MainController);
