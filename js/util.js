'use strict';

(function () {
  const ESC_KEYCODE = 27;
  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    }
  };
})();
