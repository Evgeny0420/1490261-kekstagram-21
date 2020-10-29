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

/* const randomLorem = function () {
  return TEXT.substr(0, randomNumber(10, TEXT.length));
}; */

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
