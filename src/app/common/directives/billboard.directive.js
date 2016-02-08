angular.module('Movie.directives.billboard', [])

.directive('billboard', function() {
  function link(scope, element, attrs) {
    TweenMax.fromTo( element, 1, { x: -500, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, delay: 0.5 });
  }

  return {
    restrict: 'E',
    link: link,
    templateUrl: 'app/common/templates/billboard.tpl.html',
    controller: function () {},
    controllerAs: 'billboardVm',
    scope: true,
    bindToController: {
        movie: '='
    }
  }
});
