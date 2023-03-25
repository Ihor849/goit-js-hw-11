// НЕ ОПРАЦЬОВАНО //
import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getRefs from './getRefs';
import ImagApiService from './API_service';
import { appendImagesMarkup } from '../js/picture-template';

export { onScroll, onUpTop };
const refs = getRefs();

const imagApiService = new ImagApiService();

window.addEventListener('scroll', throttle(onScroll, 1000));
refs.btnUpTop.addEventListener('click', onUpTop);

async function onScroll() {
  const documentRect = refs.gallery.getBoundingClientRect();
  console.log(documentRect);

  const clientEl = refs.gallery.clientHeight;
  console.log('clientEl :', clientEl);
  const heightBeforeLoading = 600;

  console.log(documentRect.bottom + heightBeforeLoading);
  console.log('documentRect.bottom :', documentRect.bottom);

  if (documentRect.bottom + heightBeforeLoading < clientEl) {
    imagApiService.fetchPictures().then(({ hits, total, totalHits }) => {
      let totalPage = totalHits / imagApiService.per_page;
      if (totalPage <= imagApiService.page - 1) {
        console.log(totalPage);
        console.log(imagApiService.page);

        console.log(imagApiService.per_page);
        window.addEventListener('scroll', e => {
          window.scrollTo({ top: 0 });
        });
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
