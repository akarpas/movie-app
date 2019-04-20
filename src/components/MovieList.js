import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './MovieList.scss';

const API_KEY = '6e13b454073848d7b6853f415e2636be';

const MovieList = props => {
  const { searchTerm } = props;
  const [isSearch, setIsSearch] = useState(false);
  const [popularMovies, setPopularMovies] = useState(null);
  const [searchMovies, setSearchMovies] = useState(null);

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
    if (searchTerm.length > 0) {
      setIsSearch(true);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const { results } = data;
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
            <Link to={{ pathname: `/movie/${id}` }}>
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

MovieList.propTypes = {
  searchTerm: PropTypes.string // eslint-disable-line
};

export default MovieList;