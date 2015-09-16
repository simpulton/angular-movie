angular.module('Movie.directives.billboard', [])
.directive('billboard', function($timeout) {
  var linker = function(scope, element, attrs){
  };

  return {
    link: linker,
    templateUrl: 'app/common/templates/billboard.tpl.html'
  }
});
