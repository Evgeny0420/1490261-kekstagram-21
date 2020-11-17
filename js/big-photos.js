'use strict';

(function () {
  let COMMENT_PREVIEW = 5;
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const socialCommentsLoader = document.querySelector(`.social__comments-loader`);
  const socialCaption = document.querySelector(`.social__caption`);
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPhoto = document.querySelector(`.big-picture__img img`);
  const likes = document.querySelector(`.likes-count`);
  const CancelX = document.querySelector(`.big-picture__cancel`);
  const socialComments = document.querySelector(`.social__comments`);
  let socialComment;
  let newTemplate = document.createElement('template');
  newTemplate.setAttribute(`id`, `comments`);
  newTemplate.innerHTML = `<li class="social__comment">
                                <img class="social__picture" src="" alt="" width="35" height="35">
                                <p class="social__text"></p>
                           </li>`;
  const getDeleteDomElements = function () {
    socialComments.innerHTML = ``;
  };
  const commentTemplate = newTemplate.content.querySelector(`.social__comment`);
  const openPicture = function () {
    bigPicture.classList.remove(`hidden`);
    window.popup.body.classList.add(`modal-open`);
  };
  const cancelPicture = function () {
    bigPicture.classList.add(`hidden`);
    window.popup.body.classList.remove(`modal-open`);
  };
  const getCommentElement = function () {
    let element = commentTemplate.cloneNode(true);
    socialComments.appendChild(element);
  };
  const addCommentsElements = function (count) {
    for (let k = 0; k < count; k++) {
      getCommentElement();
    }
  };
  const generateCommentsList = function (photo, commentsCount) {
    getDeleteDomElements();
    addCommentsElements(commentsCount);
    socialComment = document.querySelectorAll(`.social__comment`);
    for (let j = 0; j < socialComment.length; j++) {
      const socialPicture = socialComment[j].querySelector(`.social__picture`);
      const socialText = socialComment[j].querySelector(`.social__text`);
      socialPicture.src = photo.comments[j].avatar;
      socialPicture.alt = photo.comments[j].name;
      socialText.textContent = photo.comments[j].message;
    }
  };
  const generateCommentsTemplate = function (photo, commentsCount, isHidden) {
    socialCommentCount.textContent = commentsCount + ` из ` + photo.comments.length + ` комментариев`;
    socialCommentsLoader.classList.toggle(`hidden`, isHidden);
    generateCommentsList(photo, commentsCount);
  };
  window.openBigPhotos = function (photos) {
    const pictureLink = document.querySelectorAll(`.picture`);
    for (let i = 0; i < pictureLink.length; i++) {
      pictureLink[i].addEventListener(`click`, function () {
        openPicture();
        bigPhoto.src = photos[i].url;
        likes.textContent = photos[i].likes;
        if (photos[i].comments.length <= COMMENT_PREVIEW) {
          generateCommentsTemplate(photos[i], photos[i].comments.length, true);
        } else {
          generateCommentsTemplate(photos[i], COMMENT_PREVIEW, false);
        }
        socialCommentsLoader.addEventListener(`click`, function () {
          if (photos[i].comments.length <= socialComment.length + 5) {
            generateCommentsTemplate(photos[i], photos[i].comments.length, true);
          } else {
            generateCommentsTemplate(photos[i], socialComment.length + 5, false);
          }
        });
        socialCaption.textContent = photos[i].description;
      });
      pictureLink[i].addEventListener(`keydown`, function (evt) {
        window.util.isEnterEvent(evt, openPicture);
      });
    }
    CancelX.addEventListener(`click`, function () {
      cancelPicture();
    });
    document.addEventListener(`keydown`, function (evt) {
      window.util.isEscEvent(evt, cancelPicture);
    });
  };
})();
