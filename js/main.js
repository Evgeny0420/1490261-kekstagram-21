'use strict';

(function () {
  const mainElement = document.querySelector(`main`);
  const successTemplateElement = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplateElement = document.querySelector(`#error`).content.querySelector(`.error`);
  const imgFiltersElement = document.querySelector(`.img-filters`);

  const filterOpen = function () {
    imgFiltersElement.classList.remove(`img-filters--inactive`);
  };
  const elementsErrorSuccess = [errorTemplateElement, successTemplateElement];
  for (let i = 0; i < elementsErrorSuccess.length; i++) {
    const element = elementsErrorSuccess[i].cloneNode(true);
    mainElement.appendChild(element);
    element.classList.add(`hidden`);
  }
  let photos = [];
  const successHandler = function (data) {
    const getDefaultFilters = function () {
      window.render.append(data);
      window.openBigPhotos(data);
    };
    const getRandomFilters = function () {
      for (let i = 0; i < data.length; i++) {
        photos.push(window.random.getRandomElement(data));
      }
      const newRandomArray = new Set(photos);
      photos = Array.from(newRandomArray).slice(0, 10);
      window.render.append(photos);
      window.openBigPhotos(photos);
    };
    const discussedFilters = function () {
      const comparePhotos = function (a, b) {
        return a.comments.length - b.comments.length;
      };
      const resultPhotos = Array.from(data).sort(comparePhotos).reverse();
      window.render.append(resultPhotos);
      window.openBigPhotos(resultPhotos);
    };
    window.filters.filterDefaultElement.addEventListener(`click`, function () {
      window.filters.getFilterDefaultActive();
      window.debounce(getDefaultFilters);
    });
    window.filters.filterRandomElement.addEventListener(`click`, function () {
      window.filters.getFilterRandomActive();
      window.debounce(getRandomFilters);
    });
    window.filters.filterDiscussedElement.addEventListener(`click`, function () {
      window.filters.getFilterDiscussedActive();
      window.debounce(discussedFilters);
    });
    getDefaultFilters();
    filterOpen();
  };
  const getErrorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = `0`;
    node.style.right = `0`;
    node.style.fontSize = `20px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  window.load(successHandler, getErrorHandler);
})();
