export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    btnSearch: document.querySelector('.search-form > button'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
    nextPage: document.querySelector('#next-page'),
    inputSearch: document.querySelector('.search-form > input'),
  };
}
