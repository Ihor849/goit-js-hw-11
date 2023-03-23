import getRefs from './getRefs';
export { appendImagesMarkup };

const refs = getRefs();

function appendImagesMarkup(imadges) {
  const markup = imadges
    .map(imadge => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = imadge;
      return `<div class="photo-card">
  <a class="gallery__link" href="${largeImageURL}">
    <div class="gallery-item" id="${id}">
      <img class="photo-imag" src="${webformatURL}" alt="${tags}" loading="lazy"/>
      <div class="info">
        <p class="info-item"><b>Likes</b>${likes}</p>
        <p class="info-item"><b>Views</b>${views}</p>
        <p class="info-item"><b>Comments</b>${comments}</p>
        <p class="info-item"><b>Downloads</b>${downloads}</p>
      </div>
    </div>
  </a>
</div>`;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
