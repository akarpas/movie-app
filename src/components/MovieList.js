import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import style from './MovieList.scss';

const API_KEY = '6e13b454073848d7b6853f415e2636be';

const MovieList = props => {
  const { searchTerm } = props;
  const [isSearch, setIsSearch] = useState(false);
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${1}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { results } = data;
        setPopularMovies(results);
      });
  }, []);

  useEffect(() => {
    setIsSearch(searchTerm.length > 0);
  }, [searchTerm]);

  return (
    <div className={style.container}>
      <h3>{isSearch ? 'Search Results' : 'Popular Movies'}</h3>
      <div className={style.movies}>
        {popularMovies && popularMovies.filter(movie => movie.poster_path).map(movie => {
          const { id, title, poster_path } = movie; // eslint-disable-line
          const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
          return (
            <div className={style.movieThumb} key={`${id}-thumb`}>
              <Link to={`/${id}`}>
                <img
                  key={id}
                  className={style.poster}
                  src={`${imageBaseUrl}${poster_path}`} // eslint-disable-line
                  alt={title}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  searchTerm: PropTypes.string // eslint-disable-line
};

export default MovieList;