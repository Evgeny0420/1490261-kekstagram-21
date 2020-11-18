'use strict';

(function () {
  const levelPinElement = document.querySelector(`.effect-level__pin`);
  const levelDepthElement = document.querySelector(`.effect-level__depth`);
  const levelLineElement = document.querySelector(`.effect-level__line`);
  const imagePreviewElement = document.querySelector(`.img-upload__preview img`);
  const imgUploadEffectLevelElement = document.querySelector(`.img-upload__effect-level`);
  const effectsRadioElements = document.querySelectorAll(`.effects__radio`);
  let percentX;
  let filter;
  let value;
  const filters = [{
    value: `none`,
    name: `none`,
    range: ``,
    unit: ``
  }, {
    value: `chrome`,
    name: `grayscale`,
    range: [0, 1],
    unit: ``
  }, {
    value: `sepia`,
    name: `sepia`,
    range: [0, 1],
    unit: ``
  }, {
    value: `marvin`,
    name: `invert`,
    range: [0, 100],
    unit: `%`
  }, {
    value: `phobos`,
    name: `blur`,
    range: [0, 3],
    unit: `px`
  }, {
    value: `heat`,
    name: `brightness`,
    range: [1, 3],
    unit: ``
  }
  ];
  imgUploadEffectLevelElement.classList.add(`hidden`);
  levelPinElement.addEventListener(`mousedown`, function (evt) {
    let startCoords = {
      x: evt.clientX
    };
    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      let shift = {
        x: startCoords.x - moveEvt.clientX,
      };
      startCoords = {
        x: moveEvt.clientX
      };
      percentX = (levelPinElement.offsetLeft - shift.x) * 100 / levelLineElement.offsetWidth;
      if (percentX < 0) {
        percentX = 0;
      } else if (percentX > 100) {
        percentX = 100;
      }
      levelPinElement.style.left = percentX + `%`;
      levelDepthElement.style.width = percentX + `%`;
      imagePreviewElement.style.filter = filter.name + `(` + ((filter.range[1] - filter.range[0]) * Math.round(percentX) / 100 + filter.range[0]) + filter.unit + `)`;
    };
    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
  const getFiltersImg = function () {
    const radioButtonsElement = document.querySelectorAll(`.effects__radio`);
    for (let i = 0; i < radioButtonsElement.length; i++) {
      if (radioButtonsElement[i].checked) {
        levelPinElement.style.left = `100%`;
        levelDepthElement.style.width = `100%`;
        value = radioButtonsElement[i].value;
      }
    }
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].value === value) {
        filter = filters[i];
        break;
      }
    }
    if (value === `none`) {
      imgUploadEffectLevelElement.classList.add(`hidden`);
      imagePreviewElement.style.filter = `none`;
    } else if (value !== `none`) {
      imgUploadEffectLevelElement.classList.remove(`hidden`);
    }
    imagePreviewElement.style.filter = filter.name + `(` + filter.range[1] + filter.unit + `)`;
  };
  effectsRadioElements.forEach(function (radio) {
    radio.addEventListener(`change`, getFiltersImg);
  });
  window.slider = {
    imagePreviewElement: imagePreviewElement,
    getFiltersImg: getFiltersImg
  };
})();
