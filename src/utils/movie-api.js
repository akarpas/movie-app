const { API_KEY, API_BASE_URL } = require('../data');

const makeCall = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const { results } = data;
      return results;
    });
};

export default (type, parameters) => {
  let url;
  switch (type) {
  case 'search':
    url = `${API_BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${parameters}&page=1&include_adult=false`;
    return makeCall(url, type);
  case 'popular':
    url = `${API_BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${1}`;
    return makeCall(url, type);
  // case 'similar':
  //   return;
  // case 'movie':
  //   return;
  default:
    throw new Error('API Call type does not exist: ', type);
  }
};
