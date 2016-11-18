var billboard = {
  bindings: {
    movie: '<'
  },
  selector: 'billboard',
  controller: function ($element) {
    TweenMax.fromTo( $element, 1, { x: -500, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut, delay: 0.5 });
  },
  controllerAs: 'billboardVm',
  templateUrl: 'app/common/components/billboard/billboard.html'
};

angular.module('Movie.components.billboard', [])
.component('billboard', billboard);