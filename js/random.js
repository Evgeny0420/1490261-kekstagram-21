'use strict';

(function () {
  window.random = {
    getRandomElement: function (array) {
      const randomElementIndex = Math.floor(Math.random() * array.length);
      return array[randomElementIndex];
    }
  };
})();
