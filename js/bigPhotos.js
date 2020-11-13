'use strict';

(function () {
  // добавляем большое фото
  const commentsCount = document.querySelector('.comments-count');
  const socialCaption = document.querySelector('.social__caption');
  const bigPicture = document.querySelector('.big-picture');
  const bigPhoto = document.querySelector('.big-picture__img img');
  const likes = document.querySelector('.likes-count');
  const pictureImg = document.querySelectorAll('.picture__img');
  const socialComment = document.querySelectorAll('.social__comment');
  const CancelX = document.querySelector('.big-picture__cancel');
  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');

  const openPicture = function () {
    bigPicture.classList.remove('hidden');
    window.popup.body.classList.add('modal-open');
  };
  const cancelPicture = function () {
    bigPicture.classList.add('hidden');
    window.popup.body.classList.remove('modal-open');
  };
  window.bigPhotos = function (photos) {
    const pictureLink = document.querySelectorAll('.picture');
    for (let i = 0; i < pictureLink.length; i++) {
      pictureLink[i].addEventListener('click', function () {
        openPicture();
        bigPhoto.src = photos[i].url;
        likes.textContent = photos[i].likes;
        commentsCount.textContent = 10;
        socialCaption.textContent = photos[i].description;
        for (let j = 0; j < socialComment.length; j++) {
          const socialPicture = socialComment[j].querySelector('.social__picture');
          const socialText = socialComment[j].querySelector('.social__text');
          socialPicture.src = photos[i].comments[j].avatar;
          socialPicture.alt = photos[i].comments[j].name;
          socialText.textContent = photos[i].comments[j].message;
        }
      });
      pictureLink[i].addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, openPicture);
      });
    }
    CancelX.addEventListener('click', function () {
      cancelPicture();
    });
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, cancelPicture);
    });
  };
})();
