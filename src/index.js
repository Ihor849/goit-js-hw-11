import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getRefs from './js/getRefs';
import ImagApiService from './js/API_service';
import { appendImagesMarkup } from './js/picture-template';

const refs = getRefs();
const imagApiService = new ImagApiService();

// console.log(refs.inputSearch);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
refs.inputSearch.addEventListener('input', onInputSearche);

refs.loadMore.classList.add('is-hidden');

async function onSearch(e) {
  e.preventDefault();
  imagApiService.searchQuery =
    e.currentTarget.elements.searchQuery.value.trim();

  if (imagApiService.searchQuery === '') {
    return Notiflix.Notify.failure('Oops, Enter a query to search.');
  }
  refs.btnSearch.disabled = true;

  imagApiService.resetPage();

  try {
    imagApiService.fetchPictures().then(({ hits, total, totalHits }) => {
      if (total === 0) {
        return Notiflix.Notify.failure('Oops, Nothing found for your request.');
      }
      appendImagesMarkup(hits);
      refs.loadMore.classList.remove('is-hidden');
    });
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}

async function onLoadMore() {
  try {
    imagApiService.fetchPictures().then(({ hits, total, totalHits }) => {
      appendImagesMarkup(hits);
    });
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}

function clearGalleryContainer() {
  //
}

function countingImagesEnd() {
  //
}

function onInputSearche() {
  //
}
