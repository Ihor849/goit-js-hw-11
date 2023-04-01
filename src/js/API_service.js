import axios from 'axios';
import Notiflix from 'notiflix';

export default class ImagApiService {
  constructor(options) {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchPictures() {
    const options = {
      BASE_URL: `https://pixabay.com/api/`,
      API_KEY: '34377487-34dfc22cd0267d3510191dd51',
    };
    try {
      const respons = await axios.get(
        `${options.BASE_URL}?key=${options.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`
      );

      this.incrementPage();

      return respons.data;
    } catch (error) {
      return Notiflix.Notify.failure(
        'Something went wrong. Please try again later.'
      );
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
