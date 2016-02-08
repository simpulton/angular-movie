angular.module('Movie.animations', ['ngAnimate'])

.animation('.main-content', function() {
  return {
    enter: function(element, done) {
      console.log('page animation in');
      done();
    },
    leave: function(element, done) {
      console.log('page animation out');
      done();
    }
  }
});
