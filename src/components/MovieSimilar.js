import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, IMAGE_BASE_URL, API_BASE_URL } from '../data';

import style from './MovieSimilar.scss';

const MovieSimilar = props => {
  const { location } = props; // eslint-disable-line
  const { pathname } = location;
  const id = pathname.split('/')[2];
  const [similarMovies, setSimilarMovies] = useState(null);
  const [referencedMovieTitle, setReferencedMovieTitle] = useState(null);

  useLayoutEffect(() => {
    async function fetchData() {
      // TO DO: Set API Utility File to make calls to API
      const urlSimilarMovies = `${API_BASE_URL}movie/${id}/similar?api_key=${API_KEY}&language=en-US`;
      const responseSimilarMovies = await fetch(urlSimilarMovies);
      const dataSimilarMovies = await responseSimilarMovies.json();
      const { results } = dataSimilarMovies;

      // TO DO: Set API Utility File to make calls to API
      const urlReferencedMovie = `${API_BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;
      const responseReferencedMovie = await fetch(urlReferencedMovie);
      const dataReferencedMovie = await responseReferencedMovie.json();

      setSimilarMovies(results);
      setReferencedMovieTitle(dataReferencedMovie.title);
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