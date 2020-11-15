'use strict';

(function () {
  let filterDefault = document.querySelector(`#filter-default`);
  let filterRandom = document.querySelector(`#filter-random`);
  let filterDiscussed = document.querySelector(`#filter-discussed`);
  window.filters = {
    filterRandomActive: function () {
      filterDefault.classList.remove(`img-filters__button--active`);
      filterDiscussed.classList.remove(`img-filters__button--active`);
      filterRandom.classList.add(`img-filters__button--active`);
    },
    filterDiscussedActive: function () {
      filterDefault.classList.remove(`img-filters__button--active`);
      filterRandom.classList.remove(`img-filters__button--active`);
      filterDiscussed.classList.add(`img-filters__button--active`);
    },
    filterDefaultActive: function () {
      filterRandom.classList.remove(`img-filters__button--active`);
      filterDiscussed.classList.remove(`img-filters__button--active`);
      filterDefault.classList.add(`img-filters__button--active`);
    },
    filterDefault: filterDefault,
    filterRandom: filterRandom,
    filterDiscussed: filterDiscussed
  };
})();
