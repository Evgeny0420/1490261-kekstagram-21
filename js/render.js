'use strict';

(function () {
  const UsersPicture = document.querySelector(`.pictures`);
  const userPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const getUserPicture = function (photo) {
    const userPicture = userPictureTemplate.cloneNode(true);
    const pictureImg = userPicture.querySelector(`.picture__img`);
    const image = photo.url;
    pictureImg.setAttribute(`src`, image);
    userPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;
    userPicture.querySelector(`.picture__likes`).textContent = photo.likes;

    return userPicture;
  };

  window.render = {
    append: function (photos) {
      let picturesAll = UsersPicture.querySelectorAll(`.picture`);
      for (let i = 0; i < picturesAll.length; i++) {
        picturesAll[i].remove();
      }
      const fragment = document.createDocumentFragment();
      for (let j = 0; j < photos.length; j++) {
        fragment.appendChild(getUserPicture(photos[j]));
      }
      UsersPicture.appendChild(fragment);
    }
  };
})();
