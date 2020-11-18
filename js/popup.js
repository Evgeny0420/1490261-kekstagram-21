'use strict';

(function () {
  const uploadFileElement = document.querySelector(`#upload-file`);
  const uploadOverlayElement = document.querySelector(`.img-upload__overlay`);
  const uploadCancelElement = document.querySelector(`#upload-cancel`);
  const formElement = document.querySelector(`.img-upload__form`);
  const body = document.querySelector(`body`);
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  uploadFileElement.addEventListener(`change`, function (evt) {
    evt.preventDefault();
    const file = uploadFileElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      openPopup();
    } else {
      window.successErrorPopup.errorOpen();
    }
  });
  const openPopup = function () {
    uploadOverlayElement.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
  };
  const cancelPopup = function () {
    uploadOverlayElement.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    window.zoom.reset();
    formElement.reset();
    window.slider.getFiltersImg();
    window.successErrorPopup.successOpen();
  };
  uploadCancelElement.addEventListener(`click`, function () {
    cancelPopup();
  });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.target && (evt.target.classList.contains(`text__hashtags`) || evt.target.classList.contains(`text__description`))) {
      return;
    }
    window.util.isEscEvent(evt, cancelPopup);
  });
  formElement.addEventListener(`submit`, function (evt) {
    const formData = new FormData(formElement);
    const getSuccessPopup = function () {
      cancelPopup();
    };
    const getErrorPopup = function () {
      window.successErrorPopup.errorOpen();
    };
    window.upload(formData, getSuccessPopup, getErrorPopup);
    evt.preventDefault();
  });
  window.popup = {
    body,
    formElement
  };
})();
