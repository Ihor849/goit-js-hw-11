import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getRefs from './js/getRefs';
import ImagApiService from './js/API_service';
import { appendImagesMarkup } from './js/picture-template';
// import { onScroll, onUpTop } from './js/scrollPROBA';

const refs = getRefs();
const imagApiService = new ImagApiService({
  searchQuery: '',
  page: 1,
  per_page: 40,
});

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
refs.inputSearch.addEventListener('input', onInputSearche);

refs.loadMore.classList.add('is-hidden');
refs.loader.classList.add('hidden');
refs.btnUpTop.classList.remove('btn-up-top--visible');

function onSearch(e) {
  e.preventDefault();
  const request = e.currentTarget.elements.searchQuery.value.trim();

  imagApiService.query = request;

  if (imagApiService.searchQuery === '') {
    return Notiflix.Notify.failure('Oops, Enter a query to search.');
  }
  onUpTop();

  try {
    imagApiService.fetchPictures().then(({ hits, total, totalHits }) => {
      if (total === 0) {
        refs.searchForm.reset();
        Notiflix.Notify.failure('Oops, Nothing found for your request.');
      } else {
        clearGalleryContainer();
        appendImagesMarkup(hits);
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        refs.btnSearch.disabled = true;
        refs.loadMore.classList.remove('is-hidden');
        refs.btnUpTop.classList.add('btn-up-top--visible');
      }

      if (totalHits <= hits.length) {
        refs.loadMore.classList.add('is-hidden');
      } else if (totalHits > imagApiService.per_page) {
        refs.loadMore.classList.remove('is-hidden');
      }
    });
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}

function onLoadMore() {
  try {
    imagApiService.fetchPictures().then(({ hits, total, totalHits }) => {
      appendImagesMarkup(hits);
      lightbox.refresh();

      let totalPages = Math.ceil(totalHits / imagApiService.per_page);
      console.log(imagApiService.page - 1);
      console.log(totalPages);
      if (totalPages <= imagApiService.page) {
        refs.loadMore.classList.add('is-hidden');
        Notiflix.Report.info(
          'GALLERY',
          'Were sorry, but youve reached the end of search results.'
        );
      }
    });
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = ' ';
  refs.loadMore.classList.add('is-hidden');
}

function onInputSearche() {
  imagApiService.resetPage();
  refs.btnSearch.disabled = false;
}

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
  doubleTapZoom: 5,
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
refs.btnUpTop.addEventListener('click', onUpTop);

window.addEventListener('scroll', onScroll);

function onScroll() {
  const documentRect = document.documentElement.getBoundingClientRect();
  const clientEl = document.documentElement.clientHeight;
  const heightBeforeLoading = 150;
  //   console.log('координата top', documentRect.top);
  //   console.log('координата bottom', documentRect.bottom);
  //   console.log('высоту окна:', clientEl);

  if (documentRect.bottom < clientEl + heightBeforeLoading) {
    imagApiService.fetchPictures().then(({ hits, total, totalHits }) => {
      let totalPage = totalHits / imagApiService.per_page;

      if (totalPage <= imagApiService.page) {
        Notiflix.Report.info(
          'GALLERY',
          'Were sorry, but youve reached the end of search results.'
        );
        refs.loadMore.classList.add('is-hidden');
      }
      appendImagesMarkup(hits);
      lightbox.refresh();
    });
  }
}

function onUpTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++
