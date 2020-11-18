'use strict';

(function () {
  const STEP = 25;
  const Limits = {
    MIN: 25,
    MAX: 100
  };
  const controlSmallerElement = document.querySelector(`.scale__control--smaller`);
  const controlBiggerElement = document.querySelector(`.scale__control--bigger`);
  const controlValueElement = document.querySelector(`.scale__control--value`);
  controlValueElement.value = `100%`;
  const getControlValue = function () {
    controlValueElement.value = percentNumber + `%`;
    window.slider.imagePreviewElement.style = `transform: scale(${percentNumber / 100})`;
  };

  let percentNumber = Number(controlValueElement.value.replace(`%`, ``));
  controlSmallerElement.addEventListener(`click`, function () {
    percentNumber -= STEP;
    if (percentNumber >= Limits.MIN) {
      getControlValue();
    }
  });
  controlBiggerElement.addEventListener(`click`, function () {
    percentNumber += STEP;
    if (percentNumber <= Limits.MAX) {
      getControlValue();
    }
  });
  window.zoom = {
    reset: function () {
      controlValueElement.value = `100%`;
      percentNumber = Number(controlValueElement.value.replace(`%`, ``));
      getControlValue();
    }
  };
})();
