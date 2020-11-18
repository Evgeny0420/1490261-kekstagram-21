'use strict';

(function () {
  const LONG_HASHTAG = 20;
  const LONG_DESCRIPTION = 140;
  const SHORT_HASHTAG = 2;
  const MAX_HASHTAG = 5;
  const re = /^#[\w\а-яА-Я]*$/;
  const hashtagsInputElement = document.querySelector(`.text__hashtags`);
  const descriptionInputElement = document.querySelector(`.text__description`);
  hashtagsInputElement.addEventListener(`input`, function () {
    const hashtags = hashtagsInputElement.value.toLowerCase().split(` `);
    if (hashtags.length > MAX_HASHTAG) {
      hashtagsInputElement.setCustomValidity(`Нельзя указать больше ${MAX_HASHTAG} хэш-тегов!`);
    } else {
      for (let i = 0; i < hashtags.length; i++) {
        if (hashtags[i][0] !== `#`) {
          hashtagsInputElement.setCustomValidity(`Хэш-тег начинается с символа # (решётка)!`);
        } else if (!re.test(hashtags[i])) {
          hashtagsInputElement.setCustomValidity(`Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.!`);
        } else if (hashtags[i].length < SHORT_HASHTAG || hashtags[i].length > LONG_HASHTAG) {
          hashtagsInputElement.setCustomValidity(`Хеш-теги не должны быть короче ${SHORT_HASHTAG} и не длиннее ${LONG_HASHTAG} символов включая "#"!`);
        } else if (hashtags.length !== (new Set(hashtags)).size) {
          hashtagsInputElement.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды!`);
        } else {
          hashtagsInputElement.setCustomValidity(``);
        }
      }
    }
  });
  descriptionInputElement.addEventListener(`invalid`, function () {
    if (descriptionInputElement.validity.tooLong) {
      descriptionInputElement.setCustomValidity(`Комментарий не должен быть  длиннее ${LONG_DESCRIPTION} символов!`);
    } else {
      descriptionInputElement.setCustomValidity(``);
    }
  });
})();
