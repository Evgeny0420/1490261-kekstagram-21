'use strict';
// константы
const MIN_NUMBER = 1;
const PHOTO_MAX_NUMBER = 25;
const MAX_AVATAR = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAME = ['Катя', 'Женя.', 'Вова', 'Олеся', 'Кира', 'Костя'];
const TEXT = 'Я сидел в березовой роще осенью, около половины сентября. С самого утра перепадал мелкий дождик, сменяемый по временам теплым солнечным сиянием; была непостоянная погода. Небо то всё заволакивалось рыхлыми белыми облаками, то вдруг местами расчищалось на мгновенье, и тогда из-за раздвинутых туч показывалась лазурь, ясная и ласковая, как прекрасный глаз.';

// функция рандомного числа
const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// функция вывода рандомного элемента массива
const randomArray = function (arr) {
  return arr[randomNumber(0, arr.length - 1)];
};
// функция определения случайного аватара
const randomAvatar = function () {
  return `img/avatar-${randomNumber(MIN_NUMBER, MAX_AVATAR)}.svg`;
};

// создание коментария
const сomments = [];
for (let i = 0; i < 3; i++) {
  сomments.push({
    avatar: randomAvatar(),
    message: randomArray(MESSAGE),
    name: randomArray(NAME)
  });
}

const randomLorem = function () {
  const a = TEXT.split(' ');
  return a.slice(0, randomNumber(4, a.length)).join(' ');
};
// создание массива с фотографиями, лайками и комментариями
const photos = [];
for (let i = 1; i <= PHOTO_MAX_NUMBER; i++) {
  const photo = {
    url: `photos/${i}.jpg`,
    description: randomLorem(),
    likes: randomNumber(MIN_LIKES, MAX_LIKES),
    comments: сomments.length
  };
  photos.push(photo);
}
// находим шаблон поста.
const UsersPicture = document.querySelector(`.pictures`);
const userPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
// размножаем шаблон
const getUserPicture = function (photo) {
  const userPicture = userPictureTemplate.cloneNode(true);
  const pictureImg = userPicture.querySelector(`.picture__img`);
  const image = photo.url;
  pictureImg.setAttribute(`src`, image);
  userPicture.querySelector(`.picture__comments`).textContent = photo.comments;
  userPicture.querySelector(`.picture__likes`).textContent = photo.likes;

  return userPicture;
};
// добавляем в разметку (на страницу)
const fragment = document.createDocumentFragment();
for (let j = 1; j < photos.length; j++) {
  fragment.appendChild(getUserPicture(photos[j]));
}
UsersPicture.appendChild(fragment);

// задание 4 лекции

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const body = document.querySelector('body');

// добавление попапа при изменении в инпут при загрузке фото
uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});
// функция  удаления попапа
const cancelPopup = function () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};
// закрытие попапа(окна редактирования фото) по кнопке и по esc
uploadCancel.addEventListener('click', function () {
  cancelPopup();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    cancelPopup();
  }
});

// обработчик события на бегунке
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

levelLine.addEventListener(`mouseup`, function (evt) {
  // вычисляем крайнюю левую точку элемента относительно минус расстояние от стенки окна
  const x = evt.clientX - levelLine.getBoundingClientRect().left;
  percentX = x * 100 / 453;
  levelPin.style.left = percentX + '%';
  levelDepth.style.width = percentX + '%';
  imagePreview.style.filter = filter.name + '(' + ((filter.range[1] - filter.range[0]) * Math.round(percentX) / 100 + filter.range[0]) + filter.unit + ')';
});

const filtersImg = function () {
  let radioButtons = document.querySelectorAll('.effects__radio');
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked === true) {
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

// валидация хештегов

// const hashtagInput = document.querySelector(`.text__hashtags`);
// const checkHashtag = function (evt) {
//   const hastags = hashtagInput.value.split(` `);

//   console.log (evt);
// };
const LONG_HASHTAG = 20;
const SHORT_HASHTAG = 2;
const MAX_HASHTAG = 5;
const re = /^#[\w\а-яА-Я]*$/;
const hashtagsInput = document.querySelector(`.text__hashtags`);
hashtagsInput.addEventListener('input', function () {
  const hashtags = hashtagsInput.value.toLowerCase().split(` `);
  const set = new Set(hashtags);
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== '#') {
      hashtagsInput.setCustomValidity(`Хэш-тег начинается с символа # (решётка)!`);
    } else if (!re.test(hashtags[i])) {
      hashtagsInput.setCustomValidity(`Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.!`);
    } else if (hashtags.length >= MAX_HASHTAG) {
      hashtagsInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов!`);
    } else if (hashtags[i].length < SHORT_HASHTAG || hashtags[i].length > LONG_HASHTAG) {
      hashtagsInput.setCustomValidity(`Хеш-теги не должны быть короче 2 и не длиннее 20 символов включая "#"!`);
    } else if (hashtags.length !== set.size) {
      hashtagsInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды!`);
    } else {
      hashtagsInput.setCustomValidity(``);
    }
  }
});


