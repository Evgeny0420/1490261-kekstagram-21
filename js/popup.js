'use strict';

(function () {
  const uploadFile = document.querySelector('#upload-file');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const uploadCancel = document.querySelector('#upload-cancel');
  const body = document.querySelector('body');
  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    openPopup();
  });
  const openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  };
  const cancelPopup = function () {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  };
  uploadCancel.addEventListener('click', function () {
    cancelPopup();
  });
  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, cancelPopup);
  });
})();
