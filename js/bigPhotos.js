'use strict';

(function () {
  const COMMENT_PREVIEW = 5;
  const commentCountElement = document.querySelector(`.social__comment-count`);
  const commentsLoaderElement = document.querySelector(`.social__comments-loader`);
  const socialCaptionElement = document.querySelector(`.social__caption`);
  const bigPictureElement = document.querySelector(`.big-picture`);
  const bigPhotoElement = document.querySelector(`.big-picture__img img`);
  const likesElement = document.querySelector(`.likes-count`);
  const CancelXElement = document.querySelector(`.big-picture__cancel`);
  const socialCommentsElement = document.querySelector(`.social__comments`);
  let socialCommentElements;
  const newTemplate = document.createElement(`template`);
  newTemplate.setAttribute(`id`, `comments`);
  newTemplate.innerHTML = `<li class="social__comment">
                                <img class="social__picture" src="" alt="" width="35" height="35">
                                <p class="social__text"></p>
                           </li>`;
  const getDeleteDomElements = function () {
    socialCommentsElement.innerHTML = ``;
  };
  const commentTemplate = newTemplate.content.querySelector(`.social__comment`);
  const openPicture = function () {
    bigPictureElement.classList.remove(`hidden`);
    window.popup.body.classList.add(`modal-open`);
  };
  const cancelPicture = function () {
    bigPictureElement.classList.add(`hidden`);
    window.popup.body.classList.remove(`modal-open`);
  };
  const getCommentElement = function () {
    let element = commentTemplate.cloneNode(true);
    socialCommentsElement.appendChild(element);
  };
  const addCommentsElements = function (count) {
    for (let k = 0; k < count; k++) {
      getCommentElement();
    }
  };
  const generateCommentsList = function (photo, commentsCount) {
    getDeleteDomElements();
    addCommentsElements(commentsCount);
    socialCommentElements = document.querySelectorAll(`.social__comment`);
    for (let j = 0; j < socialCommentElements.length; j++) {
      const socialPictureElement = socialCommentElements[j].querySelector(`.social__picture`);
      const socialTextElement = socialCommentElements[j].querySelector(`.social__text`);
      socialPictureElement.src = photo.comments[j].avatar;
      socialPictureElement.alt = photo.comments[j].name;
      socialTextElement.textContent = photo.comments[j].message;
    }
  };
  const generateCommentsTemplate = function (photo, commentsCount, isHidden) {
    commentCountElement.textContent = commentsCount + ` из ` + photo.comments.length + ` комментариев`;
    commentsLoaderElement.classList.toggle(`hidden`, isHidden);
    generateCommentsList(photo, commentsCount);
  };
  window.openBigPhotos = function (photos) {
    const pictureLinkElement = document.querySelectorAll(`.picture`);
    for (let i = 0; i < pictureLinkElement.length; i++) {
      pictureLinkElement[i].addEventListener(`click`, function () {
        openPicture();
        bigPhotoElement.src = photos[i].url;
        likesElement.textContent = photos[i].likes;
        if (photos[i].comments.length <= COMMENT_PREVIEW) {
          generateCommentsTemplate(photos[i], photos[i].comments.length, true);
        } else {
          generateCommentsTemplate(photos[i], COMMENT_PREVIEW, false);
        }
        commentsLoaderElement.addEventListener(`click`, function () {
          if (photos[i].comments.length <= socialCommentElements.length + 5) {
            generateCommentsTemplate(photos[i], photos[i].comments.length, true);
          } else {
            generateCommentsTemplate(photos[i], socialCommentElements.length + 5, false);
          }
        });
        socialCaptionElement.textContent = photos[i].description;
      });
      pictureLinkElement[i].addEventListener(`keydown`, function (evt) {
        window.util.isEnterEvent(evt, openPicture);
      });
    }
    CancelXElement.addEventListener(`click`, function () {
      cancelPicture();
    });
    document.addEventListener(`keydown`, function (evt) {
      window.util.isEscEvent(evt, cancelPicture);
    });
  };
})();
