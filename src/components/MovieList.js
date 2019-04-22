import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import callApi from '../utils/movie-api';
import { API_KEY, API_BASE_URL } from '../data';

import style from './MovieList.scss';

const MovieList = props => {
  const { searchTerm } = props; // eslint-disable-line
  const [isSearch, setIsSearch] = useState(false);
  const [popularMovies, setPopularMovies] = useState(null);
  const [searchMovies, setSearchMovies] = useState(null);

  const makeCall = async (type, parameter) => {
    const results = callApi(type, parameter);
    return results;
  }

  useEffect(() => {
    // TO DO: Set API Utility File to make calls to API
    const url = `${API_BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${1}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { results } = data;
        setPopularMovies(results);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsSearch(true);
      callApi('search', searchTerm).then(results => {
        setSearchMovies(results);
      });
    } else {
      setSearchMovies(null);
      setIsSearch(false);
    }
  }, [searchTerm]);

  const movies = searchMovies || popularMovies;

  return (
    <div className={style.container}>
      <h3>{isSearch ? 'Search Results' : 'Popular Movies'}</h3>
      <div className={style.movies}>
        {movies && movies.filter(movie => movie.poster_path).map(movie => {
          const { id, title, poster_path } = movie; // eslint-disable-line
          const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
          return (
            <Link key={`${id}Link`} to={{ pathname: `/movie/${id}` }}>
              <img
                key={id}
                className={style.movieThumb}
                src={`${imageBaseUrl}${poster_path}`} // eslint-disable-line
                alt={title}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;