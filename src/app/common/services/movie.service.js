angular.module('Movie.services.movie', [])
.service('MovieService', function($http, ENDPOINT_URI) {
    var currentMovie = null;
    var resource = '/movies';

    var getUrl = function() {
      return ENDPOINT_URI + resource;
    };

    var getUrlForId = function(id) {
      return getUrl() + '/' + id;
    };

    this.setCurrentMovie = function(movie) {
      currentMovie = angular.copy(movie) || null;
    };
    this.getCurrentMovie = function() {
      return currentMovie || null;
    };

    this.fetch = function() {
      return $http.get(getUrl());
    };

    this.create = function(movie) {
      return $http.post(getUrl(), movie);
    };

    this.update = function(id, movie) {
      return $http.put(getUrlForId(id), movie);
    };

    this.destroy = function(id) {
      return $http.delete(getUrlForId(id));
    };

    // Prepopulated movie data for us lazy folk
    this.populate = function() {
      return {
        "title": "Angular",
        "release": "09.04.2014",
        "synopsis": "Bacon ipsum dolor sit amet short ribs pancetta shoulder frankfurter chuck ham hock kevin jerky kielbasa. Beef prosciutto doner brisket tri-tip shankle. Corned beef pork ham hock t-bone, drumstick fatback rump pork chop. Spare ribs swine chicken kielbasa ribeye, shoulder salami cow frankfurter ground round pastrami landjaeger. Sirloin beef hamburger bacon pork belly chuck t-bone tenderloin turducken jerky. Jerky t-bone short ribs, beef ribs prosciutto strip steak pastrami boudin brisket ground round drumstick capicola. Sausage swine brisket, frankfurter meatloaf jerky ball tip t-bone shoulder prosciutto pork loin shank sirloin tri-tip ham. Shankle hamburger jowl tenderloin leberkas. Jowl swine ham, ground round hamburger tongue sausage chuck andouille meatloaf. Sausage shankle salami sirloin tri-tip fatback, landjaeger kevin brisket shoulder andouille. Bresaola sirloin jowl tenderloin prosciutto ground round corned beef swine brisket boudin fatback capicola t-bone beef ribs andouille. Tri-tip t-bone swine boudin ground round, kielbasa pork turkey pork loin shankle frankfurter shoulder pastrami rump sausage. Pig ground round meatball t-bone, jerky doner pork belly andouille. Prosciutto andouille pork belly jowl tail pastrami short ribs kevin. Strip steak ground round turducken salami brisket shank tenderloin porchetta pancetta bacon kielbasa pork loin beef ribs frankfurter. Pastrami rump flank bresaola shankle. Pancetta filet mignon andouille pork kielbasa tri-tip chuck swine boudin bacon short ribs. Frankfurter short loin bresaola pancetta, flank venison biltong landjaeger pork loin tail. Short loin bacon leberkas, spare ribs jerky ribeye beef ribs tail brisket biltong jowl short ribs strip steak. Porchetta kielbasa flank, ham meatloaf pork loin rump pork ham hock andouille frankfurter. Tail capicola bresaola, filet mignon biltong sausage pork chop meatloaf shankle pork loin pancetta salami beef ribs kielbasa. Landjaeger venison ground round salami, andouille hamburger short loin sausage pork fatback strip steak. Tri-tip ground round ball tip, leberkas kielbasa turducken short loin doner spare ribs bacon sirloin chuck capicola jerky beef. Pork strip steak andouille turducken. Corned beef shankle t-bone flank turkey kevin venison sirloin meatloaf ribeye andouille drumstick.",
        "cast": [
          {
            "name": "Shane Mielke",
            "character": "Milkbeast",
            "description": "Bacon ipsum dolor sit amet short ribs pancetta shoulder frankfurter chuck ham hock kevin jerky kielbasa. Beef prosciutto doner brisket tri-tip shankle. Corned beef pork ham hock t-bone, drumstick fatback rump pork chop. Spare ribs swine chicken kielbasa ribeye, shoulder salami cow frankfurter ground round pastrami landjaeger. Sirloin beef hamburger bacon pork belly chuck t-bone tenderloin turducken jerky. Jerky t-bone short ribs, beef ribs prosciutto strip steak pastrami boudin brisket ground round drumstick capicola. Sausage swine brisket, frankfurter meatloaf jerky ball tip t-bone shoulder prosciutto pork loin shank sirloin tri-tip ham. Shankle hamburger jowl tenderloin leberkas. Jowl swine ham, ground round hamburger tongue sausage chuck andouille meatloaf. Sausage shankle salami sirloin tri-tip fatback, landjaeger kevin brisket shoulder andouille. Bresaola sirloin jowl tenderloin prosciutto ground round corned beef swine brisket boudin fatback capicola t-bone beef ribs andouille. Tri-tip t-bone swine boudin ground round, kielbasa pork turkey pork loin shankle frankfurter shoulder pastrami rump sausage. Pig ground round meatball t-bone, jerky doner pork belly andouille. Prosciutto andouille pork belly jowl tail pastrami short ribs kevin. Strip steak ground round turducken salami brisket shank tenderloin porchetta pancetta bacon kielbasa pork loin beef ribs frankfurter. Pastrami rump flank bresaola shankle. Pancetta filet mignon andouille pork kielbasa tri-tip chuck swine boudin bacon short ribs. Frankfurter short loin bresaola pancetta, flank venison biltong landjaeger pork loin tail. Short loin bacon leberkas, spare ribs jerky ribeye beef ribs tail brisket biltong jowl short ribs strip steak. Porchetta kielbasa flank, ham meatloaf pork loin rump pork ham hock andouille frankfurter. Tail capicola bresaola, filet mignon biltong sausage pork chop meatloaf shankle pork loin pancetta salami beef ribs kielbasa. Landjaeger venison ground round salami, andouille hamburger short loin sausage pork fatback strip steak. Tri-tip ground round ball tip, leberkas kielbasa turducken short loin doner spare ribs bacon sirloin chuck capicola jerky beef. Pork strip steak andouille turducken. Corned beef shankle t-bone flank turkey kevin venison sirloin meatloaf ribeye andouille drumstick."
          },
          {
            "name": "Lukas Ruebbelke",
            "character": "Milkman",
            "description": "Bacon ipsum dolor sit amet short ribs pancetta shoulder frankfurter chuck ham hock kevin jerky kielbasa. Beef prosciutto doner brisket tri-tip shankle. Corned beef pork ham hock t-bone, drumstick fatback rump pork chop. Spare ribs swine chicken kielbasa ribeye, shoulder salami cow frankfurter ground round pastrami landjaeger. Sirloin beef hamburger bacon pork belly chuck t-bone tenderloin turducken jerky. Jerky t-bone short ribs, beef ribs prosciutto strip steak pastrami boudin brisket ground round drumstick capicola. Sausage swine brisket, frankfurter meatloaf jerky ball tip t-bone shoulder prosciutto pork loin shank sirloin tri-tip ham. Shankle hamburger jowl tenderloin leberkas. Jowl swine ham, ground round hamburger tongue sausage chuck andouille meatloaf. Sausage shankle salami sirloin tri-tip fatback, landjaeger kevin brisket shoulder andouille. Bresaola sirloin jowl tenderloin prosciutto ground round corned beef swine brisket boudin fatback capicola t-bone beef ribs andouille. Tri-tip t-bone swine boudin ground round, kielbasa pork turkey pork loin shankle frankfurter shoulder pastrami rump sausage. Pig ground round meatball t-bone, jerky doner pork belly andouille. Prosciutto andouille pork belly jowl tail pastrami short ribs kevin. Strip steak ground round turducken salami brisket shank tenderloin porchetta pancetta bacon kielbasa pork loin beef ribs frankfurter. Pastrami rump flank bresaola shankle. Pancetta filet mignon andouille pork kielbasa tri-tip chuck swine boudin bacon short ribs. Frankfurter short loin bresaola pancetta, flank venison biltong landjaeger pork loin tail. Short loin bacon leberkas, spare ribs jerky ribeye beef ribs tail brisket biltong jowl short ribs strip steak. Porchetta kielbasa flank, ham meatloaf pork loin rump pork ham hock andouille frankfurter. Tail capicola bresaola, filet mignon biltong sausage pork chop meatloaf shankle pork loin pancetta salami beef ribs kielbasa. Landjaeger venison ground round salami, andouille hamburger short loin sausage pork fatback strip steak. Tri-tip ground round ball tip, leberkas kielbasa turducken short loin doner spare ribs bacon sirloin chuck capicola jerky beef. Pork strip steak andouille turducken. Corned beef shankle t-bone flank turkey kevin venison sirloin meatloaf ribeye andouille drumstick."
          },
          {
            "name": "Rich Froning Jr.",
            "character": "Curds",
            "description": "Bacon ipsum dolor sit amet short ribs pancetta shoulder frankfurter chuck ham hock kevin jerky kielbasa. Beef prosciutto doner brisket tri-tip shankle. Corned beef pork ham hock t-bone, drumstick fatback rump pork chop. Spare ribs swine chicken kielbasa ribeye, shoulder salami cow frankfurter ground round pastrami landjaeger. Sirloin beef hamburger bacon pork belly chuck t-bone tenderloin turducken jerky. Jerky t-bone short ribs, beef ribs prosciutto strip steak pastrami boudin brisket ground round drumstick capicola. Sausage swine brisket, frankfurter meatloaf jerky ball tip t-bone shoulder prosciutto pork loin shank sirloin tri-tip ham. Shankle hamburger jowl tenderloin leberkas. Jowl swine ham, ground round hamburger tongue sausage chuck andouille meatloaf. Sausage shankle salami sirloin tri-tip fatback, landjaeger kevin brisket shoulder andouille. Bresaola sirloin jowl tenderloin prosciutto ground round corned beef swine brisket boudin fatback capicola t-bone beef ribs andouille. Tri-tip t-bone swine boudin ground round, kielbasa pork turkey pork loin shankle frankfurter shoulder pastrami rump sausage. Pig ground round meatball t-bone, jerky doner pork belly andouille. Prosciutto andouille pork belly jowl tail pastrami short ribs kevin. Strip steak ground round turducken salami brisket shank tenderloin porchetta pancetta bacon kielbasa pork loin beef ribs frankfurter. Pastrami rump flank bresaola shankle. Pancetta filet mignon andouille pork kielbasa tri-tip chuck swine boudin bacon short ribs. Frankfurter short loin bresaola pancetta, flank venison biltong landjaeger pork loin tail. Short loin bacon leberkas, spare ribs jerky ribeye beef ribs tail brisket biltong jowl short ribs strip steak. Porchetta kielbasa flank, ham meatloaf pork loin rump pork ham hock andouille frankfurter. Tail capicola bresaola, filet mignon biltong sausage pork chop meatloaf shankle pork loin pancetta salami beef ribs kielbasa. Landjaeger venison ground round salami, andouille hamburger short loin sausage pork fatback strip steak. Tri-tip ground round ball tip, leberkas kielbasa turducken short loin doner spare ribs bacon sirloin chuck capicola jerky beef. Pork strip steak andouille turducken. Corned beef shankle t-bone flank turkey kevin venison sirloin meatloaf ribeye andouille drumstick."
          },
          {
            "name": "Sam Briggs",
            "character": "Whey",
            "description": "Bacon ipsum dolor sit amet short ribs pancetta shoulder frankfurter chuck ham hock kevin jerky kielbasa. Beef prosciutto doner brisket tri-tip shankle. Corned beef pork ham hock t-bone, drumstick fatback rump pork chop. Spare ribs swine chicken kielbasa ribeye, shoulder salami cow frankfurter ground round pastrami landjaeger. Sirloin beef hamburger bacon pork belly chuck t-bone tenderloin turducken jerky. Jerky t-bone short ribs, beef ribs prosciutto strip steak pastrami boudin brisket ground round drumstick capicola. Sausage swine brisket, frankfurter meatloaf jerky ball tip t-bone shoulder prosciutto pork loin shank sirloin tri-tip ham. Shankle hamburger jowl tenderloin leberkas. Jowl swine ham, ground round hamburger tongue sausage chuck andouille meatloaf. Sausage shankle salami sirloin tri-tip fatback, landjaeger kevin brisket shoulder andouille. Bresaola sirloin jowl tenderloin prosciutto ground round corned beef swine brisket boudin fatback capicola t-bone beef ribs andouille. Tri-tip t-bone swine boudin ground round, kielbasa pork turkey pork loin shankle frankfurter shoulder pastrami rump sausage. Pig ground round meatball t-bone, jerky doner pork belly andouille. Prosciutto andouille pork belly jowl tail pastrami short ribs kevin. Strip steak ground round turducken salami brisket shank tenderloin porchetta pancetta bacon kielbasa pork loin beef ribs frankfurter. Pastrami rump flank bresaola shankle. Pancetta filet mignon andouille pork kielbasa tri-tip chuck swine boudin bacon short ribs. Frankfurter short loin bresaola pancetta, flank venison biltong landjaeger pork loin tail. Short loin bacon leberkas, spare ribs jerky ribeye beef ribs tail brisket biltong jowl short ribs strip steak. Porchetta kielbasa flank, ham meatloaf pork loin rump pork ham hock andouille frankfurter. Tail capicola bresaola, filet mignon biltong sausage pork chop meatloaf shankle pork loin pancetta salami beef ribs kielbasa. Landjaeger venison ground round salami, andouille hamburger short loin sausage pork fatback strip steak. Tri-tip ground round ball tip, leberkas kielbasa turducken short loin doner spare ribs bacon sirloin chuck capicola jerky beef. Pork strip steak andouille turducken. Corned beef shankle t-bone flank turkey kevin venison sirloin meatloaf ribeye andouille drumstick."
          },
          {
            "name": "Annie Thorisdottir",
            "character": "Heroine",
            "description": "Bacon ipsum dolor sit amet short ribs pancetta shoulder frankfurter chuck ham hock kevin jerky kielbasa. Beef prosciutto doner brisket tri-tip shankle. Corned beef pork ham hock t-bone, drumstick fatback rump pork chop. Spare ribs swine chicken kielbasa ribeye, shoulder salami cow frankfurter ground round pastrami landjaeger. Sirloin beef hamburger bacon pork belly chuck t-bone tenderloin turducken jerky. Jerky t-bone short ribs, beef ribs prosciutto strip steak pastrami boudin brisket ground round drumstick capicola. Sausage swine brisket, frankfurter meatloaf jerky ball tip t-bone shoulder prosciutto pork loin shank sirloin tri-tip ham. Shankle hamburger jowl tenderloin leberkas. Jowl swine ham, ground round hamburger tongue sausage chuck andouille meatloaf. Sausage shankle salami sirloin tri-tip fatback, landjaeger kevin brisket shoulder andouille. Bresaola sirloin jowl tenderloin prosciutto ground round corned beef swine brisket boudin fatback capicola t-bone beef ribs andouille. Tri-tip t-bone swine boudin ground round, kielbasa pork turkey pork loin shankle frankfurter shoulder pastrami rump sausage. Pig ground round meatball t-bone, jerky doner pork belly andouille. Prosciutto andouille pork belly jowl tail pastrami short ribs kevin. Strip steak ground round turducken salami brisket shank tenderloin porchetta pancetta bacon kielbasa pork loin beef ribs frankfurter. Pastrami rump flank bresaola shankle. Pancetta filet mignon andouille pork kielbasa tri-tip chuck swine boudin bacon short ribs. Frankfurter short loin bresaola pancetta, flank venison biltong landjaeger pork loin tail. Short loin bacon leberkas, spare ribs jerky ribeye beef ribs tail brisket biltong jowl short ribs strip steak. Porchetta kielbasa flank, ham meatloaf pork loin rump pork ham hock andouille frankfurter. Tail capicola bresaola, filet mignon biltong sausage pork chop meatloaf shankle pork loin pancetta salami beef ribs kielbasa. Landjaeger venison ground round salami, andouille hamburger short loin sausage pork fatback strip steak. Tri-tip ground round ball tip, leberkas kielbasa turducken short loin doner spare ribs bacon sirloin chuck capicola jerky beef. Pork strip steak andouille turducken. Corned beef shankle t-bone flank turkey kevin venison sirloin meatloaf ribeye andouille drumstick."
          }
        ],
        "images": [
          {
            "src": "assets/images/thumb1.jpg"
          },
          {
            "src": "assets/images/thumb2.jpg"
          },
          {
            "src": "assets/images/thumb3.jpg"
          },
          {
            "src": "assets/images/thumb4.jpg"
          },
          {
            "src": "assets/images/thumb5.jpg"
          }
        ],
        "trailers": [
          {
            "src": "https://www.youtube.com/embed/1eFDra1XimA"
          },
          {
            "src": "https://www.youtube.com/embed/Sk4uUavsrgI"
          }
        ]

      };
    };
  });