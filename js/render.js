'use strict';

(function () {
  const UsersPictureElement = document.querySelector(`.pictures`);
  const userPictureTemplateElement = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const getUserPicture = function (photo) {
    const userPictureElement = userPictureTemplateElement.cloneNode(true);
    const pictureImgElement = userPictureElement.querySelector(`.picture__img`);
    const imageElement = photo.url;
    pictureImgElement.setAttribute(`src`, imageElement);
    userPictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    userPictureElement.querySelector(`.picture__likes`).textContent = photo.likes;

    return userPictureElement;
  };

  window.render = {
    append: function (photos) {
      const picturesAllElements = UsersPictureElement.querySelectorAll(`.picture`);
      for (let i = 0; i < picturesAllElements.length; i++) {
        picturesAllElements[i].remove();
      }
      const fragment = document.createDocumentFragment();
      for (let j = 0; j < photos.length; j++) {
        fragment.appendChild(getUserPicture(photos[j]));
      }
      UsersPictureElement.appendChild(fragment);
    }
  };
})();
