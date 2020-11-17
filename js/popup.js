'use strict';

(function () {
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = document.querySelector(`#upload-cancel`);
  const body = document.querySelector(`body`);
  uploadFile.addEventListener(`change`, function (evt) {
    evt.preventDefault();
    openPopup();
  });
  const openPopup = function () {
    uploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
  };
  const cancelPopup = function () {
    uploadOverlay.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
  };
  uploadCancel.addEventListener(`click`, function () {
    cancelPopup();
  });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.target && (evt.target.classList.contains(`text__hashtags`) || evt.target.classList.contains(`text__description`))) {
      return;
    }
    window.util.isEscEvent(evt, cancelPopup);
  });
  const form = document.querySelector(`.img-upload__form`);
  form.addEventListener(`submit`, function (evt) {
    const formData = new FormData(form);
    const getSuccessPopup = function () {
      window.zoom.reset();
      form.reset();
      window.slider.getFiltersImg();
      cancelPopup();
      window.successErrorPopup.successOpen();
    };
    const getErrorPopup = function () {
      window.successErrorPopup.errorOpen();
    };
    window.upload(formData, getSuccessPopup, getErrorPopup);
    evt.preventDefault();
  });
  window.popup = {
    body: body,
    form: form
  };
})();
