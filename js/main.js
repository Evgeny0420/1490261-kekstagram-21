'use strict';

(function () {
  const main = document.querySelector(`main`);
  // находим шаблон поста.
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const imgFilters = document.querySelector(`.img-filters`);
  // размножаем шаблон

  const filterOpen = function () {
    imgFilters.classList.remove(`img-filters--inactive`);
  };
  const elementsErrorSuccess = [errorTemplate, successTemplate];
  for (let i = 0; i < elementsErrorSuccess.length; i++) {
    let element = elementsErrorSuccess[i].cloneNode(true);
    main.appendChild(element);
    element.classList.add(`hidden`);
  }
  let photos = [];
  // добавляем в разметку (на страницу)
  const successHandler = function (data) {
    window.filters.filterDefault.addEventListener(`click`, function () {
      window.filters.filterDefaultActive();
      window.render.append(data);
      window.bigPhotos(data);
    });
    window.filters.filterRandom.addEventListener(`click`, function () {
      window.filters.filterRandomActive();
      for (let i = 0; i < data.length; i++) {
        photos.push(window.random.getRandomElement(data));
      }
      const newRandomArray = new Set(photos);
      photos = Array.from(newRandomArray).slice(0, 10);
      window.render.append(photos);
      window.bigPhotos(photos);
    });
    window.filters.filterDiscussed.addEventListener(`click`, function () {
      window.filters.filterDiscussedActive();
      const comparePhotos = function (a, b) {
        return a.comments.length - b.comments.length;
      };
      photos = Array.from(data).sort(comparePhotos).reverse();
      window.render.append(photos);
      window.bigPhotos(photos);
    });
    window.render.append(data);
    window.bigPhotos(data);
    filterOpen();
  };
  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = `0`;
    node.style.right = `0`;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  window.load(successHandler, errorHandler);
})();
