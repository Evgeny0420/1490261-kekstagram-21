'use strict';

(function () {
  const STEP = 25;
  const LIMITS = {
    min: 25,
    max: 100
  };
  const controlSmaller = document.querySelector('.scale__control--smaller');
  const controlBigger = document.querySelector('.scale__control--bigger');
  const controlValue = document.querySelector('.scale__control--value');
  controlValue.value = '100%';
  const getControlValue = function () {
    controlValue.value = percentNumber + '%';
    window.slider.imagePreview.style = `transform: scale(${percentNumber / 100})`;
  };

  let percentNumber = Number(controlValue.value.replace('%', ''));
  controlSmaller.addEventListener('click', function () {
    percentNumber -= STEP;
    if (percentNumber >= LIMITS.min) {
      getControlValue();
    }
  });
  controlBigger.addEventListener('click', function () {
    percentNumber += STEP;
    if (percentNumber <= LIMITS.max) {
      getControlValue();
    }
  });
  window.zoom = {
    reset: function () {
      controlValue.value = '100%';
      percentNumber = Number(controlValue.value.replace('%', ''));
      getControlValue();
    }
  };
})();
