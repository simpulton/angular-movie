angular.module('Movie.directives.billboard', [])
.directive('billboard', function($timeout) {
  var linker = function(scope, element, attrs){
    TweenMax.fromTo( element, 1, { x: -500, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, delay: 1.5 });
  };

  return {
    link: linker,
    templateUrl: 'app/common/templates/billboard.tpl.html'
  }
});
