import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import callApi from '../utils/movie-api';

import style from './MovieList.scss';

const MovieList = props => {
  const { searchTerm } = props; // eslint-disable-line
  const [isSearch, setIsSearch] = useState(false);
  const [popularMovies, setPopularMovies] = useState(null);
  const [searchMovies, setSearchMovies] = useState(null);
  const [movieImagesLoaded, setMovieImagesLoaded] = useState(false);

  useEffect(() => {
    callApi('popular').then(results => {
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

  const imagesLoaded = [];
  const movies = searchMovies || popularMovies;
  const hasResults = !searchMovies || searchMovies.length > 0;

  const onLoad = id => {
    if (!movieImagesLoaded) {
      imagesLoaded.push(id);
      if (imagesLoaded.length === movies.length) {
        setMovieImagesLoaded(true);
      }
    }
  };

  return (
    <div className={style.container}>
      <h3>{isSearch ? 'Search Results' : 'Popular Movies'}</h3>
      <div>{isSearch && !hasResults && 'No Results'}</div>
      {!movieImagesLoaded && <div>Loading...</div>}
      <div className={style.movies}>
        {movies && movies.filter(movie => movie.poster_path).map(movie => {
          const { id, title, poster_path } = movie; // eslint-disable-line
          const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
          return (
            <Link key={`${id}Link`} to={{ pathname: `/movie/${id}` }}>
              <img
                style={{ display: 'none' }}
                src={`${imageBaseUrl}${poster_path}`} // eslint-disable-line
                onLoad={onLoad(id)} alt={title}
              />
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