'use strict';

(function () {
  const filterDefaultElement = document.querySelector(`#filter-default`);
  const filterRandomElement = document.querySelector(`#filter-random`);
  const filterDiscussedElement = document.querySelector(`#filter-discussed`);
  window.filters = {
    getFilterRandomActive: function () {
      filterDefaultElement.classList.remove(`img-filters__button--active`);
      filterDiscussedElement.classList.remove(`img-filters__button--active`);
      filterRandomElement.classList.add(`img-filters__button--active`);
    },
    getFilterDiscussedActive: function () {
      filterDefaultElement.classList.remove(`img-filters__button--active`);
      filterRandomElement.classList.remove(`img-filters__button--active`);
      filterDiscussedElement.classList.add(`img-filters__button--active`);
    },
    getFilterDefaultActive: function () {
      filterRandomElement.classList.remove(`img-filters__button--active`);
      filterDiscussedElement.classList.remove(`img-filters__button--active`);
      filterDefaultElement.classList.add(`img-filters__button--active`);
    },
    filterDefaultElement,
    filterRandomElement,
    filterDiscussedElement
  };
})();
