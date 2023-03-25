// НЕ ОПРАЦЬОВАНО //
import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getRefs from './getRefs';
import ImagApiService from './API_service';
import { appendImagesMarkup } from '../js/picture-template';

const imagApiService = new ImagApiService();
export { onScroll, onUpTop };
const refs = getRefs();

// window.addEventListener('scroll', throttle(onScroll, 500));

refs.btnUpTop.addEventListener('click', onUpTop);

async function onScroll() {
  // console.log(imagApiService.searchQuery);
  const documentRect = document.documentElement.getBoundingClientRect();
  const clientEl = document.documentElement.clientHeight;
  const heightBeforeLoading = 150;
  //   console.log('координата top', documentRect.top);
  //   console.log('координата bottom', documentRect.bottom);
  //   console.log('высоту окна:', clientEl);

  if (documentRect.bottom < clientEl + heightBeforeLoading) {
    imagApiService.fetchPictures().then(({ hits, total, totalHits }) => {
      let totalPage = totalHits / imagApiService.per_page;

      console.log(imagApiService.searchQuery);

      if (totalPage <= imagApiService.page) {
        console.log('GGGGGGGG');
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

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
  doubleTapZoom: 5,
});
