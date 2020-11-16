'use strict';

(function () {
  const error = document.querySelector(`.error`);
  const success = document.querySelector(`.success`);
  const successButton = success.querySelector(`.success__button`);
  const errorButton = error.querySelector(`.error__button`);
  window.successErrorPopup = {
    successOpen: function () {
      success.classList.remove(`hidden`);
    },
    errorOpen: function () {
      error.classList.remove(`hidden`);
    }
  };
  const successClosed = function () {
    success.classList.add(`hidden`);
  };
  const errorClosed = function () {
    error.classList.add(`hidden`);
  };
  successButton.addEventListener(`click`, function () {
    successClosed();
  });
  errorButton.addEventListener(`click`, function () {
    errorClosed();
  });
  window.addEventListener(`click`, function () {
    successClosed();
    errorClosed();
  });
  document.addEventListener(`keydown`, function (evt) {
    window.util.isEscEvent(evt, successClosed);
    window.util.isEscEvent(evt, errorClosed);
  });
})();
