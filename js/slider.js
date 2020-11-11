'use strict';

(function () {
  const levelPin = document.querySelector('.effect-level__pin');
  const levelDepth = document.querySelector('.effect-level__depth');
  const levelLine = document.querySelector('.effect-level__line');
  const form = document.querySelector('.img-upload__form');
  const imagePreview = document.querySelector('.img-upload__preview img');
  const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  let percentX;
  let filter;
  let value;
  // массив всех фильтров
  const filters = [{
    value: 'none',
    name: 'none',
    range: '',
    unit: ''
  }, {
    value: 'chrome',
    name: 'grayscale',
    range: [0, 1],
    unit: ''
  }, {
    value: 'sepia',
    name: 'sepia',
    range: [0, 1],
    unit: ''
  }, {
    value: 'marvin',
    name: 'invert',
    range: [0, 100],
    unit: '%'
  }, {
    value: 'phobos',
    name: 'blur',
    range: [0, 3],
    unit: 'px'
  }, {
    value: 'heat',
    name: 'brightness',
    range: [1, 3],
    unit: ''
  }
  ];
  // сразу убираем бегунок на первом оригинальном фото без филтра
  imgUploadEffectLevel.classList.add('hidden');
  levelPin.addEventListener('mousedown', function (evt) {
    let startCoords = {
      x: evt.clientX
    };
    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      let shift = {
        x: startCoords.x - moveEvt.clientX,
      };
      startCoords = {
        x: moveEvt.clientX
      };
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };
    levelLine.addEventListener('mousemove', onMouseMove);
    levelLine.addEventListener(`mouseup`, function (evt) {
      // вычисляем крайнюю левую точку элемента относительно минус расстояние от стенки окна
      const x = evt.clientX - levelLine.getBoundingClientRect().left;
      percentX = x * 100 / levelLine.offsetWidth;
      levelPin.style.left = percentX + '%';
      levelDepth.style.width = percentX + '%';
      imagePreview.style.filter = filter.name + '(' + ((filter.range[1] - filter.range[0]) * Math.round(percentX) / 100 + filter.range[0]) + filter.unit + ')';
    });
  });
  const filtersImg = function () {
    let radioButtons = document.querySelectorAll('.effects__radio');
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        value = radioButtons[i].value;
      }
    }
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].value === value) {
        filter = filters[i];
        break;
      }
    }
    if (value === 'none') {
      imgUploadEffectLevel.classList.add('hidden');
      imagePreview.style.filter = 'none';
    } else if (value !== 'none') {
      imgUploadEffectLevel.classList.remove('hidden');
    }
    imagePreview.style.filter = filter.name + '(' + filter.range[1] + filter.unit + ')';
    levelPin.style.left = '100%';
    levelDepth.style.width = '100%';
  };
  form.addEventListener('change', filtersImg);
})();
