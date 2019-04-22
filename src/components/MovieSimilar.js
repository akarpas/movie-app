import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../data';
import callApi from '../utils/movie-api';

import style from './MovieSimilar.scss';

const MovieSimilar = props => {
  const { location } = props; // eslint-disable-line
  const { pathname } = location;
  const id = pathname.split('/')[2];
  const [similarMovies, setSimilarMovies] = useState(null);
  const [referencedMovieTitle, setReferencedMovieTitle] = useState(null);

  useLayoutEffect(() => {
    async function fetchData() {
      callApi('similar', id).then(results => {
        setSimilarMovies(results);
      });

      callApi('movie', id).then(movie => {
        setReferencedMovieTitle(movie.title);
      });
    }
    fetchData();
  }, [pathname]);

  return (
    <div className={style.container}>
      <div>Movies Similar to:</div>
      <h2 className={style.title}>{referencedMovieTitle}</h2>
      <div className={style.movies}>
        {similarMovies && similarMovies.map(movie => (
          <Link to={{ pathname: `/movie/${movie.id}` }} key={`${movie.title}Link`}>
            <img
              key={movie.title}
              className={style.movieThumb}
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
        ))}
      </div>
      <button
        type="button"
        className={style.button}
        onClick={props.history.goBack} // eslint-disable-line
      >
        Go Back
      </button>
    </div>
  );
};

export default MovieSimilar;