'use strict';

(function () {
  const errorElement = document.querySelector(`.error`);
  const successElement = document.querySelector(`.success`);
  const successButtonElement = successElement.querySelector(`.success__button`);
  const errorButtonElement = errorElement.querySelector(`.error__button`);
  window.successErrorPopup = {
    successOpen: function () {
      successElement.classList.remove(`hidden`);
    },
    errorOpen: function () {
      errorElement.classList.remove(`hidden`);
    }
  };
  const getSuccessClosed = function () {
    successElement.classList.add(`hidden`);
  };
  const getErrorClosed = function () {
    errorElement.classList.add(`hidden`);
  };
  successButtonElement.addEventListener(`click`, function () {
    getSuccessClosed();
  });
  errorButtonElement.addEventListener(`click`, function () {
    getErrorClosed();
  });
  window.addEventListener(`click`, function () {
    getSuccessClosed();
    getErrorClosed();
  });
  document.addEventListener(`keydown`, function (evt) {
    window.util.isEscEvent(evt, getSuccessClosed);
    window.util.isEscEvent(evt, getErrorClosed);
  });
})();
