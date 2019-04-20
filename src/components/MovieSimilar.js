import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from './MovieSimilar.scss';

const API_KEY = '6e13b454073848d7b6853f415e2636be';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieSimilar = props => {
  const { location } = props; // eslint-disable-line
  const { pathname } = location;
  const id = pathname.split('/')[2];
  const [similarMovies, setSimilarMovies] = useState(null);
  const [referencedMovieTitle, setReferencedMovieTitle] = useState(null);

  useLayoutEffect(() => {
    async function fetchData() {
      const urlSimilarMovies = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`;
      const responseSimilarMovies = await fetch(urlSimilarMovies);
      const dataSimilarMovies = await responseSimilarMovies.json();
      const { results } = dataSimilarMovies;

      const urlReferencedMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
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
      <h2>{referencedMovieTitle}</h2>
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