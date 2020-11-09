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
  for (let i = 0; i < socialComment.length; i++) {
    const socialPicture = socialComment[i].querySelector('.social__picture');
    const socialText = socialComment[i].querySelector('.social__text');
    socialPicture.src = window.main.randomAvatar();
    socialPicture.alt = window.main.randomArray(window.main.NAME);
    socialText.textContent = window.main.randomArray(window.main.MESSAGE);
  }
  const openPicture = function () {
    bigPicture.classList.remove('hidden');
    window.popup.body.classList.add('modal-open');
  };
  const cancelPictere = function () {
    bigPicture.classList.add('hidden');
    window.popup.body.classList.remove('modal-open');
  };
  for (let i = 0; i < pictureImg.length; i++) {
    pictureImg[i].addEventListener('click', function () {
      openPicture();
      bigPhoto.src = `photos/${i + 1}.jpg`;
      likes.textContent = window.random.randomNumber(window.main.MIN_LIKES, window.main.MAX_LIKES);
      commentsCount.textContent = 10;
      socialCaption.textContent = window.main.randomLorem();
    });
    CancelX.addEventListener('click', function () {
      cancelPictere();
    });
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, cancelPictere);
    });
  }
})();
