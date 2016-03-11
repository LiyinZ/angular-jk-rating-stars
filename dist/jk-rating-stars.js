(function() {
  'use strict';

  angular.module('jkAngularRatingStars', [
    'jkAngularRatingStars.templates'
  ]);
}());

(function() {
  'use strict';

  function RatingStarsController($attrs) {

    var that = this;
    if (that.maxRating === undefined) {
      that.maxRating = 5;
    }
    if (that.readOnly === undefined) {
      that.readOnly = false;
    }

    $attrs.$observe('maxRating', function() {
      that.maxRating = parseInt(that.maxRating);
      that.starsArray = that.getStarsArray();
      that.validateStars(that.rating);
    });

    $attrs.$observe('rating', function() {
      that.rating = parseInt(that.rating);
      if (that.rating > that.maxRating) {
        that.rating = that.maxRating;
      }
      that.validateStars(that.rating);
    });

    that.getStarsArray = function() {
      var starsArray = [];
      for (var index = 0; index < that.maxRating; index++) {
        var starItem = {
          index: index,
          class: 'star_border'
        };
        starsArray.push(starItem);
      }
      return starsArray;
    };

    that.starsArray = that.getStarsArray();

    that.setRating = function(rating) {
      if (that.readOnly) {
        return;
      }
      that.rating = rating;
      that.validateStars(that.rating);
    };

    that.setMouseOverRating = function(rating) {
      if (that.readOnly) {
        return;
      }
      that.validateStars(rating);
    };

    that.validateStars = function(rating) {
      if (!that.starsArray || that.starsArray.length === 0) {
        return;
      }
      for (var index = 0; index < that.starsArray.length; index++) {
        var starItem = that.starsArray[index];
        if (index <= (rating - 1)) {
          starItem.class = 'star';
        } else {
          starItem.class = 'star_border';
        }
      }
    };

  }

  angular
    .module('jkAngularRatingStars')
    .controller('RatingStarsController', [
      '$attrs',
      RatingStarsController
    ]);

}());

(function() {

  'use strict';

  function RatingStarsDirective() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'rating-stars-directive.html',
      scope: {},
      controller: 'RatingStarsController',
      controllerAs: 'ctrl',
      bindToController: {
        maxRating: '@?',
        rating: '=?',
        readOnly: '=?'
      }
    };
  }

  angular
    .module('jkAngularRatingStars')
    .directive('jkRatingStars', [
    RatingStarsDirective
  ]);

}());

(function(){angular.module("jkAngularRatingStars.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("rating-stars-directive.html","<div\n  class=\"jk-rating-stars-container\"\n  layout=\"row\" >\n\n  <a\n    class=\"star-button\"\n    ng-click=\"ctrl.setRating(0)\"\n    ng-if=\"!ctrl.readOnly\" >\n    <i class=\"material-icons\">remove_circle_outline</i>\n  </a>\n\n  <a\n    class=\"star-button\"\n    ng-mouseover=\"ctrl.setMouseOverRating($index + 1)\"\n    ng-mouseleave=\"ctrl.setRating(ctrl.rating)\"\n    ng-click=\"ctrl.setRating($index + 1)\"\n    ng-repeat=\"item in ctrl.starsArray\" >\n    <i class=\"material-icons\">{{item.class}}</i>\n  </a>\n\n</div>\n");}]);})();