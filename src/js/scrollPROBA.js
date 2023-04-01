// НЕ ОПРАЦЬОВАНО //
// import throttle from 'lodash.throttle';
// import Notiflix from 'notiflix';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import getRefs from './getRefs';
// import ImagApiService from './API_service';
// import { appendImagesMarkup } from '../js/picture-template';
// import { extend } from 'joi';

// class ImagApiServiceScroll extends ImagApiService {
//   constructor(options) {
//     super(options);
//     this.searchQuery = '';
//     this.page = 1;
//     this.per_page = 40;
//   }
// }

// const imagApiServiceScroll = new ImagApiServiceScroll({});

// console.log(imagApiServiceScroll.searchQuery);
// export { onScroll, onUpTop };
// const refs = getRefs();

// window.addEventListener('scroll', throttle(onScroll, 500));

// refs.btnUpTop.addEventListener('click', onUpTop);

// function onScroll() {
//   const documentRect = document.documentElement.getBoundingClientRect();
//   const clientEl = document.documentElement.clientHeight;
//   const heightBeforeLoading = 150;
//   //   console.log('координата top', documentRect.top);
//   //   console.log('координата bottom', documentRect.bottom);
//   //   console.log('высоту окна:', clientEl);
//   console.log(imagApiServiceScroll);
//   if (documentRect.bottom < clientEl + heightBeforeLoading) {
//     imagApiServiceScroll.fetchPictures().then(({ hits, total, totalHits }) => {
//       let totalPage = totalHits / imagApiServiceScroll.per_page;

//       // if (totalPage <= imagApiService.page) {
//       //   console.log('GGGGGGGG');
//       //   Notiflix.Report.info(
//       //     'GALLERY',
//       //     'Were sorry, but youve reached the end of search results.'
//       //   );
//       //   refs.loadMore.classList.add('is-hidden');
//       // }
//       appendImagesMarkup(hits);
//       lightbox.refresh();
//     });
//   }
// }

// function onUpTop() {
//   if (window.pageYOffset > 0) {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }
// }

// let lightbox = new SimpleLightbox('.photo-card a', {
//   captions: true,
//   captionsData: 'alt',
//   captionDelay: 250,
//   enableKeyboard: true,
//   doubleTapZoom: 5,
// });
