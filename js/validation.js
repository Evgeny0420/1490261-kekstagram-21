'use strict';

(function () {
  const LONG_HASHTAG = 20;
  const SHORT_HASHTAG = 2;
  const MAX_HASHTAG = 5;
  const re = /^#[\w\а-яА-Я]*$/;
  const hashtagsInput = document.querySelector(`.text__hashtags`);
  hashtagsInput.addEventListener('input', function () {
    const hashtags = hashtagsInput.value.toLowerCase().split(` `);
    const set = new Set(hashtags);
    for (let i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        hashtagsInput.setCustomValidity(`Хэш-тег начинается с символа # (решётка)!`);
      } else if (!re.test(hashtags[i])) {
        hashtagsInput.setCustomValidity(`Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.!`);
      } else if (hashtags.length >= MAX_HASHTAG) {
        hashtagsInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов!`);
      } else if (hashtags[i].length < SHORT_HASHTAG || hashtags[i].length > LONG_HASHTAG) {
        hashtagsInput.setCustomValidity(`Хеш-теги не должны быть короче 2 и не длиннее 20 символов включая "#"!`);
      } else if (hashtags.length !== set.size) {
        hashtagsInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды!`);
      } else {
        hashtagsInput.setCustomValidity(``);
      }
    }
  });
})();
