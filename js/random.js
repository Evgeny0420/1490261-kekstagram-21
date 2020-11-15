'use strict';

(function () {
  window.random = {
    randomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomElement: function (array) {
      const randomElementIndex = Math.floor(Math.random() * array.length);
      return array[randomElementIndex];
    }
  };
})();
