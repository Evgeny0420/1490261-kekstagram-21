'use strict';

(function () {
  const main = document.querySelector(`main`);
  // находим шаблон поста.
  const UsersPicture = document.querySelector(`.pictures`);
  const userPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  // размножаем шаблон
  const getUserPicture = function (photo) {
    const userPicture = userPictureTemplate.cloneNode(true);
    const pictureImg = userPicture.querySelector(`.picture__img`);
    const image = photo.url;
    pictureImg.setAttribute(`src`, image);
    userPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;
    userPicture.querySelector(`.picture__likes`).textContent = photo.likes;

    return userPicture;
  };
  const elementsErrorSuccess = [errorTemplate, successTemplate];
  for (let i = 0; i < elementsErrorSuccess.length; i++) {
    let element = elementsErrorSuccess[i].cloneNode(true);
    main.appendChild(element);
    element.classList.add(`hidden`);
  }
  // добавляем в разметку (на страницу)
  const successHandler = function (photos) {
    const fragment = document.createDocumentFragment();
    for (let j = 0; j < photos.length; j++) {
      fragment.appendChild(getUserPicture(photos[j]));
    }
    UsersPicture.appendChild(fragment);
    window.bigPhotos(photos);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = `0`;
    node.style.right = `0`;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  window.load(successHandler, errorHandler);
  window.main = {
  };
})();
