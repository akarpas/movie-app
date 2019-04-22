const { API_KEY, API_BASE_URL } = require('../data');

const makeCall = (url, type) => {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (type !== 'movie') {
        const { results } = data;
        return results;
      }
      const { poster_path, genres, title, overview, release_date, tagline } = data; // eslint-disable-line
      return { poster_path, genres, title, overview, release_date, tagline };
    });
};

export default (type, parameter) => {
  let url;
  switch (type) {
  case 'search':
    url = `${API_BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${parameter}&page=1&include_adult=false`;
    return makeCall(url, type);
  case 'popular':
    url = `${API_BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${1}`;
    return makeCall(url, type);
  case 'similar':
    url = `${API_BASE_URL}movie/${parameter}/similar?api_key=${API_KEY}&language=en-US`;
    return makeCall(url, type);
  case 'movie':
    url = `${API_BASE_URL}movie/${parameter}?api_key=${API_KEY}&language=en-US`;
    return makeCall(url, type);
  default:
    throw new Error('API Call type does not exist: ', type);
  }
};
